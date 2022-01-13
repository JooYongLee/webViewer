import React from 'react'
import './RadioComp.css'
// https://stackoverflow.com/questions/25823004/how-to-set-scroll-position-to-the-level-of-checked-radio-button
// https://developer.mozilla.org/ko/docs/Web/HTML/Element/Input/radio

function RadioElem(props) {
    let {id, value} = props
    const style = {
        display: 'flex'
    }
    const labelStyle = {
        flexGrow: 1
    }
    return (
        <div style={style}>
            <input type="radio" name='myradio' id={id} value={value} />
			<label htmlFor={id} style={labelStyle}>{value} </label>
        </div>
    )
}


export default function RadioComp() {

    const style = {
        width: '300px',
        height: '200px',
        overflowY: 'scroll'
    }

    const lists = [
        'this',
        'is',
        'list',
        'item',
        'do',
        'you',
        'know',
        'kimchi',
        'first',
        'list',
    ]
	return (
		<div id="radioContainer" style={style}>
            {
                lists.map( (value, idx) => <RadioElem key={value + idx} id={value + idx} value={value}/>)
            }
            {/* <RadioElem/>
            <RadioElem/>
            <RadioElem/> */}
			{/* <input type="radio" id="huey01" name="distance" value="1" />
			<label for="huey01">Huey</label>
			<br />
			<input type="radio" name="distance" value="2" />2<br />
			<input type="radio" name="distance" value="3" />3<br />
			<input type="radio" name="distance" value="4" />4<br />
			<input type="radio" name="distance" value="5" />5<br />
			<input checked type="radio" name="distance" value="6" />7<br />
			<input type="radio" name="distance" value="8" />8<br />
			<input type="radio" name="distance" value="9" />
			10
			<br /> */}
		</div>
	)
}
