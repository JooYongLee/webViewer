import React from 'react'
import DioButton from './DioButton'
import './DioButtonToolbar.css'
export default function DioButtonToolbar() {
	const props1 = {
		img: './images/crown@3x.png',
		text: 'crown',
		offImg: './images/newcase.png',
		style: {
			width: '98%',
			flexGrow: 1,
		},
	}

	const props2 = {
		id: "button-prop2",
		img: './images/date.png',
		text: 'crown',
		offImg: './images/caselist.png',
		style: {
			width: '98%',
			flexGrow: 1,
		},
	}

	const props3 = {
		img: './images/setting@3x.png',
		text: 'crown',
		offImg: './images/newcase.png',
		style: {
			width: '98%',
			flexGrow: 1,
		},
	}

	props2.onClick = (e) => {
		console.log("clieck button 2", e.target)
		// console.log("clieck button 2", e.target)
		console.dir(e.target)
		console.log(e.target.parentNode.id)
		

	}

	return (
		<>
			<div className="diobuttonToolbar">
				<DioButton {...props1} />
				<DioButton {...props2} />
				<DioButton {...props3} />
			</div>

			<div class="slidecontainer">
				<input
					type="range"
					min="0"
					max="100"
					defaultValue="50"
					class="slider"
					id="myRange"
				/>
			</div>
		</>
	)
}
