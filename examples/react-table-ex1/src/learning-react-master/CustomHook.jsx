import React from 'react'

function reducer(state, action){
    console.log("[reducer]", action)
    return {
        ...state,
        [action.name]: action.value
    }
}

function useInputs(initialForm){
    const [state, dispath] = React.useReducer(reducer, initialForm)
    const onChange = e => {
        console.log("onChange", e.target)
        dispath(e.target)
    }
    return [state, onChange]
}

export default function CustomHook() {

    const [state, onChange] = useInputs({
        name: "",
        nickname: ""
    })

    const {name, nickname} = state
    return (
        <div>
            <div>
                <input name="name" value={name} onChange={onChange} />
                <input name="nickname" value={nickname} onChange={onChange} />
            </div>
            <div>
                <div>
                    <b>이름:</b>{name}
                </div>
                <div>
                    <b>닉네임:</b>{nickname}
                </div>
            </div>
            
        </div>
    )
}
