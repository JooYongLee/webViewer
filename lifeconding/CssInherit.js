import React from "react"
import "./CssInherit.css"
export default function CssInherit() {
    return (<>
        <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JAVASCRIPT</li>
        </ul>
        
        <ol id="lecture">
            <li>HTML</li>
            <li>CSS</li>
            
            <ol>
                <li>selector</li>
                <li>declatration</li>
                
            </ol>
            <li>Javascrpt</li>
        </ol>
    </>)
}