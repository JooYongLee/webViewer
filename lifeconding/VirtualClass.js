import React from "react"
import "./VirtualClass.css"
export default function Visitor() {
    return (<>
        <div>
            <a href="https://naver.com">AAAAAAAA    </a>
            <br />
            <a href="https://naver.com">네이버fdsfsdf</a>
            <br />
            <input type="text" />
            <h1 className="h1h1">Show Me The Money</h1>
            <h1>Show Me The Money</h1>
        </div>
        <div>
            <button className="test-button"
                image="./yuna.jpg"
                background-image="./yuna.jpg"
            >Test</button>

            {/* <input type="image" src="./yuna.jpg"
                alt="Submit" width="100px" height="100px" /> */}

            <div class="container">
                <img src="./yuna.jpg" alt="Snow"/>
                    <button class="btn">Button</button>
            </div>
        </div>
    </>)
}