import React from 'react'
import './DioButton.css'
export default function DioButton(props) {
	let { img, text, onClick, offImg, style, horizontal } = props

	horizontal = ( horizontal === undefined ) || horizontal ? true : false
	const [imgSrc, setImgSrc] = React.useState(img)

	const buttonStyle = {}

	function onMouseOver(event) {
		if (img) {
			setImgSrc(img)
		}
	}

	function onMouseOut(event) {
		if (offImg) {
			setImgSrc(offImg)
		}
	}

	const ref = React.createRef()

	const imgStyle = {}

	if ( horizontal ) {
		imgStyle.height = '95%'
	} else {
		imgStyle.width = '95%'
	}

	// let imgStyle = {
	// 	width: "95%"
	// }
	// const [imgStyle, setImgStyle] = React.useState({})
	// React.useEffect( () => {
	// 	// console.log( ref.current )
	// 	// console.dir( ref.current )
	// 	const rect = ref.current.getBoundingClientRect()
	// 	if( rect.width > rect.height ){
	// 		setImgStyle({
	// 			height:"95%",
	// 			// objectPosition: "5%"
	// 	})

	// 		// imgStyle.height = "95%"
	// 	} else {
	// 		setImgStyle({
	// 			width:"95%",
	// 			// objectPosition: "0% 5%"

	// 		})
	// 		// imgStyle.width = "95%"
	// 	}

	// 	// console.log( ref.current.getBoundingClientRect())
	// }, [])

	return (
		<div
			className="diobutton"
			ref={ref}
			{...props}
			style={style}
			onClick={onClick}
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
		>
			{imgSrc && <img src={imgSrc} style={imgStyle} />}

			<label>{text}</label>
		</div>
	)
}
