import React from 'react'
import './DioButton.css'
export default function DioButton(props) {
	const { id, img, text, onClick, offImg, style } = props
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

	const onClickHandle = (callback) => {
		return (event)=>{
			// 하위 element 가 클릭되기 때문에 부모엘리먼트에 아이디 부여
			event.target.id = id			
			callback && callback(event)
			return event
		}
	}

	return (
		<div
			className="diobutton"
            {...props}
            
			style={style}
			onClick={onClickHandle(onClick)}
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}


		>
			{imgSrc && <img src={imgSrc} />}

			<label>{text}</label>
		</div>
	)
}
