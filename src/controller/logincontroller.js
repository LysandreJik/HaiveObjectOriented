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

const gv = require('../../const/global');

/**
 * Controller class of the login
 */
export class LoginController{
	constructor(){
		gv.loginController = this;
		this.login = this.login.bind(this);
	}

    /**
     * Verifies the info of the user and logs him in if it is correct
     */
	login(){
		console.log("Logging in");
		let user = $('#user').val();
		let pass = $('#pass').val();

		if(this.verifyInfo(user, pass)){
			gv.loginDone = true;
			gv.creatingAccount = false;
			gv.mainApp.refresh();
		}
	}

    /**
     * Goes back to login if the user was creating an account.
     */
	goToLogin(){
		gv.loginDone = false;
		gv.creatingAccount = false;
		gv.mainApp.refresh();
	}

    /**
     * Verify the user info (Right now just returns true.
     * @param user Username
     * @param pass Password
     * @returns {boolean} returns true if the user has entered the correct information, false if he hasn't
     */
	verifyInfo(user, pass){
		return true;
	}

    /**
     * Goes to the create an account page.
     */
	createAccount(){
		console.log("Creating account");
		gv.creatingAccount = true;
		console.log(gv.creatingAccount);
		gv.mainApp.refresh();
	}
}
