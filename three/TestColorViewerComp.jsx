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
     * @param {TestColorViewer} viewer 
     */
    constructor(viewer){
        // viewer.
        this.viewer = viewer
        console.log('ColorMap', viewer)

        // this.mapper = new ColorMap(this)
        this.orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 2)
		this.orthoCamera.position.set(0.5, 0, 1)

        
        this.uiScene =  new THREE.Scene()


        this.lut = new Lut()

        this.sprite = new THREE.Sprite(
			new THREE.SpriteMaterial({
				map: new THREE.CanvasTexture(this.lut.createCanvas()),
			})
		)

        const sprite = this.sprite
        sprite.geometry.computeBoundingBox()
		sprite.scale.x = 0.1

        /** @type { THREE.Mesh } */
        this.mesh = null
        
        this.params = {
			colorMap: 'rainbow',
		}
    
        this.labels = []

        this.init()
        this.initBar()
    }

    updateProjectionMatrix(){
        const width = window.innerWidth
		const height = window.innerHeight
        this.orthoCamera.aspect = width / height
		this.orthoCamera.updateProjectionMatrix()

    }


    init(){



    }

    initBar(){
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

        // this.labels.map( la => this.uiScene.add( la))
		// this.uiScene.add( this.sprite)

    }


    
	updateColors = () => {
        if( ! this.mesh ){
            return
        }
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
        this.viewer.renderScene()
	}

    renderScene(e){
        // e.stopPropagation();
        // this.viewer.renderScene()

        // const width = window.innerWidth
		// const height = window.innerHeight


        
        // this.viewer.renderer.clear()
		// this.viewer.renderer.render(this.viewer.scene, this.perpCamera)

        // this.viewer.renderer.render(this.uiScene, this.orthoCamera)
		// this.labelRenderer.render(this.uiScene, this.orthoCamera)


    }

    attach(){

        // const container = this.viewer.root.current
        // const container = document.getElementById('canvasroot')
        // // console.warn('attach', container)
        // container.appendChild( this.labelRenderer.domElement )


		// controlsLabel.addEventListener('change', this.renderScene)
		// controlsLabel.addEventListener('change', this.renderScene)
        

        // const container = this.viewer.root.current
        // console.warn('attach', container)
        // container.appendChild( this.labelRenderer.domElement )

        // const controlsLabel = new OrbitControls( this.perpCamera, this.labelRenderer.domElement );
        // controlsLabel.minDistance = 5;
        // controlsLabel.maxDistance = 100;
		// controlsLabel.addEventListener('change', this.render)

    }

    detach(){
        const container = this.viewer.root.current
        // container.removeChild( this.labelRenderer.domElement )
    }

    mapOn(){
        if( !this.mesh ){
            return
        }
        this.mesh.material.vertexColors = true
        this.uiScene.add( this.sprite )

        console.log("[mapOn]", this.labels)
        this.labels.map( label => this.uiScene.add(label) )

        // this.attach()

        this.mesh.material.needsUpdate = true


        // this.renderScene()

    }

    mapOff(){

        this.mesh.material.vertexColors = false
        this.uiScene.remove( this.sprite )
        this.labels.map( label => this.uiScene.remove(label) )

        // this.detach()

        this.mesh.material.needsUpdate = true
        // this.viewer.render()

    }

    setMesh(mesh){
        this.mesh = mesh
        this.updateColors()
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
    
        // this.container
        
        
		this.perpCamera = new THREE.PerspectiveCamera(60, 1, 1, 100)
		this.perpCamera.position.set(0, 0, 10)
		// scene.add(perpCamera)


        // this.perpCamera
        // this.orthoCamera
        this.renderer = new THREE.WebGLRenderer({ antialias: true })

        this.labelRenderer = new CSS2DRenderer()

    
        // scene = new THREE.Scene()
		// uiScene = new THREE.Scene()

        this.mesh = null
        this.scene =  new THREE.Scene()
		this.scene.background = new THREE.Color(0xff00ff)

        
        this.scene.add(this.perpCamera)

    
        // let controls, controlsLabel

    }
    // controls.ad
    componentDidMount(){
        this.init()
    }


	init = () => {
        const container = this.root.current
        this.mapper = new ColorMap(this)


		const width = window.innerWidth
		const height = window.innerHeight

        

		this.mesh = new THREE.Mesh(
			undefined,
			new THREE.MeshPhongMaterial({
				side: THREE.DoubleSide,
				color: 0xf5f5f5,
				vertexColors: this.state.vertexColors,
			})
		)

        // mesh.add( earthLabel )
        // sprite.add( earthLabel )
        // scene.add( earthLabel );
        // uiScene.add( earthLabel )
        // uiScene.add( earthLabel2 )
        // uiScene.add( earthLabel3 )

		this.scene.add( this.mesh)

		this.loadModel().then( mesh => {

            // this.mapper.setMesh(mesh)
            // this.mapper.mapOn()
        })

		const pointLight = new THREE.PointLight(0xffffff, 1)
		this.perpCamera.add(pointLight)

        this.labelRenderer.setSize( width, height );
        this.labelRenderer.domElement.style.position = 'absolute'
        this.labelRenderer.domElement.style.top = '0px'

		this.renderer.autoClear = false
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(width, height)

		container.appendChild( this.renderer.domElement)
        container.appendChild( this.labelRenderer.domElement )

		window.addEventListener('resize', this.onWindowResize)

		const controls = new OrbitControls(this.perpCamera, this.renderer.domElement)
		controls.addEventListener('change', this.renderScene)

        const controlsLabel = new OrbitControls( this.perpCamera, this.labelRenderer.domElement );
        controlsLabel.minDistance = 5;
        controlsLabel.maxDistance = 100;
		controlsLabel.addEventListener('change', this.renderColormap)
            
        // this.mapper.setMesh( this.mesh )
        
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

        this.mapper.updateProjectionMatrix()
		this.renderer.setSize(width, height)
        this.labelRenderer.setSize(width, height)
		// this.renderScene()
		this.renderColormap()
	}

    renderColormap = (e) => {
        console.log('renderColormap', e)

        // this.renderer.clear()
		// this.renderer.render(this.scene, this.perpCamera)
        this.renderScene(e)

        this.renderer.render(this.mapper.uiScene, this.mapper.orthoCamera)
		this.labelRenderer.render(this.mapper.uiScene, this.mapper.orthoCamera)
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
        return loader.load({objectUrl: filename})
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
			// this.updateColors()

			this.renderScene()

            return this.mesh


        })
        .catch( e => console.error(e))
        
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

    // onClickSwitchColor = (event) => {
    // }
    mapOn = () => {
        this.mapper.setMesh( this.mesh )
        this.mapper.mapOn()
    }

    mapOff = () => {
        this.mapper.mapOff()

    }

    onClickSwitchColor = (event) => {
        console.log( this.state.vertexColors )
        // this.mapper.mapOn()
        const container = this.root.current

        if( this.state.vertexColors ){


            this.mapOn()
            container.appendChild(this.labelRenderer.domElement)

            this.renderColormap()
        } else {
            this.mapOff()
            container.removeChild(this.labelRenderer.domElement)
            this.renderScene()
        }
        this.setState({vertexColors: !this.state.vertexColors})
        // const mesh = this.mesh
        // const scene = this.scene
        // const uiScene = this.uiScene
        // const container = this.root.current
        // const labels = this.labels
        // const sprite = this.sprite

        // mesh.material.vertexColors = !  mesh.material.vertexColors
        // if( mesh.material.vertexColors ){
        //     uiScene.add( sprite )
        //     labels.map( la => uiScene.add(la))
        //     // appendRender.push( renderColormap )


        //     ///
        //     container.appendChild(this.labelRenderer.domElement)
        //     // const controls = new OrbitControls(perpCamera, renderer.domElement)
        //     // controls.addEventListener('change', renderColormap)

        // } else {
        //     uiScene.remove( sprite )
        //     console.log(labels)
        //     console.log("sprite children",  sprite.children)
        //     // sprite.children.forEach( m => uiScene.remove(m))
        //     // sprite.children.forEach( m => scene.remove(m))
        //     labels.map( la => uiScene.remove(la))

        //     // appendRender.length = 0

        //     container.removeChild(this.labelRenderer.domElement)
        //     // const controls = new OrbitControls(perpCamera, renderer.domElement)
        //     // controls.addEventListener('change', render)

        // }
        // // setVisibleMap( !visibleMap )
        // // setVisibleMap( prev => !prev)
        // // setVisibleMap( mesh.material.vertexColors)
        // mesh.material.needsUpdate = true
        // console.log( 'before', mesh.material.needsUpdate )
        // // mesh.material.vertexColors 

        // // mesh.material.needsUpdate = true
        // // console.log( mesh.material.needsUpdate )
        // this.renderScene()
        // this.renderColormap()
    }

    render(){

        return (
            <>
                <div className='myviewer'>
                    <div className='toolbar'>
                        <button onClick={this.onClickButton}>MESH ON/OFF</button><br/>
                        <button onClick={this.onClickSwitchColor}>COLOR ON/OFF</button><br/>

                    </div>
                    <div ref={this.root} id='canvasroot'></div>
                    <div id="earthDiv"/>
                </div>
            </>
        )
    }   

}
