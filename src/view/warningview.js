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

import React from  'react';
const gv = require('../../const/global');

/**
 * Werning view Component. Displays Warning messages.
 */
export class Warning extends React.Component{
	render(){
		var parent = this;
		if(this.props.type == "warninglackofchipcontainers"){
			return(
				<div className="lightbox" id={"warning"}>
					<div id="warning_div" className="pipettetipsdialog warning">
						<span>⚠ WARNING ⚠</span>
						<h5>No chip containers added. Proceed anyway ?</h5>
						<button onClick={function(){parent.props.agree();gv.mainApp.setState({hover:"none"});}}>Yes</button>
						<button onClick={function(){window.location="#_";gv.mainApp.setState({hover:"none"});}}>No</button>
					</div>
				</div>
			);
		}else if(this.props.type == "warninglackofliquidcontainers"){
			return(
				<div className="lightbox" id={"warning"}>
					<div id="warning_div" className="pipettetipsdialog warning">
						<span>⚠ WARNING ⚠</span>
						<h5>No liquid containers added. Proceed anyway ?</h5>
						<button onClick={function(){parent.props.agree();gv.mainApp.setState({hover:"none"});}}>Yes</button>
						<button onClick={function(){window.location="#_";gv.mainApp.setState({hover:"none"});}}>No</button>
					</div>
				</div>
			);
		}else if(this.props.type == "warningCreatingNewTimeline"){
			return(
				<div className="lightbox" id={"warning"}>
					<div id="warning_div" className="pipettetipsdialog warning">
						<span>⚠ WARNING ⚠</span>
						<h5>You are about to erase your current timeline and create a new one. Proceed anyway ?</h5>
						<button onClick={function(){parent.props.agree();gv.mainApp.setState({hover:"none"});}}>Yes</button>
						<button onClick={function(){window.location="#_";gv.mainApp.setState({hover:"none"});}}>No</button>
					</div>
				</div>
			);
		}

	}
}
