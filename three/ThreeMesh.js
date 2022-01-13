import * as THREE from "three"


import { Face3 } from "./Face3.js"


THREE.BufferGeometry.prototype.computeFaceNormals = function () {

    const cb = new THREE.Vector3(), ab = new THREE.Vector3();

    for ( let f = 0, fl = this.faces.length; f < fl; f ++ ) {

        const face = this.faces[ f ];

        const vA = this.vertices[ face.a ];
        const vB = this.vertices[ face.b ];
        const vC = this.vertices[ face.c ];

        cb.subVectors( vC, vB );
        ab.subVectors( vA, vB );
        cb.cross( ab );

        cb.normalize();

        face.normal.copy( cb );
    }
}


THREE.BufferGeometry.prototype.mergeVertices = function (precisionPoints = 4) {

    const verticesMap = {}; // Hashmap for looking up vertices by position coordinates (and making sure they are unique)
    const unique = [], changes = [];

    const precision = Math.pow(10, precisionPoints);

    for (let i = 0, il = this.vertices.length; i < il; i++) {

        const v = this.vertices[i];
        const key = Math.round(v.x * precision) + '_' + Math.round(v.y * precision) + '_' + Math.round(v.z * precision);

        if (verticesMap[key] === undefined) {

            verticesMap[key] = i;
            unique.push(this.vertices[i]);
            changes[i] = unique.length - 1;

        } else {

            //console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
            changes[i] = changes[verticesMap[key]];

        }

    }



    // if faces are completely degenerate after merging vertices, we
    // have to remove them from the geometry.
    const faceIndicesToRemove = [];

    for (let i = 0, il = this.faces.length; i < il; i++) {

        const face = this.faces[i];

        // console.log(face)

        face.a = changes[face.a];
        face.b = changes[face.b];
        face.c = changes[face.c];

        const indices = [face.a, face.b, face.c];


        // if any duplicate vertices are found in a Face3
        // we have to remove the face as nothing can be saved
        for (let n = 0; n < 3; n++) {

            if (indices[n] === indices[(n + 1) % 3]) {

                faceIndicesToRemove.push(i);
                break;

            }

        }

    }

    // console.log("faceIndicesToRemove", faceIndicesToRemove)
    // console.warn("faceVertexUvs\n", this.faceVertexUvs)
    // console.warn("faces\n", this.faces)
    for (let i = faceIndicesToRemove.length - 1; i >= 0; i--) {

        const idx = faceIndicesToRemove[i];

        this.faces.splice(idx, 1);

        if (this.faceVertexUvs) {
            for (let j = 0, jl = this.faceVertexUvs.length; j < jl; j++) {

                this.faceVertexUvs[j].splice(idx, 1);

            }
        }
    }

    // Use unique set of vertices

    const diff = this.vertices.length - unique.length;
    this.vertices = unique;
    return diff;

}


export default class ThreeMesh extends THREE.Mesh {
    constructor(props) {
        super(props)
    }

    // /**
    //  * 
    //  * @param {Number} faceIndex 
    //  */
    // faceNormal(faceIndex){
    //     const norm = new THREE.Vector3(1, 0, 0)
    //     this.geometry.index()

    // }
    // getFaceNormal()

    buildTopology() {
        const attr = this.geometry.getAttribute("position")        

        const positions = attr.array
        const vertices = [];
        for (let i = 0, n = positions.length; i < n; i += 3) {
            let x = positions[i];
            let y = positions[i + 1];
            let z = positions[i + 2];
            vertices.push(new THREE.Vector3(x, y, z));
        }

        

        const faces = [];
        // const indices = [];
        for (let i = 0, n = vertices.length; i < n; i += 3) {
            faces.push(new Face3(i, i + 1, i + 2));
        }

        this.geometry.vertices = vertices
        this.geometry.faces = faces

        this.geometry.mergeVertices()

        
        const nPoly = 3
        const nDim = 3

        const facets = new Uint32Array( this.geometry.faces.length  * nPoly );

        let j = 0
        for( let i =0 ; i<this.geometry.faces.length ; i++){
            facets[j++] = this.geometry.faces[i].a
            facets[j++] = this.geometry.faces[i].b
            facets[j++] = this.geometry.faces[i].c            
        }

        const floatVerts = new Float32Array( this.geometry.vertices.length * nDim )

        j = 0;
        for( let i = 0 ; i<this.geometry.vertices.length ; i++){
            const vec = this.geometry.vertices[i]
            floatVerts[j++] = vec.x
            floatVerts[j++] = vec.y
            floatVerts[j++] = vec.z
        }

        
        this.geometry.setIndex( new THREE.Uint32BufferAttribute( facets, 1 )  );

        this.geometry.setAttribute( 'position', new THREE.BufferAttribute( floatVerts, 3 ) );
        

        this.geometry.computeVertexNormals();

    }

}

// export class ThreeMesh extends SculptMesh {
// }