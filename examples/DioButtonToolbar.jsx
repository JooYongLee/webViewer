import React from 'react'
import DioButton from './DioButton'
import DioButtonSprite from './DioButtonSprite'
import './DioButtonToolbar.css'
export default function DioButtonToolbar() {
	const publicUrl = process.env.PUBLIC_URL
	
	const props1 = {
		id: "test-button",
		img:  publicUrl + './images/lower_hover.png',
		text: 'crown',
		offImg: publicUrl + '/images/lower_img.png',
		style: {
			width: '98%',
			flexGrow: 1,
		},
	}

	const props2 = {
		id: "button-prop2",
		img: './images/worklist/date.png',
		text: 'crown',
		offImg: './images/worklist/caselist.png',
		style: {
			width: '98%',
			flexGrow: 1,
		},
	}

	const props3 = {
		img: './images/worklist/setting@3x.png',
		text: 'crown',
		offImg: './images/worklist/newcase.png',
		style: {
			width: '98%',
			flexGrow: 1,
		},
	}

	props1.onClick = (e) => {
		console.log("clieck button 2", e.target)
		// console.log("clieck button 2", e.target)
		console.dir(e.target)
		console.log("target id:", e.target.name, e.target.id)
		// console.log(e.target.parentNode.id)
	}

	const props4 = {
		id: "test-button",
		img:  publicUrl + '/images/temp/occlusal_plane.png',
		// img:  publicUrl + '/images/lower_hover.png',
		text: "ABC",
		// offImg: publicUrl + '/images/temp/occlusal_plane.png',
		style: {
			// color: "white",
			// width: '98%',
			// flexGrow: 1,
		},

		style: {
			
			width:"500px",
			height: "80px",
		}


	}



	return (
		<>
			<div className="diobuttonToolbar" style={{width:"50vw", height:"50vh"}}>
				<DioButton {...props1} style={{flexGrow:"1"}}/>
				<DioButton {...props2} style={{flexGrow:"1"}}/>
				<DioButton {...props3} style={{flexGrow:"1"}}/>

			</div>

			{/* <div class="slidecontainer">
				<input
					type="range"
					min="0"
					max="100"
					defaultValue="50"
					class="slider"
					id="myRange"
				/>
			</div> */}


			{/* <DioButtonSprite {...props4} x={0} y={94}/> */}
		</>
	)
}
