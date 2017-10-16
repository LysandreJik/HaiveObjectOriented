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
const gi = require('../../const/globalImages').gi;

const NavbarModel = require('../model/navbarmodel').NavbarModel;
const NavbarController = require('../controller/navbarcontroller').NavbarController;

const HaiveStoreModel = require('../model/dashboard/haivestoremodel').HaiveStoreModel;
const HaiveStoreController = require('../controller/dashboard/haivestorecontroller').HaiveStoreController;

const HaiveTilesModel = require('../model/dashboard/haivetilesmodel').HaiveTilesModel;
const HaiveTilesController = require('../controller/dashboard/haivetilescontroller').HaiveTilesController;

const ContainerSelectModel = require('../model/containerchoice/containermodel').ContainerSelectModel;
const ContainerSelectController = require('../controller/containerchoice/containercontroller').ContainerSelectController;

const ProtocolConceptionModel = require('../model/protocolconceptionmodel').ProtocolConceptionModel;
const ProtocolConceptionController = require('../controller/protocolconceptioncontroller').ProtocolConceptionController;

const ProtocolDesignModel = require('../model/protocoldesignmodel').ProtocolDesignModel;
const ProtocolDesignController = require('../controller/protocoldesigncontroller').ProtocolDesignController;

const LoginController = require('../controller/logincontroller').LoginController;

import { Marketplace } from '../view/marketplace';
import { HaiveStore } from '../view/dashboard/haivestoreview';
import { HaiveTiles } from '../view/dashboard/haivetilesview';
import { Navbar } from '../view/navbarview';
import { ContainerSelect } from '../view/containerchoice/containerview';
import { LoadingScreen } from '../view/loadingscreenview';
import { AddLiquids } from '../view/protocolconceptionview';
import { ProtocolDesign } from '../view/protocoldesignview';
import { Login } from '../view/login';
import { CreateAccount } from '../view/login';

let marketplace = <Marketplace/>;


let containerSelectController = new ContainerSelectController();
let containerSelectModel = new ContainerSelectModel({controller:containerSelectController});
let containerSelect = <ContainerSelect model={containerSelectModel}/>;

let navbarController = new NavbarController();
let navbarModel = new NavbarModel({controller:navbarController});
let navbar = <aside className="bg-black aside-sm nav-vertical only-icon" id="nav"><Navbar model={navbarModel}/></aside>;

let haiveTilesController = new HaiveTilesController();
let haiveTilesModel = new HaiveTilesModel({controller:haiveTilesController});
let haiveStoreController = new HaiveStoreController({droppedTileFromStore:haiveTilesController.droppedTileFromStore});
let haiveStoreModel = new HaiveStoreModel({controller:haiveStoreController});
let dashboard = <section id="content"><HaiveStore model={haiveStoreModel}/><HaiveTiles model={haiveTilesModel}/></section>;

let protocolConceptionController = new ProtocolConceptionController();
let protocolConceptionModel = new ProtocolConceptionModel({controller:protocolConceptionController});
let protocolconception = <AddLiquids/>;

let protocolDesignController = new ProtocolDesignController();
let protocolDesignModel = new ProtocolDesignModel({controller:protocolDesignController});
let protocoldesign = <ProtocolDesign/>;

let loadingscreen = <LoadingScreen/>;

let loginController = new LoginController();
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

	getFocusedPage(){
		if(gv.imageLoad == 1){
			switch(navbarModel.getActiveSection().getTitle()){
				case "Dashboard":
					return dashboard;
					break;
				case "Container Select":
					return containerSelect;
					break;
				case "Marketplace":
					return marketplace;
					break;
				case "Protocol Conception":
					return protocolconception;
					break;
				case "Protocol Design":
					return protocoldesign;
					break;
			}
		}else{
			return loadingscreen;
		}

	}

	getLogin(){
		return login;
	}

	createAccount(){
		return createAccount;
	}

	getNavbarModel(){
		return navbarModel;
	}

	getNavbarController(){
		return navbarController;
	}

	getNavbarView(){
		return navbar;
	}

	getHaiveStoreModel(){
		return haiveStoreModel;
	}

	getHaiveStoreController(){
		return haiveStoreController;
	}

	getHaiveStoreView(){
		return dashboard;
	}

	refreshTiles(){
		// console.log("Refresh tiles function called");
		dashboard = <section id="content"><HaiveStore model={haiveStoreModel}/><HaiveTiles model={haiveTilesModel}/></section>;
	}

	refreshStore(){
		// console.log("Refresh store function called");
		dashboard = <section id="content"><HaiveStore model={haiveStoreModel}/><HaiveTiles model={haiveTilesModel}/></section>;
	}

	hoverMisc(type, func){
		gv.mainApp.setState({hover:type, hoverFunc:func});
		setTimeout(function(){window.location="#warning";}, 100);
	}
}
