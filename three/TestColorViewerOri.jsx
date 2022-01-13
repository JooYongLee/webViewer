// import React from 'react'
import React, { Component } from 'react'

import * as THREE from 'three'


import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Lut } from 'three/examples/jsm/math/Lut.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import MeshLoader from './MeshLoader'
import ThreeMesh from './ThreeMesh'
import './Viewer.css'

class ColorMap{
    /**
     * 
     * @param {Viewer} viewer 
     */
    constructor(viewer){
        // viewer.
        this.viewer = viewer
        console.log('ColorMap', viewer)
    }

    attach(){

    }

    detach(){
        
    }

    mapOn(){

    }

    mapOff(){

    }

    setMesh(){

    }

    setLut(){

    }

    setScalarRange(){

    }
}

// import React, { Component } from 'react'

// export default class TestColorViewer extends Component {
//     render() {
//         return (
//             <div>
                
//             </div>
//         )
//     }
// }


export default class TestColorViewer extends Component {
    constructor(props){
        super(props)
        this.root = React.createRef(null)

        this.state = {
            vertexColors: true
        }
        // const [visibleMap, setVisibleMap] = React.useState(true)
    
        this.mapper = new ColorMap(this)
        // this.container
        
        
		this.perpCamera = new THREE.PerspectiveCamera(60, 1, 1, 100)
		this.perpCamera.position.set(0, 0, 10)
		// scene.add(perpCamera)

		this.orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 2)
		this.orthoCamera.position.set(0.5, 0, 1)

        // this.perpCamera
        // this.orthoCamera
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.lut = null
    
        // scene = new THREE.Scene()
		// uiScene = new THREE.Scene()

        this.mesh = null
        this.sprite = null
        this.scene =  new THREE.Scene()
		this.scene.background = new THREE.Color(0xff00ff)

        this.uiScene =  new THREE.Scene()
        
        this.scene.add(this.perpCamera)

        this.params = {
			colorMap: 'rainbow',
		}
    
        this.labels = []
        this.labelRenderer = new CSS2DRenderer();
    
