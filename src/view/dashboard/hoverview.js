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
	    if(gv.haiveSelectorModel.getTileHaive(this.props.keyId.split('_')[0], this.props.keyId.split('_')[1]) == null){
	        return <div></div>
        }else{
	    	var haive = gv.haiveSelectorModel.getTileHaive(this.props.keyId.split('_')[0], this.props.keyId.split('_')[1]);

	    	try{
                haive = gv.timeline.getTemporaryState().getHaiveFromID(haive.getID());
			}catch(e){
	    		console.error("Error in HexagonHoverTypes !");
                console.log(this.props.keyId.split('_')[0], this.props.keyId.split('_')[1]);
                console.log(JSON.stringify(gv.timeline.getTemporaryState().getHaives()), null, 2);
			}

		}

        const parent = this;
        return(
            <a href="#_" className="lightbox" id={this.props.keyId}>
                {/* This is the image displayed when a Hexagon is clicked on, from the dashboard*/}
                <HexImageHover/>
                <div id={"hovercontent"+this.props.keyId} className="lightboxdiv animated fadeIn">

                    <h1>{haive.getType()+" HAIVE"}</h1>
                    <h4>{haive.getName()}</h4>
                    <p>{haive.getDesc()}</p>

                    <button className="btnghost" onClick={
                        function(){
                            gv.myAssets.setSelected(2);
                            gv.currentlySelectedHaive = haive;
                            gv.protocolDesignController.timeline = gv.timeline;
                            if(gv.currentlySelectedHaive.getContainers().length > 0){
                                gv.myAssets.setState({button:[false, false, false]});
                            }else{
                                gv.myAssets.setState({button:[false, false, true]});
                            }
                        }
                    }>START</button>{"\u00a0\u00a0\u00a0"}
                    <button className="btnghost" onClick={
                    	function(){
                    		let desc = "Removed " + gv.haiveSelectorModel.getTileHaive(parent.props.keyId.split('_')[0], parent.props.keyId.split('_')[1]).getName() + " from dashboard to the store.";
                    		gv.haiveSelectorView.refresh("hover", "none");
                    		gv.haiveSelectorModel.addStoreHaive(haive);
                    		gv.haiveSelectorModel.removeTileHaive(parent.props.keyId.split('_')[0], parent.props.keyId.split('_')[1]);
                            gv.haiveSelectorModel.updateState(desc);
                    	}

                    }>Remove</button>{"\u00a0\u00a0\u00a0"}
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
		console.log(this.props.id);
		return(
			<div className="lightbox" id={"desc"}>
				<div id="warning_div" className="pipettetipsdialog warning">
					<span>CHANGE DETAILS</span>
					<label htmlFor="field1" style={{"margin":"20px"}}>
						<span id="liquidtype_pipettetipsdialogspan">Haive's name</span>
                        <input id="haivename_dialog" type="text" name="field1" required="true" defaultValue={gv.haiveSelectorModel.getDashHaive(parent.props.id.split("_")[0], parent.props.id.split("_")[1]).getName()}/>
					</label>
					<label htmlFor="field1" style={{"margin":"20px"}}>
						<span id="liquidtype_pipettetipsdialogspan">Haive's description</span>
                        <input id="haivedesc_dialog" type="text" name="field1" required="true" defaultValue={gv.haiveSelectorModel.getDashHaive(parent.props.id.split("_")[0], parent.props.id.split("_")[1]).getDesc()}/>
					</label>
					<button onClick={
							function(){
								let haive = gv.haiveSelectorModel.getDashHaive(parent.props.id.split("_")[0], parent.props.id.split("_")[1]);
                                let state = gv.timeline.getTemporaryState();
                                let stateHaive = state.getHaiveFromID(haive.getID());
                                stateHaive.setName($('#haivename_dialog').val());
                                stateHaive.setDesc($('#haivedesc_dialog').val());
                                gv.timeline.updateState(state, "Changed Haive description and/or name to : "+$('#haivename_dialog').val()+", "+$('#haivedesc_dialog').val());
								window.location="#_";
								gv.haiveSelectorView.refresh("hovermisc", "");
							}
						}>Ok</button>
					<button onClick={
					    function(){
					        window.location="#_";
					        gv.haiveSelectorView.refresh("hovermisc", "");
					    }
					}>Cancel</button>
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
					<span className="animated fadeOut" style={{"fontSize":"5vw", "color":"#95CAFF", "fontFamily":"Uni"}}>HAIVE</span>
				</div>
			</div>
		);
	}
}
