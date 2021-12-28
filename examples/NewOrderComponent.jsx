import React from 'react'
import "./NewOrderComponent.css"
import {
    BiTrash, 
    BiPlus,
    BiX
} from "react-icons/bi";


export function ContentInput() {
    const style = {

    }
    return (
        <div className='contentinput'>
            <div>Chart Number</div>
            <input type="text" className='nake-input' placeholder="Chart Number를 입력하세요"></input>
            <div>Order Number</div>
            <input type="text" className='nake-input' placeholder="Order Number를 입력하세요"></input>
            <div>Tooth Number</div>
            <input type="text" className='wrap-input'></input>
        </div>
    )
}

export function FileContents(props){

    const {
        text,

    } = props
    // style={{cursor:'pointer', height:'100%'}}
    const [empty, setEmpty] = React.useState(true)

    const onClick = (e) =>{
        setEmpty(!empty)
    }
    return (
        <div className='file-content'>
            <label>{text}</label>
            <div className='wrap-input'></div>
            { empty ? <BiPlus onClick={onClick}/> : <BiX onClick = {onClick}/>}
        </div>
    )
}
// https://www.w3schools.com/howto/howto_css_login_form.asp
export default function Loginform() {
    // onclick="document.getElementById('id01').style.display='none'"
    const onClick = (event) => {
        setFormVisible({
            display: 'none'
        })

    }
    const [formVisible, setFormVisible] = React.useState({
        display: 'block'
    })
    const onClickButton = e => {
        console.log("sdfdsf")
        setFormVisible({
            display: 'block'
        })
        // "document.getElementById('id01').style.display='block'"
    }

    const onSubmit = (event) => {
        event.preventDefault()
    }

    // for debug
    const onClickCapture = () => {
        // setFormVisible({
        //     display: 'none'
        // })
    }
	return (
		<>
			<h2>Modal Login Form</h2>
            <BiTrash style={{width:"100px", height:"100px", color:"red"}}/>
			<button
				onClick={onClickButton}
                style = {{width:"auto"}}
			>
				Login
			</button>

			<div id="id01" class="modal" style={formVisible} onClickCapture={onClickCapture}>
                <div 
                className='modal-content animate'
                // className='modal-content'
                method='post'>
                    <header>
                        <label>New Case</label>
                        <BiX style={{width:"2rem", height:"2rem"}}/>
                    </header>
                    <main>
                        <article>
                            <ContentInput/>
                            <div>
                                <FileContents text={"Upper Scan"}/>
                                <FileContents text={"Lower Scan"}/>
                                <FileContents text={"Waxrim Scan"}/>
                            </div>

                        </article>
                        <nav>
                            {/* <h5>Case Setting</h5> */}
                            <div>Case Setting</div>
                            <img></img>
                        </nav>
                    </main>
                    <footer>
                        <button>Cancel</button>
                        <button>Add</button>
                    </footer>
                </div>

			</div>
		</>
	)
}
