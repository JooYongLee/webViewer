import React from 'react'
import "./Loginform.css"
// https://www.w3schools.com/howto/howto_css_login_form.asp
export default function Loginform() {
    // onclick="document.getElementById('id01').style.display='none'"
    const onClick = (event) => {
        setFormVisible({
            display: 'none'
        })

    }
    const [formVisible, setFormVisible] = React.useState({
        display: 'none'
    })
    const onClickButton = e => {
        console.log("sdfdsf")
        setFormVisible({
            display: 'block'
        })
        // "document.getElementById('id01').style.display='block'"
    }

    const onSubmit = (event) => {
        event.preventDefault()
    }
	return (
		<>
			<h2>Modal Login Form</h2>

			<button
				onClick={onClickButton}
                style = {{width:"auto"}}
			>
				Login
			</button>

			<div id="id01" class="modal" style={formVisible}>
				<form
					class="modal-content animate"
					action="/action_page.php"
					method="post"
				>
					<div class="imgcontainer">
						<span
							onclick="document.getElementById('id01').style.display='none'"
							class="close"
							title="Close Modal"
						>
							&times;
						</span>
						<img
							src="img_avatar2.png"
							alt="Avatar"
							class="avatar"
						/>
					</div>

					<div class="container">
						<label for="uname">
							<b>Username</b>
						</label>
						<input
							type="text"
							placeholder="Enter Username"
							name="uname"
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

						<button type="submit" onSubmit={onSubmit} onClick={onSubmit}>Login</button>
						<label>
							<input
								type="checkbox"
								checked="checked"
								name="remember"
							/>{' '}
							Remember me
						</label>
					</div>

					<div class="container" style={{backgroundColor:"#f1f1f1"}}>
						<button
							type="button"
                            onClick = {onClick}
							class="cancelbtn"
						>
							Cancel
						</button>
						<span class="psw">
							Forgot <a href="#">password?</a>
						</span>
					</div>
				</form>
			</div>
		</>
	)
}
