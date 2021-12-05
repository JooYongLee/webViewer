import React from 'react'

import './ToolbarWorkList.css'
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement

import PropTypes from 'prop-types'
// import "/images/crown@3x.png"
// import { css, cx } from '@emotion/css'

const color = 'white'

// render(

// )
function OrderEdit({ props }) {
	// console.log("OrderEdit", props)
	// const orderStyle = {
	//     position: 'absolute',
	//     width: "200px",
	//     height: "200px",
	//     border: "2px border white",
	//     zIndex: "2"
	//     // "z-index": "2"
	// }
	// const orderRef = React.createRef()
	const orderRef = React.useRef(null)

	function btnClick(event) {
		console.log('[btnClick]', orderRef)
	}

	return (
		<>
			<div
				class="form-popup"
				id="myForm"
				ref={orderRef}
				style={{ ...props }}
			>
				<form class="form-container">
					<h1>Login</h1>

					<label for="email" onClick={btnClick}>
						<b>Email</b>
					</label>
					<input
						type="text"
						placeholder="Enter Email"
						name="email"
						required
					/>

					<label for="psw">
						<b>Password</b>
					</label>
					<input
						type="password"
						placeholder="Enter Password"
						name="psw"
						required
					/>

					<button type="submit" class="btn" onClick={props.addForm}>
						Login
					</button>
					<button
						type="button"
						class="btn cancel"
						onClick={props.cancelForm}
					>
						Close
					</button>
				</form>
			</div>
		</>
	)
}
// OrderEdit.PropTypes = {
//     props: PropTypes.object
// }

export default function ToolbarWorkList() {


	const [toolbarState, setToolbarState] = React.useState(
		'toolbarWorkListFolded'
	)

	const formDefaultProps = {
		display: 'none',
		addForm,
		cancelForm,
	}

	const [orderEditProps, setOrderEditProps] = React.useState(formDefaultProps)

	const ID_BTN_SETTING = 'ID_BTN_SETTING'
	const ID_BTN_DATE = 'ID_BTN_DATE'
	const ID_BTN_CROWN = 'ID_BTN_CROWN'
	const ID_BTN_CASE = 'ID_BTN_CASE'

    const defualtInnerText = {
        ID_BTN_SETTING: "CROWN",
        ID_BTN_DATE: "DATE",
        ID_BTN_CROWN: "SETTING",
    }

    // const innerText = {}
    // Object.assign(innerText, defualtInnerText)
    const [innerText, setInnerText] = React.useState(defualtInnerText)

	function onClickButton1(event) {
		console.dir(event.target)
		const targetId = event.target.id
		if (targetId === ID_BTN_SETTING) {
			setToolbarState('toolbarWorkListFolded')

            setInnerText(defualtInnerText)


            // Object.assign(innerText, defualtInnerText)
            console.log(innerText)
			const ID_BTN_DATE = 'ID_BTN_DATE'
		} else if (targetId === ID_BTN_DATE) {

            setInnerText( prev => {
                console.log("prevstatus", prev)
                Object.keys(prev).forEach( x => prev[x] = "")

                return prev
            })

            // setInnerText( prev => {
            //     console.log("prevstatus", prev)
            //     Object.keys(prev).forEach( x => prev[x] = "")

            //     return prev
            // })

			setToolbarState('toolbarWorkListUnFolded')
		}
		console.log('create-ref===>\n\n\n', orderRef)
		// console.log(orderRef)

		const nextState = orderEditProps.display === 'none' ? 'block' : 'none'

		setOrderEditProps({ ...orderEditProps, display: nextState })
	}

	function addForm(event) {
		event.preventDefault()
		console.log('addform')
		setOrderEditProps({ ...orderEditProps, display: 'none' })
	}

	function cancelForm(event) {
		console.log('cancel')
		setOrderEditProps({ ...orderEditProps, display: 'none' })
	}

	const orderRef = React.useRef(null)
	// let orderRef;''
	const imgSrc = '/images/crown@3x.png'
	const stylePrps = {
		objectFit: 'contain',
		// width: '100%',
		height: '100%',
        backgroundImage: "'./images/crown@3x.png'"
	}
	return (
		<>
			<div
				id="toolbarWorkList"
				className={toolbarState}
				onClickCapture={onClickButton1}
				style={stylePrps}
			>
				<div id={ID_BTN_SETTING} className="buttonSetting">
					{innerText.ID_BTN_SETTING}
				</div>

				<div id={ID_BTN_DATE} className="buttonDate">
					{innerText.ID_BTN_DATE}
                </div>

				<div id={ID_BTN_CROWN} className="buttonCrown">
					{innerText.ID_BTN_CROWN}
				</div>
				{/* <img src={imgSrc}/> */}
			</div>
			<OrderEdit props={orderEditProps} ref={orderRef} />
		</>
	)
}
