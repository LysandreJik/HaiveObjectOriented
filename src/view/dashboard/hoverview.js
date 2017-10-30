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

	componentDidMount(){
	    console.log("mountes maggle");
    }

	render(){
	    if(gv.haiveSelectorModel.getTileHaive(this.props.keyId.split('_')[0], this.props.keyId.split('_')[1]) == null){
	        return <div></div>
        }

        const parent = this;
        return(
            <a href="#_" className="lightbox" id={this.props.keyId}>
                {/* This is the image displayed when a Hexagon is clicked on, from the dashboard*/}
                <HexImageHover/>
                <div id={"hovercontent"+this.props.keyId} className="lightboxdiv animated fadeIn">

                    <h1>{gv.haiveSelectorModel.getTileHaive(this.props.keyId.split('_')[0], this.props.keyId.split('_')[1]).getType()+" HAIVE"}</h1>
                    <h4>{gv.haiveSelectorModel.getTileHaive(this.props.keyId.split('_')[0], this.props.keyId.split('_')[1]).getName()}</h4>
                    <p>{gv.haiveSelectorModel.getTileHaive(this.props.keyId.split('_')[0], this.props.keyId.split('_')[1]).getDesc()}</p>

                    <button className="btnghost" onClick={function(){gv.myAssets.setSelected(2);gv.currentlySelectedHaive=gv.haiveSelectorModel.getTileHaive(parent.props.keyId.split('_')[0], parent.props.keyId.split('_')[1])}}>START</button>{"\u00a0\u00a0\u00a0"}
                    <button className="btnghost" onClick={function(){gv.haiveSelectorView.refresh("hover", "none");gv.haiveSelectorModel.addStoreHaive(gv.haiveSelectorModel.getTileHaive(parent.props.keyId.split('_')[0], parent.props.keyId.split('_')[1]));gv.haiveSelectorModel.removeTileHaive(parent.props.keyId.split('_')[0], parent.props.keyId.split('_')[1])}}>Remove</button>{"\u00a0\u00a0\u00a0"}
                    <button className="btnghost" onClick={() => gv.haiveSelectorController.hoverMisc("setdescofhaive", this.props.keyId)}>+</button>
                </div>
            </a>
        );

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
						<span id="liquidtype_pipettetipsdialogspan">Haive's name</span><input id="haivename_dialog" type="text" name="field1" required="true" defaultValue={gv.haiveSelectorModel.getTileHaive(this.props.id.split("_")[0], this.props.id.split("_")[1]).getName()}/>
					</label>
					<label htmlFor="field1" style={{"margin":"20px"}}>
						<span id="liquidtype_pipettetipsdialogspan">Haive's description</span><input id="haivedesc_dialog" type="text" name="field1" required="true" defaultValue={gv.haiveSelectorModel.getTileHaive(this.props.id.split("_")[0], this.props.id.split("_")[1]).getDesc()}/>
					</label>
					<button onClick={
							function(){
                                gv.haiveSelectorModel.getTileHaive(parent.props.id.split("_")[0], parent.props.id.split("_")[1]).setName($('#haivename_dialog').val());
                                gv.haiveSelectorModel.getTileHaive(parent.props.id.split("_")[0], parent.props.id.split("_")[1]).setDesc($('#haivedesc_dialog').val());
								window.location="#_";
								gv.haiveSelectorView.refresh("hovermisc", "");
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
