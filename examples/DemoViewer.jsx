import React from 'react'


import * as THREE from 'three'


import { TrackballControls } from '../lib/TrackballControls'

import "./DemoViewer.css"

export default class DemoViewer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            minZ: 0,
            maxZ: 10,
            cameraPosition: new THREE.Vector3(100, 100, 100),

            subDesign: null,

            isAnimating: false

        };

        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ alpha: true })

        // this.axesRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
        // this.axesScene = new THREE.Scene();

    }

    componentDidMount() {
        // this.init()

    }

    init = () => {
        console.log("this->root\n", this.root)

        this.root.appendChild(this.renderer.domElement);

        console.log("render dom element->", this.renderer.domElement)


        var width = window.innerWidth
        var height = window.innerHeight

        console.log("camera", width, "x", height)

        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.001, 1000)
        this.camera.position.copy(this.state.cameraPosition)
        this.camera.updateProjectionMatrix()

        let light = new THREE.PointLight(0xffffff, 0.8);
        light.position.set(-30, 52, 75)
        this.camera.add(light);
        this.scene.add(this.camera)


        this.renderer.setSize(width, height, false)

        this.controls = new TrackballControls(this.camera, this.renderer.domElement);
        // this.controls.update();

        this.controls.addEventListener('change', this.renderScene);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);


        this.renderScene()

    }


    renderScene = (e) => {
        this.renderer.render(this.scene, this.camera);

    }

    setRoot = (root) => {
        this.root = root
    }
    
    render() {

        const renderStyle = {
            display: 'inline-block',
            width: window.innerWidth,
            height: window.innerHeight
        }
        return (
            <>

                <div className="viewer" ref={this.setRoot} style={renderStyle}>
                </div>
                
                <div id="myHolyGrail" className="myHolyGrail"
                // ref={this.setRoot}
                >

                    <header>
                        <h1>Workflow</h1>
                    </header>

                    <section className="mainsection">

                        <nav>
                            <div>
                                <ul>
                                    <li>Upper</li>
                                    <li>Lower</li>
                                </ul>
                            </div>

                            <div className="toolbar">
                                <button className="olccusalButton">Occlusal</button>
                                <button>MyImage</button>

                            </div>
                        </nav>

                        <main >
                            Main Viewer

                        </main>

                        <aside>
                            Aside

                        </aside>




                    </section>

                    <footer>Footer</footer>
                </div>

                {/* </div> */}
            </>
        )
    }
}

