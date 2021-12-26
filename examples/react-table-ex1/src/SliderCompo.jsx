import React, { Component } from 'react'
// import "./SliderCompo.css"
const MySlider = React.forwardRef( (props, ref) => {
	const [val, setVal] = React.useState(50)
	const [inputVal, setInputVal] = React.useState(props.inputVal)
    const [drag, setDrag] = React.useState(false)
    const onMouseDown = (e)=>{
        setDrag(true)
    }
    const onMouseUp = (e)=>{
        setDrag(false)
    }
	function onChange(event, v) {

		if( drag ){
			
			setVal(event.target.value)
			if(props.onChange) props.onChange(event)
			console.log('[onChange]', val, v)
		}
	}
	console.log('[MySlider]', props)
	React.useEffect(() => {
		console.log('[UseEffect]',  val, ref.current.value, props)
		// !drag && setVal(inputVal)
        !drag && setVal(props.inValue)
        // setInputVal(props.inValue)
		// setVal(inVal)
	}, )

    const onClick = (e) =>{
        // val++
        e.target.value = val + 1
        if(props.onChange) props.onChange(e)
        
        setVal( val + 1 )
    }
	return (
		<div>
			<input ref={ref}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
				type="range"
				defaultValue={val}
				value={val}
				onChange={onChange}
			/>
			<label onClick={onClick}>{val}</label>
			<input type="checkbox"/>
			
		</div>
	)
})

// const FancyButton = React.forwardRef((props, ref) => (
// 	<button ref={ref} className="FancyButton">
// 		{props.children}
// 	</button>
// ))

export function ToolbarController({ onClick }) {
	const style = {
		width: "100px",
		height: "50px",
		fontSize: "20px",
	}
	return (
		<>
			<button id="plus" onClick={onClick} style={style}>
				+
			</button>
            <button id="minus" onClick={onClick} style={style}>
				-
			</button>
		</>
	)
}

export default class TestComp extends Component {
	constructor(prop) {
		super(prop)

		this.state = {
			value: 50,
		}
		this.onClick = this.onClick.bind(this)
		this.onChange = this.onChange.bind(this)
		// this.onClick = this.bind(this)
        this.ref = React.createRef()
	}

	componentDidMount() {
		// this.setState({ count: this.state.count + 1 });
	}

	onClick(event) {
        const delta = event.target.id === "plus" ? 1 : -1

        // this.ref.current.value =   parseInt(this.ref.current.value)  + delta
        // this.ref.current.setVale(10)
        console.log("[onClick]", this.ref.current)
		// console.log(event.target.id, this.state.value, this.ref.current, this.state.value + 1)
		this.setState({
			value: parseInt(this.state.value) + delta,
		})
        // this.ref.current.value =  this.ref.current.value  + 1
	}

    onChange(event){
        this.state.value = event.target.value
        this.setState({
			value: parseInt(this.state.value) ,
		})
        console.log("[onChange]", event.target.value, this.state.value)


    }

	render() {
		return (
			<>
				<div>
					<MySlider inValue={this.state.value} ref={this.ref} onChange={this.onChange}/>
					<ToolbarController onClick={this.onClick} />
				</div>
			</>
		)
	}
}
