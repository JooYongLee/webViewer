import React from 'react'

import { Stage, Layer, Image } from 'react-konva'
import useImage from 'use-image'
import './Konvacanvas.css'
// import airplane from "./images/airplane.png";

// https://konvajs.org/docs/sandbox/Image_Border.html
// https://codesandbox.io/s/konva-complex-move-4zhxx?file=/src/index.js:5289-5301
const DynamicImage = React.forwardRef((props, ref) => {
	// const [image] = useImage('https://konvajs.org/assets/lion.png')

	const [imageX, setImageX] = React.useState(props.x)
	const [imageY, setImageY] = React.useState(props.y)
	const [image] = useImage(props.src)
	const handleDragEnd = (e) => {
		setImageX(e.target.attrs.x)
		setImageY(e.target.attrs.y)
	}

	// React.useEff

	const handleDragMove = (e) => {
		// console.dir(e)
		// console.log( ref.current )
	}

	const onMouseDown = (e) => {
		console.log(e)
	}

    
    var canvas = document.createElement('canvas');
    var tempCanvas = document.createElement('canvas');

    console.log("canvas", canvas, tempCanvas)

	// make all pixels opaque 100% (except pixels that 100% transparent)
	function removeTransparency(canvas) {
		var ctx = canvas.getContext('2d')

		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
		var nPixels = imageData.data.length
		for (var i = 3; i < nPixels; i += 4) {
			if (imageData.data[i] > 0) {
				imageData.data[i] = 255
			}
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.putImageData(imageData, 0, 0)
		return canvas
	}


	function Border(imageData) {
		var nPixels = imageData.data.length

        console.log("border========>")
		var size = this.getAttr('borderSize') || 0

		// - first set correct dimensions for canvases
		canvas.width = imageData.width
		canvas.height = imageData.height

		tempCanvas.width = imageData.width
		tempCanvas.height = imageData.height

		// - the draw original shape into temp canvas
		tempCanvas.getContext('2d').putImageData(imageData, 0, 0)

		// - then we need to remove alpha chanel, because it will affect shadow (transparent shapes has smaller shadow)
		removeTransparency(tempCanvas)

		var ctx = canvas.getContext('2d')
		var color = this.getAttr('borderColor') || 'black'

		// 3. we will use shadow as border
		// so we just need apply shadow on the original image
		ctx.save()
		ctx.shadowColor = color
		ctx.shadowBlur = size
		ctx.drawImage(tempCanvas, 0, 0)
		ctx.restore()

		// - Then we will dive in into image data of [original image + shadow]
		// and remove transparency from shadow
		var tempImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

		var SMOOTH_MIN_THRESHOLD = 3
		var SMOOTH_MAX_THRESHOLD = 10

		let val, hasValue

		var offset = 20

		for (var i = 3; i < nPixels; i += 4) {
			// skip opaque pixels
			if (imageData.data[i] === 255) {
				continue
			}

			val = tempImageData.data[i]
			hasValue = val !== 0
			if (!hasValue) {
				continue
			}
			if (val > SMOOTH_MAX_THRESHOLD) {
				val = 255
			} else if (val < SMOOTH_MIN_THRESHOLD) {
				val = 0
			} else {
				val =
					((val - SMOOTH_MIN_THRESHOLD) /
						(SMOOTH_MAX_THRESHOLD - SMOOTH_MIN_THRESHOLD)) *
					255
			}
			tempImageData.data[i] = val
		}

		// draw resulted image (original + shadow without opacity) into canvas
		ctx.putImageData(tempImageData, 0, 0)

		// then fill whole image with color (after that shadow is colored)
		ctx.save()
		ctx.globalCompositeOperation = 'source-in'
		ctx.fillStyle = color
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		ctx.restore()

		// then we need to copy colored shadow into original imageData
		var newImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

		var indexesToProcess = []
		for (var i = 3; i < nPixels; i += 4) {
			var hasTransparentOnTop =
				imageData.data[i - imageData.width * 4 * offset] === 0
			var hasTransparentOnTopRight =
				imageData.data[i - (imageData.width * 4 + 4) * offset] === 0
			var hasTransparentOnTopLeft =
				imageData.data[i - (imageData.width * 4 - 4) * offset] === 0
			var hasTransparentOnRight = imageData.data[i + 4 * offset] === 0
			var hasTransparentOnLeft = imageData.data[i - 4 * offset] === 0
			var hasTransparentOnBottom =
				imageData.data[i + imageData.width * 4 * offset] === 0
			var hasTransparentOnBottomRight =
				imageData.data[i + (imageData.width * 4 + 4) * offset] === 0
			var hasTransparentOnBottomLeft =
				imageData.data[i + (imageData.width * 4 - 4) * offset] === 0
			var hasTransparentAround =
				hasTransparentOnTop ||
				hasTransparentOnRight ||
				hasTransparentOnLeft ||
				hasTransparentOnBottom ||
				hasTransparentOnTopRight ||
				hasTransparentOnTopLeft ||
				hasTransparentOnBottomRight ||
				hasTransparentOnBottomLeft

			// if pixel presented in original image - skip it
			// because we need to change only shadow area
			if (
				imageData.data[i] === 255 ||
				(imageData.data[i] && !hasTransparentAround)
			) {
				continue
			}
			if (!newImageData.data[i]) {
				// skip transparent pixels
				continue
			}
			indexesToProcess.push(i)
		}

		for (var index = 0; index < indexesToProcess.length; index += 1) {
			var i = indexesToProcess[index]

			var alpha = imageData.data[i] / 255

			if (alpha > 0 && alpha < 1) {
				var aa = 1 + 1
			}
			imageData.data[i] = newImageData.data[i]
			imageData.data[i - 1] =
				newImageData.data[i - 1] * (1 - alpha) +
				imageData.data[i - 1] * alpha
			imageData.data[i - 2] =
				newImageData.data[i - 2] * (1 - alpha) +
				imageData.data[i - 2] * alpha
			imageData.data[i - 3] =
				newImageData.data[i - 3] * (1 - alpha) +
				imageData.data[i - 3] * alpha

			if (newImageData.data[i] < 255 && alpha > 0) {
				var bb = 1 + 1
			}
		}
	}

    React.useEffect( ()=>{
        console.log("[DynamicImage]", ref)
        console.log( ref.current.filters )

        ref.current.filters([Border])
		ref.current.cache()
    })
	return (
		<Image
			ref={ref}
			{...props}
			x={imageX}
			y={imageY}
			draggable
			image={image}
			onMouseDown={onMouseDown}
			// onClick={onClick}
			// onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onDragMove={handleDragMove}
		/>
	)
})

export default function Konvacanvas() {
	const imagRef1 = React.createRef(null)
	const layerRef = React.createRef(null)
	React.useEffect(() => {
		console.log(layerRef)
		console.log(imagRef1.current)
		console.dir(imagRef1.current)
		// imagRef1.current.filters([Border])
		// imagRef1.current.cache()
        // console.log( "filter==>", imagRef1.current.filters)
        // image.filters([Border]);
        // image.cache();
	})


	return (
		<Stage width={window.innerWidth} height={window.innerHeight}>
			<Layer ref={layerRef}>
				<DynamicImage ref={imagRef1} src={'/images/lion.png'} />
			</Layer>
		</Stage>
	)
}
