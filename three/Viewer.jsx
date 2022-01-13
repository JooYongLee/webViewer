import React from 'react'

import * as THREE from 'three'


import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Lut } from 'three/examples/jsm/math/Lut.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import MeshLoader from './MeshLoader'
import ThreeMesh from './ThreeMesh'
import './Viewer.css'

export default function Viewer() {
    const root = React.useRef(null)
	let container

	let perpCamera, orthoCamera, renderer, lut

    let mesh, sprite
	let scene, uiScene

    let params

    const labelRenderer = new CSS2DRenderer();

    React.useEffect( ()=>{

        
        init()

    }, [])


	function init() {
        container = root.current

        

		// container = document.getElementById('container')

		scene = new THREE.Scene()
		scene.background = new THREE.Color(0xff00ff)

		uiScene = new THREE.Scene()

		lut = new Lut()

		const width = window.innerWidth
		const height = window.innerHeight

		perpCamera = new THREE.PerspectiveCamera(60, width / height, 1, 100)
		perpCamera.position.set(0, 0, 10)
		scene.add(perpCamera)

		orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 2)
		orthoCamera.position.set(0.5, 0, 1)

		sprite = new THREE.Sprite(
			new THREE.SpriteMaterial({
				map: new THREE.CanvasTexture(lut.createCanvas()),
			})
		)
        sprite.geometry.computeBoundingBox()
        console.log("spsrite:", sprite)
		// sprite.position.x = 1.0
        // sprite.translateX(0.9)
		sprite.scale.x = 0.1
		// sprite.scale.y = 2.0
		// sprite.scale.x = 0.125
		uiScene.add(sprite)

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
        // earthLabel.position.set( EARTH_RADIUS, EARTH_RADIUS, 0 );

        

		mesh = new THREE.Mesh(
			undefined,
			new THREE.MeshPhongMaterial({
				side: THREE.DoubleSide,
				color: 0xf5f5f5,
				// vertexColors: true,
			})
		)

        // mesh.add( earthLabel )
        // sprite.add( earthLabel )
        // scene.add( earthLabel );
        uiScene.add( earthLabel )
        uiScene.add( earthLabel2 )
        uiScene.add( earthLabel3 )
		scene.add(mesh)

		params = {
			colorMap: 'rainbow',
		}
		loadModel()

		const pointLight = new THREE.PointLight(0xffffff, 1)
		perpCamera.add(pointLight)

		renderer = new THREE.WebGLRenderer({ antialias: true })
		renderer.autoClear = false
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(width, height)
		container.appendChild(renderer.domElement)

        
        labelRenderer.setSize( width, height );
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = '0px';
        container.appendChild( labelRenderer.domElement )


		window.addEventListener('resize', onWindowResize)

		// const controls = new OrbitControls(perpCamera, renderer.domElement)
		// controls.addEventListener('change', render)

        // controls.ad
        const controlsLabel = new OrbitControls( perpCamera, labelRenderer.domElement );
        controlsLabel.minDistance = 5;
        controlsLabel.maxDistance = 100;
		controlsLabel.addEventListener('change', render)


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

	function onWindowResize() {
		const width = window.innerWidth
		const height = window.innerHeight

		perpCamera.aspect = width / height
		perpCamera.updateProjectionMatrix()

		renderer.setSize(width, height)
		render()
	}

	function render() {
        // console.log('----------')
		renderer.clear()
		renderer.render(scene, perpCamera)
		renderer.render(uiScene, orthoCamera)
		// renderer.render(uiScene, perpCamera)

		// labelRenderer.render(scene, perpCamera)
		labelRenderer.render(uiScene, orthoCamera)
		// labelRenderer.render(uiScene, orthoCamera)
		// labelRenderer.render(uiScene, orthoCamera)
	}

    const filename = 'Tooth_16.stl'
    // const filename = 'UpperJawScan2.stl'


	function loadModel() {
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

			mesh.geometry = geometry
			updateColors()

			render()


        })
        .catch( e => console.error(e))
        
	}

	function updateColors() {
		lut.setColorMap(params.colorMap)

		lut.setMax(1)
		lut.setMin(-1)

        /** *  @type {THREE.BufferGeometry} */
		const geometry = mesh.geometry
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
        mesh.material.vertexColors = true
		const map = sprite.material.map
		lut.updateCanvas(map.image)
		map.needsUpdate = true
	}

    const onClickButton = (event) => {
        // console.log(event.target)
        console.log( scene )
        // console.log( scene.children )
        const index = scene.children.indexOf(mesh) 
        console.log( index )

        if( index >= 0 ){
            scene.remove( mesh)
        } else {
            scene.add( mesh )
        }
        render()
            // scene.children

    }

    const onClickSwitchColor = (event) => {
        mesh.material.vertexColors = ! mesh.material.vertexColors
        // mesh.material.needsUpdate = true
        // mesh.geometry.attributes.color.needsUpdate = true
        mesh.material.needsUpdate = true
        console.log( 'before', mesh.material.needsUpdate )
        // mesh.material.vertexColors 

        // mesh.material.needsUpdate = true
        // console.log( mesh.material.needsUpdate )
        render()
    }
    return (
		<>
            <div className='myviewer'>
                <div className='toolbar'>
                    <button onClick={onClickButton}>MESH ON/OFF</button><br/>
                    <button onClick={onClickSwitchColor}>COLOR ON/OFF</button><br/>

                </div>
                <div ref={root}></div>
                <div id="earthDiv"/>
            </div>
		</>
	)
}
