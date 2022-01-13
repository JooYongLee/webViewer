import React from 'react'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Lut } from 'three/examples/jsm/math/Lut.js'
import {
	CSS2DRenderer,
	CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer.js'

import MeshLoader from './MeshLoader'
import ThreeMesh from './ThreeMesh'
import './LabelRender.css'
export default function LabelRender() {

    const renderRef = React.useRef(null)
	let camera, scene, renderer, labelRenderer

	const clock = new THREE.Clock()
	const textureLoader = new THREE.TextureLoader()

	let moon

    React.useEffect( ()=>{
        init()
        animate()
    }, [])

	function init() {
		const EARTH_RADIUS = 1
		const MOON_RADIUS = 0.27

		camera = new THREE.PerspectiveCamera(
			45,
			window.innerWidth / window.innerHeight,
			0.1,
			200
		)
		camera.position.set(10, 5, 20)

		scene = new THREE.Scene()

		const dirLight = new THREE.DirectionalLight(0xffffff)
		dirLight.position.set(0, 0, 1)
		scene.add(dirLight)

		const axesHelper = new THREE.AxesHelper(5)
		scene.add(axesHelper)

		//

		const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 16, 16)
		const earthMaterial = new THREE.MeshPhongMaterial({
			specular: 0x333333,
			shininess: 5,
			map: textureLoader.load('textures/planets/earth_atmos_2048.jpg'),
			specularMap: textureLoader.load(
				'textures/planets/earth_specular_2048.jpg'
			),
			normalMap: textureLoader.load(
				'textures/planets/earth_normal_2048.jpg'
			),
			normalScale: new THREE.Vector2(0.85, 0.85),
		})
		const earth = new THREE.Mesh(earthGeometry, earthMaterial)
		scene.add(earth)

		const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS, 16, 16)
		const moonMaterial = new THREE.MeshPhongMaterial({
			shininess: 5,
			map: textureLoader.load('textures/planets/moon_1024.jpg'),
		})
		moon = new THREE.Mesh(moonGeometry, moonMaterial)
		scene.add(moon)

		//

		const earthDiv = document.createElement('div')
		earthDiv.className = 'label'
		earthDiv.textContent = 'Earth'
		earthDiv.style.marginTop = '-1em'
		// earthDiv.style.color = 'white'
		const earthLabel = new CSS2DObject(earthDiv)
		earthLabel.position.set(0, EARTH_RADIUS, 0)
		earth.add(earthLabel)

		const moonDiv = document.createElement('div')
		moonDiv.className = 'label'
		moonDiv.textContent = 'Moon'
		moonDiv.style.marginTop = '-1em'
		const moonLabel = new CSS2DObject(moonDiv)
		moonLabel.position.set(0, MOON_RADIUS, 0)
		moon.add(moonLabel)

		//
        const rootElem = renderRef.current

		renderer = new THREE.WebGLRenderer()
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(window.innerWidth, window.innerHeight)
		rootElem.appendChild(renderer.domElement)

		labelRenderer = new CSS2DRenderer()
		labelRenderer.setSize(window.innerWidth, window.innerHeight)
		labelRenderer.domElement.style.position = 'absolute'
		labelRenderer.domElement.style.top = '0px'
		rootElem.appendChild(labelRenderer.domElement)

		const controls = new OrbitControls(camera, labelRenderer.domElement)
		controls.minDistance = 5
		controls.maxDistance = 100

		//

		window.addEventListener('resize', onWindowResize)
	}

	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight

		camera.updateProjectionMatrix()

		renderer.setSize(window.innerWidth, window.innerHeight)

		labelRenderer.setSize(window.innerWidth, window.innerHeight)
	}

	function animate() {
		requestAnimationFrame(animate)

		const elapsed = clock.getElapsedTime()

		moon.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5)

		renderer.render(scene, camera)
		labelRenderer.render(scene, camera)
	}
	return <div ref={renderRef} className='label-render'></div>
}
