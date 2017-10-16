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

const gv = require('../../../const/global');
const gi = require('../../../const/globalImages').gi;

/**
 * The Hoverview class is a group of multiple different classes for the "Hover" possibilities of the dashboard.
 * Everytime there is a lightbox on the dashboard, it passes by this exact class.
 *
 * The HexagonHoverTypes allows the user to Start the protocol conception, remove a haive or buy a new one.
 */
export class HexagonHoverTypes extends React.Component{
	constructor(props){
		super(props);
		this.state = {desc:false};
	}
	render(){
		if(this.props.small == true){
			return(
				<a href="#_" className="lightbox" id={"hs"+this.props.keyId}>
					{/* This is the image displayed when a Hexagon is clicked on, from the dashboard*/}
					<HexImageHover/>
					<div id={"hovercontent_small"+this.props.keyId} className="lightboxdiv animated fadeIn">
						<h1>{gv.haiveStoreModel.getHaive(this.props.keyId).getName()+" HAIVE"}</h1>
						<button className="btnghost" onClick={() => gv.navbarModel.setActiveSection("Marketplace")}>Buy</button>
					</div>
				</a>
			);
		}else{
            const parent = this;
            return(
				<a href="#_" className="lightbox" id={"h"+this.props.keyId}>
					{/* This is the image displayed when a Hexagon is clicked on, from the dashboard*/}
					<HexImageHover/>
					<div id={"hovercontent"+this.props.keyId} className="lightboxdiv animated fadeIn">

						<h1>{gv.haiveTilesModel.getHaive(this.props.keyId).getType()+" HAIVE"}</h1>
						<h4>{gv.haiveTilesModel.getHaive(this.props.keyId).getName()}</h4>
						<p>{gv.haiveTilesModel.getHaive(this.props.keyId).getDesc()}</p>

						<button className="btnghost" onClick={function(){gv.navbarModel.setActiveSection('Container Select');gv.currentlySelectedHaiveID=gv.haiveTilesModel.getHaive(parent.props.keyId).getRefID();gv.currentlySelectedHaive=gv.haiveTilesModel.getHaiveByRefID(gv.currentlySelectedHaiveID)}}>START</button>{"\u00a0\u00a0\u00a0"}
						<button className="btnghost" onClick={() => gv.haiveTilesModel.removeHaive(this.props.keyId)}>Remove</button>{"\u00a0\u00a0\u00a0"}
						<button className="btnghost" onClick={() => gv.haiveTilesController.hoverMisc("setdescofhaive", this.props.keyId)}>+</button>
					</div>
				</a>
			);
		}
	}
}


class HexImageHover extends React.Component{
	render(){
		return(<img src={gi.getImage('HEXAGON_LARGE')} id="hexagonhover"/>);
	}
}

/**
 * The Hoverview class is a group of multiple different classes for the "Hover" possibilities of the dashboard.
 * Everytime there is a lightbox on the dashboard, it passes by this exact class.
 *
 * The HaiveDesc class allows the user to change the name and description of the Haive he clicked on.
 */
export class HaiveDesc extends React.Component{
	render(){
		const parent = this;
		return(
			<div className="lightbox" id={"desc"}>
				<div id="warning_div" className="pipettetipsdialog warning">
					<span>CHANGE DETAILS</span>
					<label htmlFor="field1" style={{"margin":"20px"}}>
						<span id="liquidtype_pipettetipsdialogspan">Haive's name</span><input id="haivename_dialog" type="text" name="field1" required="true" defaultValue={gv.haiveTilesModel.getHaiveTiles()[this.props.id].getName()}/>
					</label>
					<label htmlFor="field1" style={{"margin":"20px"}}>
						<span id="liquidtype_pipettetipsdialogspan">Haive's description</span><input id="haivedesc_dialog" type="text" name="field1" required="true" defaultValue={gv.haiveTilesModel.getHaiveTiles()[this.props.id].getDesc()}/>
					</label>
					<button onClick={
							function(){
								gv.haiveTilesModel.getHaiveTiles()[parent.props.id].setName($('#haivename_dialog').val());
								gv.haiveTilesModel.getHaiveTiles()[parent.props.id].setDesc($('#haivedesc_dialog').val());
								window.location="#_";
								gv.haiveTilesView.refresh();
							}
						}>Ok</button>
					<button onClick={function(){window.location="#_"}}>Cancel</button>
				</div>
			</div>
		);
	}
}

/**
 * The Hoverview class is a group of multiple different classes for the "Hover" possibilities of the dashboard.
 * Everytime there is a lightbox on the dashboard, it passes by this exact class.
 *
 * The Welcome screen allows for the "HAIVE" blue flashing text at the beginning. For unknown reasons, the drag and drop utility does NOT WORK unless a welcome screen is shown.
 */
export class Welcome extends React.Component{
	componentDidMount(){
		setTimeout(function(){window.location="#_"},1000);
	}

	render(){
		return(
			<div className="lightbox animated setbackgroundtotransparent welcome" id={"welcome"}>
				<div id="warning_div" className="warning animated">
					<span className="animated fadeOut" style={{"fontSize":"5vw", "color":"#2BB8DB", "fontFamily":"Uni"}}>HAIVE</span>
				</div>
			</div>
		);
	}
}
