import React from 'react'
import './Login.css'

function LoginImage() {
	return (
		<>
			<div className="login-container">
				<h1 className="main_title">Full Denture Simulator</h1>
				<img src='./images/login/DIO_CI.png' className="login_logo" />
				<img src="./images/login/Login_BG.png" id="login_BG" />
			</div>
		</>
	)
}

function LoginForm({onLogin}) {
    const onHandleClickLogin = (e) => {
        var verified = true
        if( onLogin ){
            onLogin(verified)
        }
    }
	return (
		<>
			<div className="box_login">
				<form
					// action="./FullArchSim.html"
					acceptCharset="utf-8"
					id="userLogin"
					method="post"
				/>
				<div className="inp_text">
					<input
						type="text"
						id="loginId"
						name="loginId"
						placeholder="Username"
						autoComplete="off"
					/>
				</div>
				<div className="inp_text">
					<input
						type="password"
						id="loginPW"
						name="password"
						placeholder="Password"
						autoComplete="off"
					/>
				</div>
				<div className="checkbox">
					<input
						type="checkbox"
						id="checkbox"
						className="checkbox"
						name="checkbox"
					/>
					<label htmlFor="checkbox" className="lab_g">
						Remeber Me
					</label>
					<span className="txt_find">
						<a href="#">Forgot Password?</a>
					</span>
					<br />
				</div>

				<div id="Login">
					<button id="btn_login" className="btn_login" onClick={onHandleClickLogin}>
						LOGIN
					</button>
				</div>
			</div>


		</>
	)
}
export default function Login({onLogin}) {
	return (
		<>
			<div className="loginBody">
				<LoginImage />
				<LoginForm onLogin={onLogin} />
			</div>
		</>
	)
}
