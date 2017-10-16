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
import { HaiveIcon } from './haiveicon';
import { HexagonHoverTypes } from './hoverview';

let haivestoremodel;
let haivestoreController;

const gv = require('../../../const/global');
const gi = require('../../../const/globalImages').gi;

/**
 * The "HAIVE STORE" from which you can drop Haives you have bought
 */
export class HaiveStore extends React.Component{
	constructor(props){
		super(props);
		haivestoremodel = this.props.model;
		this.state = {hover:"none"};
		haivestoreController = haivestoremodel.getController();
		gv.haiveStoreView = this;
	}

	refresh(state, value){
		if(state == undefined){
			this.setState({refresh:true});
		}else{
			this.setState({state:value});
		}
	}

	render(){
		return(
			<div id="haivestore" className="haivestore">
				<h1 className="animated fadeInLeft colorblue">{"\u00a0\u00a0\u00a0"}HAIVE HIVE - CREATE YOUR FUTURE</h1>
				<ul id="hexLine">
					{haivestoremodel.getHaiveStore().map(function(hexagon, index){
						return <SmallHexagon id={"tilestore"+index} key={index} title={hexagon.getName()} desc={hexagon.getDesc()} type={hexagon.getType()} keyId={index} func={"TODO"} resize={"TODO"} dropped={"TODO"}/>
					})}
					<SmallHexagon id="buy" title="BUY HAIVES HERE" desc="" type="openslot"/>
					{this.state.hover != "none" ? <HexagonHoverTypes small={true} keyId={this.state.hover}/> : ""}
				</ul>
			</div>
		);
	}
}

/**
 * The small hexagon class. Those components belong in the Haive store.
 */
class SmallHexagon extends React.Component{
	componentDidMount(){
		haivestoreController.addDraggable(this);
	}

	componentDidUpdate(){
		haivestoreController.addDraggable(this);
	}

	render(){
		// console.log(this.props.id+" "+this.props.type);
		if(this.props.type != "openslot"){
			// console.log("draggable");
			return(
				<li className="hexsmall" id={"draggable"+this.props.id}>
				  <div className={"animated fadeIn hexsmallIn"}>
					<a id={this.props.id} className="hexLinkSmall" href={"#hs"+this.props.keyId} onClick={() => haivestoreController.displayHover(this.props.id)}>
					  <HaiveIcon typeId={this.props.type} small="true"/>
					  <h1>{this.props.title}</h1>
					  <p>{this.props.desc}</p>
					</a>
				  </div>
				</li>
			);
		}else if (this.props.type == "openslot") {
			// console.log("not draggable");
			return(
				<li className="hexsmall">
				  <div className={"animated fadeIn hexsmallIn"} onClick={() => gv.navbarModel.setActiveSection("Marketplace")}>
					<a id={this.props.id} className="hexLink" draggable="false" onClick = {this.props.buy} href="#img1">
					  <img src={gi.getImage('EMPTY_HAIVE')} alt="" />
					  <h1>Add a new Haive tower !</h1>
					  <p>Get more</p>
					</a>
				  </div>
				</li>
			);
		}else{
			return(
				<li className="hexsmall">
				  <div className={"animated fadeIn hexsmallIn"}>
					  <br/><br/>EMPTY
				  </div>
				</li>
			);
		}
	}
}
