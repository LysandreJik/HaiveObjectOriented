/*
__/\\\________/\\\_____/\\\\\\\\\_____/\\\\\\\\\\\__/\\\________/\\\__/\\\\\\\\\\\\\\\_
 _\/\\\_______\/\\\___/\\\\\\\\\\\\\__\/////\\\///__\/\\\_______\/\\\_\/\\\///////////__
  _\/\\\_______\/\\\__/\\\/////////\\\_____\/\\\_____\//\\\______/\\\__\/\\\_____________
   _\/\\\\\\\\\\\\\\\_\/\\\_______\/\\\_____\/\\\______\//\\\____/\\\___\/\\\\\\\\\\\_____
    _\/\\\/////////\\\_\/\\\\\\\\\\\\\\\_____\/\\\_______\//\\\__/\\\____\/\\\///////______
     _\/\\\_______\/\\\_\/\\\/////////\\\_____\/\\\________\//\\\/\\\_____\/\\\_____________
      _\/\\\_______\/\\\_\/\\\_______\/\\\_____\/\\\_________\//\\\\\______\/\\\_____________
       _\/\\\_______\/\\\_\/\\\_______\/\\\__/\\\\\\\\\\\______\//\\\_______\/\\\\\\\\\\\\\\\_
        _\///________\///__\///________\///__\///////////________\///________\///////////////__

	HAIVE web application - GUI Version 0.0.2 (OO)
	For Molcure product
	Base sketch by Lisan
	http://molcure.com
	Author: Lysandre Debut
*/

import React from 'react';

const gv = require('../../const/global');

/**
 * Creating an account Component
 */
export class CreateAccount extends React.Component{
	render(){
		return(
			<div className="logincontentswrapper animated fadeIn">
				<div className="createaccountcontents">
					<span className="colorbluesmall">Username</span><br></br>
					<input id="user" type="text" name="username"></input><br></br>
					<span className="colorbluesmall">Email address</span><br></br>
					<input id="user" type="text" name="email"></input><br></br>
					<span className="colorbluesmall">PASSWORD</span><br></br>
					<input id="pass" type="password" name="password"></input>
					<span className="colorbluesmall">CONFIRM PASSWORD</span><br></br>
					<input id="pass" type="password" name="passwordconfirm"></input>

					<br></br>
					<br></br>

					<button className="btnghostlighter" onClick={gv.loginController.goToLogin}>create account</button>
					{"\u00a0\u00a0\u00a0"}
					<button className="btnghostlighter" onClick={gv.loginController.goToLogin}>cancel</button>
				</div>
			</div>
		);
	}
}

/**
 * Login Component
 */
export class Login extends React.Component{
	render(){
		return(
			<div className="logincontentswrapper animated fadeIn">
				<div className="logincontents">
					<span className="colorblue">EMAIL ADDRESS</span><br></br>
					<input id="user" type="text" name="username"></input><br></br>
					<span className="colorblue">PASSWORD</span><br></br>
					<input id="pass" type="password" name="password"></input>

					<br></br>
					<br></br>

					<button className="btnghostlighter" onClick={gv.loginController.login}>login</button>
					{"\u00a0\u00a0\u00a0"}
					<button className="btnghostlighter" onClick={gv.loginController.createAccount}>create account</button>
				</div>
			</div>
		);
	}
}
