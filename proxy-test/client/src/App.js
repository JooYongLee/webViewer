import logo from './logo.svg';
import './App.css';
// import * as proxy from "./setupProxy"

import io from 'socket.io-client'
// import App from '../../src/App';
import {bigstr} from "./data.js"
// const socket = io.connect("http://localhost:3005");
// const socket = io("http://localhost:3005");
// console.log(`http://${window.location.hostname}:3005`)
const socket = io.connect(`http://${window.location.hostname}:3000`);
window.socket = socket
socket.on("message", msg => {
  console.log(msg)
  console.log(msg.data.length)
  socket.emit("receive", {msg:bigstr.data.substr(0, 10000)})
}
)

function App() {
  function onClick(){
    console.log("pick")
    socket.emit("message", {data:"test"})
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={onClick}> to send </button>>
      </header>
    </div>
  );
}

export default App;
