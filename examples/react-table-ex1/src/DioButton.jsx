import React from 'react'
import './DioButton.css'
export default function DioButton(props) {
	const { img, text, onClick, offImg, style } = props
	const [imgSrc, setImgSrc] = React.useState(img)

	const buttonStyle = {}

	function onMouseOver(event) {
		if (img) {
			setImgSrc(img)
		}
		// setImgSrc(event.target)
		// console.log('onMouseOver')
	}

	function onMouseOut(event) {
		if (offImg) {
			setImgSrc(offImg)
		}
	}

	return (
		<div
			className="diobutton"
            {...props}
            
			style={style}
			onClick={onClick}
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}


		>
			{imgSrc && <img src={imgSrc} />}

			<label>{text}</label>
		</div>
	)
}
