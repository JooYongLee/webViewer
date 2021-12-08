import React from 'react'
import DioButton from './DioButton'
import './DioButtonToolbar.css'

function DioButtonsCompo( { flexDirection = "row" } ) {
	// flexDirection = "row"
	// const flexDirection = "row"
	console.log("DioButtonsCompo", flexDirection)
	const horizontal = flexDirection === "column" 

	const props1 = {
		img: './images/setting@3x.png',
		horizontal,
		text: 'crown',
		offImg: './images/newcase.png',
		style: {
			flexGrow: 1,
		},
	}

	const props2 = {
		id: 'button-prop2',
		horizontal,

		img: './images/date.png',
		text: 'crown',
		offImg: './images/caselist.png',
		style: {
			flexGrow: 1,
		},
	}

	const props3 = {
		img: './images/setting@3x.png',
		horizontal,

		text: 'crown',
		offImg: './images/newcase.png',
		style: {
			flexGrow: 1,
		},
	}

	props2.onClick = (e) => {
		console.log('clieck button 2', e.target)
		// console.log("clieck button 2", e.target)
		console.dir(e.target)
		console.log(e.target.parentNode.id)
	}
	// style={{flexDirection:"column"}
	return (
		<>
			<div className="diobuttonToolbar" style={{flexDirection,}}>
				{/* <div style={{flexGrow:1}}>item1</div>
				<div style={{flexGrow:1}}>item2</div>
				<div style={{flexGrow:1}}>item3</div> */}
				<DioButton {...props1} />
				<DioButton {...props2} />
				<DioButton {...props3} />
			</div>
		</>
	)
}

export default function DioButtonToolbar() {


	// props2.onClick = (e) => {
	// 	console.log('clieck button 2', e.target)
	// 	// console.log("clieck button 2", e.target)
	// 	console.dir(e.target)
	// 	console.log(e.target.parentNode.id)
	// }
	const style={display:"flex", height:"50vh", width:"50vw",
	flexDirection:"colume",
border:"2px solid red", position:"relative",}
	return (
		<>
			<div style={style}>
				<DioButtonsCompo />
				{/* <DioButtonsCompo /> */}
				{/* <DioButtonsCompo /> */}
				{/* <DioButtonsCompo /> */}
				{/* <DioButtonsCompo /> */}
				{/* <DioButtonsCompo /> */}
			</div>
		</>
	)
}
