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
import { WelcomeScreen } from "../view/welcomescreen";
import { Marketplace } from '../view/marketplace';
import { Navbar } from '../view/navbarview';
import { ContainerSelect } from '../view/containerchoice/containerview';
import { LoadingScreen } from '../view/loadingscreenview';
import { AddLiquids } from '../view/protocolconceptionview';
import { ProtocolDesign } from '../view/protocoldesignview';
import { Login } from '../view/login';
import { CreateAccount } from '../view/login';
import { MyAssets } from "../view/myassets";

const gv = require('../../const/global');
const gi = require('../../const/globalImages').gi;

let login = <Login/>;
let createAccount = <CreateAccount/>;

gi.loadImages();

/**
 * Main interface controller. The most top level controller of the interface.
 * Everything is pretty straightforward in this class so there won't be any comments.
 */
export class WebInterfaceController{
	constructor(){
		gv.mainAppController = this;
	}

	getLogin(){
		return login;
	}

	createAccount(){
		return createAccount;
	}

	hoverMisc(type, func){
		gv.mainApp.setState({hover:type, hoverFunc:func});
		setTimeout(function(){window.location="#warning";}, 100);
	}

	saveState(){
	    /*
        let css = 'background: #fff; color: #5a5a00';

        let haives = gv.haiveSelectorModel.getFullHaives();
        let formattedCode = [];

        for(let i = 0; i < haives.length; i++){
            let haive = haives[i][0];
            let id;

            if(haive.getType() == "DISPENSER"){
                id = "D";
            }else if(haive.getType() == "FREEZER"){
                id = "F";
            }else{
                id = "C";
            }

            if(i == 0){
                id += "0";
            }else{
                let dx = (haives[i][1] - haives[0][1]);
                let dy = (haives[i][2] - haives[0][2]);
                console.log(dx, dy);
                id += dx + "_" + dy;
            }

            formattedCode.push({
                id:id,
                name:haives[i][0].getName(),
                desc:haives[i][0].getDesc(),
                containers:haives[i][0].getJSONContainers()
            })
        }

	    console.log("%c%s", css, JSON.stringify(formattedCode, undefined, 2));

        gv.fetchJSONFile('json/read.json', function(data){
            console.log(data);
        });
        */

    }
}
