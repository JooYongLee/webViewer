import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import ThreeMesh from './ThreeMesh'

/**
 * javscript closure
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
 * @param {STLLoader} loader 
 * @returns 
 */
const promisifyLoad = function (loader) {
    function onProgress(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }

    return url => new Promise((resolve, reject) => {
        loader.load(url, resolve, onProgress, reject);
    });
};

/**
 * 
 * @param {THREE.BufferGeometry} geometry 
 * @returns 
 */
const promisifyGeometryToMesh = (geometry) => {    

    const mesh = new ThreeMesh()
    
    mesh.geometry = geometry
    // mesh.buildTopology()


    

    const material = new THREE.MeshPhongMaterial({
        // const material = new THREE.MeshPhongMaterial({
        color: 0xFFA8B7,
        side: THREE.DoubleSide,
        // flatShading: true,
        // uniforms: {value: 1.0}
    });
    // const mesh = object.children[0]
    mesh.material = material

    return new Promise((resolve, reject) => {
        resolve(mesh)        
    }) 
}

export default class MeshLoader {
    constructor() {

    }

    loadObject(objectUrl, materials) {
        const stlLoader = new STLLoader();
        // stlLoader.setMaterials(materials);

        return promisifyLoad(stlLoader)(objectUrl);
    }

    geometryToMesh(geometry){
        return promisifyGeometryToMesh(geometry)
    }

    /**
     * 
     * @param {Blob} blob 
     * @returns { Promise<THREE.Mesh>}
     */
    loadBlob( blob ) {

        return new Promise((resolve, reject) => {
            
            function onProgress(xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            }
            

            blob.arrayBuffer().then( buffer => {
                
                const stlLoader = new STLLoader()
                const geom = stlLoader.parse( buffer )
                resolve( geom )

            })
        })
        .then( promisifyGeometryToMesh )
    }
    /**
     * 
     * @param {} param0 
     * @returns {Promise<THREE.Mesh>} mesh
     */
    load({ objectUrl, materialUrl, textures, cleanup }) {
        let loadMaterialPromise = Promise.resolve(null);
        if (materialUrl) {
            loadMaterialPromise = this.loadMaterial(materialUrl, textures)
        }

        return loadMaterialPromise        
            .then(materials => this.loadObject(objectUrl, materials))
            .then(promisifyGeometryToMesh)     
            
            .then(cleanup)
    }

    /**
     * closure for settting name of mesh
     * @param {String} name 
     * @returns 
     */
    static setName = (name) => {
        return (mesh) => { 
            mesh.name = name
            return mesh
        }
    }

    /**
     * closure for setting matrial of mesh
     * @param {THREE.Material} material 
     */
    static setMaterial = (material) => {
        return (mesh) => {
            mesh.material = material
            return mesh
        }
    }

    /**
     * load multiple meshes
     * @param {Array} objectItems array of object method this.load(...)
     * @returns 
     */    
    loads = (objectItems) => {
        
        // const promiseAdd = (item) => new Promise( (resolve, reject))
        return Promise.all(
            [... objectItems.map( item => this.load(item))]
        )
    }


}