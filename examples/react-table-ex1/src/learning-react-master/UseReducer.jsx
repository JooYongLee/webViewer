import React from 'react'

function myReducer(state, action){
    // console.warn(action, state)
    switch( action.type ){
        case "INCREMENT":
            return {value: state.value + 1}
        case "DECREMENT":
            return {value: state.value - 1}
        default:
            return state
    }
}

export default function UseReducer() {

    const [stateCount, dispatchCount] = React.useReducer(myReducer, { value: 0})
    return (
        <div>
            <p style={{fontSize:"20px"}}> counter 값은 : {stateCount.value}</p>
            
            <button onClick = {e => dispatchCount( { type: "INCREMENT"})}> UP </button>
            <button onClick = {e => dispatchCount( { type: "DECREMENT"})}> DOWN </button>
        </div>
    )
}
