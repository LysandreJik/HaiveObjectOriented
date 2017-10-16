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

	HAIVE control test program ver 1.00
	For Molcure product
	Base sketch by Lisan
	http://molcure.com
	Author: Lysandre Debut
*/

import React from 'react';

/**
 * This Component creates the "snaptothis" components, which are the empty spaces on the BluePrint area during the protocol design.
 */
export class SnapSpace extends React.Component{
	constructor(props){
		super(props);
		this.contextMenu = this.contextMenu.bind(this);
	}

	componentDidMount(){
		$('snap_last').bind("contextmenu", this.contextMenu);
	}

	contextMenu(e){
		e.preventDefault();
		$("#snaptothis_context").css("left",e.pageX);
		$("#snaptothis_context").css("top",e.pageY);
		this.props.openedContextMenu("designblock_"+this.props.id);
		// $("#snaptothis_context").hide(100);
		$("#snaptothis_context").fadeIn(0,startFocusOut());
	}

	render(){
		return(
			<div id={"snap_last"} className="snap snaptothis"></div>
		);
	}
}

/**
 *
 */
export class SnapSpaceNoMargin extends React.Component{
	constructor(props){
		super(props);
		this.contextMenu = this.contextMenu.bind(this);
	}

	componentDidMount(){
		$('#snap_'+this.props.id).bind("contextmenu", this.contextMenu);
	}

	contextMenu(e){
		e.preventDefault();
		$("#snaptothis_context").css("left",e.pageX);
		$("#snaptothis_context").css("top",e.pageY);
		this.props.openedContextMenu("designblock_"+this.props.id);
		// $("#snaptothis_context").hide(100);
		$("#snaptothis_context").fadeIn(0,startFocusOut());
	}

	render(){
		return(
			<div id={"snap_"+this.props.id} className="snap_no_margin snaptothis"></div>
		);
	}
}

/**
 * Focus menu focus out function
 */
function startFocusOut(){
	$(document).on("click",function(){
		$("#snaptothis_context").hide();
		$(document).off("click");
	});

	$(document).mouseup(function(e){
		$("#snaptothis_context").hide();
		$(document).off("click");
	});
}
