import React from 'react'
import './DioButtonSprite.css'

/**
 * 
 * @param {String} urlPath 
 * @returns {Promise<Image>}
 */
function loadImage(urlPath) {
	return new Promise((resolve, reject) => {

		const newimage = new Image();
		newimage.src = urlPath
		newimage.onload = () => {
			console.log("======>", newimage)
			console.dir(newimage)
			resolve(newimage)
		}

		newimage.onerror = (e) => {
			reject(e)
		}
	})
};


export default function DioButtonSprite(props) {
	const { id, img, text, onClick, offImg, style, x, y, imgWidth, imgHeight } = props
	const [imgSrc, setImgSrc] = React.useState(img)

	console.log("================>", imgSrc)
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

	const onClickHandle = (callback) => {
		return (event) => {
			// 하위 element 가 클릭되기 때문에 부모엘리먼트에 아이디 부여
			event.target.id = id
			callback && callback(event)
			return event
		}
	}

	const ix = x || 0
	const iy = y || 0
	// TODO:set image size
	const iWidth = imgWidth || "186px"
	const iHeight = imgHeight || "47px"


	const divImgstyle = {
		backgroundImage: `url(${imgSrc})`,
		backgroundPosition: `${ix * (-1)}px ${iy * (-1)}px`,
		backgroundRepeat: 'no-repeat',		
		width: iWidth,
		height: iHeight,
		// backgroundSize: "186px 47px"
		transform: "scale(1.0)"
	};

	console.log( "[DioButtonCombi]\n\n", divImgstyle )


	// const tt = "url('." + img + "')"
	// console.log(tt)
	// const imgstyle = {
	// 	// src: img,
	// 	// content: img,

	// 	// src: `url(${img})`,
	// 	objectPosition: "0% -55%",
	// 	// objectPosition: `${x }px ${y }px`,
	// 	// objectFit: "contain",		
	// 	// backgroundRepeat: 'no-repeat',
	// 	width: iWidth,
	// 	height: iHeight,
	// 	// backgroundImage: `url(${img})`,

	// };

	// const imgProps = {
	// 	src: img,
	// 	style: {
	// 		// content: `url(${img})`,
	// 		// content: img,
	// 		objectPosition: `${x * (-1)}px ${y * (-1)}px`,
	// 		objectFit: "contain",
	// 		width: iWidth,
	// 		height: iHeight,
	// 	}
	// }

	// console.log("image source", imgstyle)

	
	const imgref = React.createRef(imgSrc)
	// console.log("image source", imgProps)
	//   return <div style={style} />;
	const s0 = 1.0
	const [scale, setScale]= React.useState({transform:`scale(${s0})`})

	React.useEffect( ()=>{

		const ratio = 0.6
		const buttonElem = document.getElementById(id)
		const imgElem = document.getElementById(id + "button")
		// console.log(button, imgElem)

		console.log( buttonElem.getBoundingClientRect(), imgElem.getBoundingClientRect())
		
		const rescale = buttonElem.getBoundingClientRect().height / imgElem.getBoundingClientRect().height * ratio;

		// console.log("rescale===>", rescale)
		// setScale({transform:`scale(${rescale})`})
		setScale({transform: "scale(0.5)"})
		// divImgstyle.width =  buttonElem.getBoundingClientRect().width * 0.7



		console.log("[imagescale]", scale)

		// /// https://stackoverflow.com/questions/3098404/get-the-size-of-a-css-background-image-using-javascript
		// loadImage( img )
		// .then( res => {
		// 	console.log(`image size ${res.width} x ${res.height} `)
		// 	return res
		// })
	}, [])

	return (
		<>

			<div
				className="diobuttonSprite" 
				{...props}

				style={style}
				onClick={onClickHandle(onClick)}
				onMouseOver={onMouseOver}
				onMouseOut={onMouseOut}
			>
				{/* {imgSrc && <img  src={imgProps.src} style={ imgstyle }/>} */}
				{/* <div style={divImgstyle}></div> */}
				{/* <img id="home"/> */}
				
				{/* <div id={id + "button"} className="buttonimage" style={divImgstyle} style={scale} ref={imgref}> </div> */}
				<div id={id + "button"} className="buttonimage"  style={{...divImgstyle, ...scale}} ref={imgref}   > </div>
				<label style={{color:"white"}}>{text}</label>
			</div>
		</>
	)
}
