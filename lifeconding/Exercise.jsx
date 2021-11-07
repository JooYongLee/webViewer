
import "./Exercise.css"
const fontStyle = {
    pixel:{
        "font=size":"20px"
    },
    rem:{
        "font-size":"1rem"

    }
}

function FontSize(){
    return (
        <>
        <div className="pixelfont">PX</div>
        <div className="remfont">REM</div>
        </>
    )
}
const culcolor = {
    color:"red"
}
function Ingeritance(){
    return(
        <>
            <ul >
                <li>html</li>
                <li>css</li>
                <li>javascript</li>
            </ul>
        </>
    )
}

function InlineBlock(){
    return (
        <>
            <h1 style={{display:"inline"}}>Hello world</h1>
            helo from <a href="https://www.naver.com">lee joo yong </a>
        </>
    )
}

function BlockComponent(){
    return (
        <>
            <p>show me the money, food for thought, three is no cow level</p>
            <p>show me the money, food for thought, three is no cow level</p>
            안녕하세요. <a href="https://www.naver.com"> lee joo yong</a> 입니다
        </>
    )
}

const boxsize = {
    main : {
        width: "100vw",
        height: "100vh",
        display: "flex",
        // flexDirection: "row-reverse"
        // flexDirection: "column"
        // flexDirection: "column-reverse"
    },
    box1: {
        width: "30vw",
        height: "10vh",
        border: "1px solid red",
        display: "flex",
        backgroundColor: "tomato",
        margin:"5px",
        alignItems: "center",
        // justifyContent: "space-around",
        // margin: "0 0 0 0",
        // flexDirection: "row"
        // display: "flex-direction:row"
    }
}

function MarginDuplicate(){
    return (
        <>
            <div style={boxsize.main}>
                <div style={boxsize.box1}>1</div>
                <div style={boxsize.box1}>2</div>
                <div style={boxsize.box1}>3</div>
                <div style={boxsize.box1}>4</div>
                <div style={boxsize.box1}>5</div>

            </div>
        </>
    )
}



export default function Exercise(){
    return(
        <>
            {/* <FontSize/> */}
            {/* <Ingeritance/> */}
            {/* <InlineBlock/> */}
            {/* <BlockComponent/> */}
            <MarginDuplicate/>

        </>
    )
}