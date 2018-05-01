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
import {connect} from "react-redux"
import {Warning} from "./warningview";
import {WelcomeScreen} from "./welcomescreen";
import {MyAssets} from "./myassets";
import {Marketplace} from "./marketplace";
import {Navbar} from "./navbarview";

const WebInterfaceController = require('../controller/webinterfacecontroller').WebInterfaceController;
const gv = require('../../const/global');


var webInterfaceController = new WebInterfaceController();

/**
 * The Top level view Component. It contains everything about the App.
 */
@connect((store) => {
    return{
        focusedPages : store.focusedPages
	}
})
export class App extends React.Component{
	constructor(props){
		super(props);
		this.updateApp = this.updateApp.bind(this);
		this.state = {hover:"none", hoverFunc:null};
        webInterfaceController.initAvailableContainers();
		gv.mainApp = this;
	}

	refresh(state, value){
		if(state == undefined){
			this.setState({refresh:true});
		}else{
			this.setState({state:value});
		}

        console.log("Mounted", state, value)
	}

	updateApp(state, value){
		// console.log("Updated app with state "+state+":"+value);
		this.setState({state:value});
	}

	render(){

		if(this.props.focusedPages.page === gv.focusablePages.DASHBOARD){
            return(
                <section className="hbox stretch bg">
                    <aside className="bg-black aside-sm nav-vertical only-icon" id="nav">
						<Navbar/>
					</aside>
                    <section id="content" style={{"width":"100%"}}><WelcomeScreen/></section>
                    {this.state.hover != 'none' ? <Warning agree={this.state.hoverFunc} type={this.state.hover}/> : ""}
                </section>
            );
		}else if(this.props.focusedPages.page === gv.focusablePages.HAIVE_SELECT){
            return(
                <section className="hbox stretch bg">
                    <aside className="bg-black aside-sm nav-vertical only-icon" id="nav">
                        <Navbar/>
                    </aside>
                    <section id="content" style={{"width":"100%"}}><MyAssets/></section>
                    {this.state.hover != 'none' ? <Warning agree={this.state.hoverFunc} type={this.state.hover}/> : ""}
                </section>
            );
        }else if(this.props.focusedPages.page === gv.focusablePages.ASSET_STORE){
            return(
                <section className="hbox stretch bg">
                    <aside className="bg-black aside-sm nav-vertical only-icon" id="nav">
                        <Navbar/>
                    </aside>
                    <section id="content" style={{"width":"100%"}}><Marketplace/></section>
                    {this.state.hover != 'none' ? <Warning agree={this.state.hoverFunc} type={this.state.hover}/> : ""}
                </section>
            );
        }

		if(gv.loginDone){

		}else{
			console.log(gv.creatingAccount);
			if(gv.creatingAccount){
				return(
					<div>
						{webInterfaceController.createAccount()}
					</div>
				);
			}else{
				return(
					<div>
						{webInterfaceController.getLogin()}
					</div>
				);
			}
		}
	}
}