        // let controls, controlsLabel

    }
    // controls.ad
    componentDidMount(){
        this.init()
    }


	init = () => {
        const container = this.root.current


		this.lut = new Lut()

		const width = window.innerWidth
		const height = window.innerHeight


		this.sprite = new THREE.Sprite(
			new THREE.SpriteMaterial({
				map: new THREE.CanvasTexture(this.lut.createCanvas()),
			})
		)

        const sprite = this.sprite
        sprite.geometry.computeBoundingBox()
		sprite.scale.x = 0.1
		// sprite.scale.y = 2.0
		// sprite.scale.x = 0.125

        const createLablee = (name)=>{
            const earthDiv = document.createElement( 'div' );
            // const earthDiv = document.getElementById('earthDiv')
            earthDiv.className = 'label';
            earthDiv.textContent = name;
            earthDiv.style.marginLeft = '-2em';
            earthDiv.style.fontSize = '20px'
            return earthDiv

        }
        const earthLabel = new CSS2DObject( createLablee('yosi') );
        const earthLabel2 = new CSS2DObject( createLablee('grando') );
        const earthLabel3 = new CSS2DObject( createLablee('season') );
        // const EARTH_RADIUS = 5
        earthLabel.position.set( 0, 0.5, 0 );
        earthLabel3.position.set( 0, -0.5, 0 );
        this.labels.push( earthLabel , earthLabel2, earthLabel3);
        // earthLabel.position.set( EARTH_RADIUS, EARTH_RADIUS, 0 );

        

		this.mesh = new THREE.Mesh(
			undefined,
			new THREE.MeshPhongMaterial({
				side: THREE.DoubleSide,
				color: 0xf5f5f5,
				vertexColors: true,
			})
		)

        // mesh.add( earthLabel )
        // sprite.add( earthLabel )
        // scene.add( earthLabel );
        // uiScene.add( earthLabel )
        // uiScene.add( earthLabel2 )
        // uiScene.add( earthLabel3 )
        this.labels.map( la => this.uiScene.add( la))
		this.uiScene.add(sprite)

		this.scene.add( this.mesh)

		this.loadModel()

		const pointLight = new THREE.PointLight(0xffffff, 1)
		this.perpCamera.add(pointLight)


        
        this.labelRenderer.setSize( width, height );
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = '0px';
        container.appendChild( this.labelRenderer.domElement )
        // container.removeChild( labelRenderer.domElement )


		this.renderer.autoClear = false
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(width, height)
		container.appendChild( this.renderer.domElement)

        // container.removeChild()

		window.addEventListener('resize', this.onWindowResize)

		const controls = new OrbitControls(this.perpCamera, this.renderer.domElement)
		controls.addEventListener('change', this.renderScene)

        // controls.ad
        const controlsLabel = new OrbitControls( this.perpCamera, this.labelRenderer.domElement );
        controlsLabel.minDistance = 5;
        controlsLabel.maxDistance = 100;
		controlsLabel.addEventListener('change', this.renderColormap)

        this.onWindowResize()

		// const gui = new GUI()

		// gui.add(params, 'colorMap', [
		// 	'rainbow',
		// 	'cooltowarm',
		// 	'blackbody',
		// 	'grayscale',
		// ]).onChange(function () {
		// 	updateColors()
		// 	render()
		// })
	}

	onWindowResize = () => {
		const width = window.innerWidth
		const height = window.innerHeight

		this.perpCamera.aspect = width / height
		this.perpCamera.updateProjectionMatrix()

        this.orthoCamera.aspect = width / height
        this.orthoCamera.updateProjectionMatrix()

		this.renderer.setSize(width, height)
        this.labelRenderer.setSize(width, height)
		this.renderScene()
	}

    renderColormap = (e) => {
        console.log('renderColormap', e)

        this.renderer.clear()
		this.renderer.render(this.scene, this.perpCamera)


        this.renderer.render(this.uiScene, this.orthoCamera)
		this.labelRenderer.render(this.uiScene, this.orthoCamera)
    }

    // const appendRender = []
    // appendRender.push( renderColormap )
	renderScene = (e) => {

        console.log('render', e)
		this.renderer.clear()
		this.renderer.render( this.scene, this.perpCamera)
	}




	loadModel = () => {
        const filename = 'Tooth_16.stl'
        // const filename = 'UpperJawScan2.stl'
		// const loader = new THREE.BufferGeometryLoader()
        const loader = new MeshLoader()
        loader.load({objectUrl: filename})
        .then( resmesh => {
            // const geometry = mesh.geometry
            const geometry = resmesh.geometry

            console.log('mesh', resmesh)

            geometry.center()
			geometry.computeVertexNormals()

			// default color attribute
			const colors = []

			for (
				let i = 0, n = geometry.attributes.position.count;
				i < n;
				++i
			) {
				colors.push(1, 1, 1)
			}

			geometry.setAttribute(
				'color',
				new THREE.Float32BufferAttribute(colors, 3)
			)

			this.mesh.geometry = geometry
			this.updateColors()

			this.renderScene()


        })
        .catch( e => console.error(e))
        
	}

	updateColors = ()=> {
        const lut = this.lut
		lut.setColorMap(this.params.colorMap)

		lut.setMax(1)
		lut.setMin(-1)

        /** *  @type {THREE.BufferGeometry} */
		const geometry = this.mesh.geometry
		const positions = geometry.attributes.position
		const normals = geometry.attributes.normal
		const colors = geometry.attributes.color
        console.log( 'center', geometry.center() )
        // console.error( geometry.ge)

		for (let i = 0; i < normals.array.length; i++) {
            let j = Math.floor(i / 3) * 3
            // let j =i

			const colorValue = normals.array[j + 1]

			const color = lut.getColor(colorValue)

			if (color === undefined) {
				console.log('Unable to determine color for value:', colorValue)
			} else {
                colors.array[j + 0] = color.r 
                colors.array[j + 1] = color.g 
                colors.array[j + 2] = color.b 

                // colors.array[Math.floor( i / 3)] = 
				// colors.setXYZ(i, color.r, color.g, color.b)
			}
		}

		colors.needsUpdate = true
        this.mesh.material.vertexColors = true
		const map = this.sprite.material.map
		lut.updateCanvas(map.image)
		map.needsUpdate = true
	}

    onClickButton = (event) => {
        const mesh = this.mesh
        const scene = this.scene
        // console.log(event.target)
        // console.log( scene )
        // console.log( scene.children )
        const index = scene.children.indexOf(mesh) 
        console.log( index )

        if( index >= 0 ){
            scene.remove( mesh)
        } else {
            scene.add( mesh )
        }
        this.renderScene()
            // scene.children

    }

    onClickSwitchColor = (event) => {

        // this.setState( {vertexColors: true} )
        const mesh = this.mesh
        const scene = this.scene
        const uiScene = this.uiScene
        const container = this.root.current
        const labels = this.labels
        const sprite = this.sprite

        mesh.material.vertexColors = !  mesh.material.vertexColors
        if( mesh.material.vertexColors ){
            uiScene.add( sprite )
            labels.map( la => uiScene.add(la))
            // appendRender.push( renderColormap )


            ///
            container.appendChild(this.labelRenderer.domElement)
            // const controls = new OrbitControls(perpCamera, renderer.domElement)
            // controls.addEventListener('change', renderColormap)

        } else {
            uiScene.remove( sprite )
            console.log(labels)
            console.log("sprite children",  sprite.children)
            // sprite.children.forEach( m => uiScene.remove(m))
            // sprite.children.forEach( m => scene.remove(m))
            labels.map( la => uiScene.remove(la))

            // appendRender.length = 0

            container.removeChild(this.labelRenderer.domElement)
            // const controls = new OrbitControls(perpCamera, renderer.domElement)
            // controls.addEventListener('change', render)

        }
        // setVisibleMap( !visibleMap )
        // setVisibleMap( prev => !prev)
        // setVisibleMap( mesh.material.vertexColors)
        mesh.material.needsUpdate = true
        console.log( 'before', mesh.material.needsUpdate )
        // mesh.material.vertexColors 

        // mesh.material.needsUpdate = true
        // console.log( mesh.material.needsUpdate )
        this.renderScene()
        this.renderColormap()
    }

    render(){

        return (
            <>
                <div className='myviewer'>
                    <div className='toolbar'>
                        <button onClick={this.onClickButton}>MESH ON/OFF</button><br/>
                        <button onClick={this.onClickSwitchColor}>COLOR ON/OFF</button><br/>

                    </div>
                    <div ref={this.root}></div>
                    <div id="earthDiv"/>
                </div>
            </>
        )
    }   

}
