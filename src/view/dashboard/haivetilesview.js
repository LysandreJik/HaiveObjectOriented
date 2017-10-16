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
import { HaiveDesc } from './hoverview';
import { Welcome } from './hoverview';

let haivetilesModel;
let haivetilesController;

const gv = require('../../../const/global');

/**
 * The "HEXAGON TILES", the actual hive of Haives
 */
export class HaiveTiles extends React.Component{
	constructor(props){
		super(props);
		haivetilesModel = this.props.model;
		haivetilesController = haivetilesModel.getController();
		haivetilesController.dragAndDrop = haivetilesController.dragAndDrop.bind(this);

		this.state = {hover:"none", hoverMisc:"none"};

		gv.haiveTilesView = this;
	}

	refresh(state, value){
		if(state == undefined){
			this.setState({refresh:true});
		}else{
			this.setState({state:value});
		}
	}

	componentDidMount(){
		haivetilesController.setRefreshTilesFunction(this);
		gv.haiveTilesController.hoverMisc("welcomescreen", 0);
	}

	componentDidUpdate(){
		if(this.props.delete != "none" && this.props.delete != undefined){
			haivetilesModel.removeHaive(this.props.delete);
		}

		if(this.props.updated != "none" && this.props.delete != undefined){
			haivetilesController.dragAndDrop(this.props.updated.split(':')[0], this.props.updated.split(':')[1]);
		}
	}

	render(){
		return (
			<ul id="hexGrid">
				{gv.haiveTilesModel.getHaiveTiles().map(function(hex, index){
					return <Hexagon key={index} id={hex.getId()} func={haivetilesController.dragAndDrop} keyId={hex.getType()} title={hex.getName()} refID={hex.getRefID()} desc={hex.getDesc()}/>;
				})}
				{this.state.hover != "none" ? <HexagonHoverTypes small={false} keyId={this.state.hover}/> : ""}
				{this.state.hoverMisc.split(':')[0] == "setdescofhaive" ? <HaiveDesc id={this.state.hoverMisc.split(':')[1]}/> : ""}
				{this.state.hoverMisc.split(':')[0] == "welcomescreen" ? <Welcome/> : ""}
			</ul>
		);
	}
}

/**
 * The regular hexagon class, which make up the Hexagon Tile view.
 */
class Hexagon extends React.Component{
	componentDidMount(){
	    const component =  $('#' + this.props.id);
        const posComponent = component.offset();
        gv.hexagon_tiles_canv_pos.push([posComponent.left+component.width()/2, posComponent.top+component.height()/2]);
		haivetilesController.addDraggable(this);
		window.location = '#_';
	}

	componentDidUpdate(){
		haivetilesController.addDraggable(this);
	}

	render(){
		if(this.props.keyId != "openslot"){
			return(
				<li className="hex over" id={"draggable"+this.props.id}>
				  <div className={"animated speed-ultrafast fadeIn hexIn "}>
					<a id={this.props.id} className="hexLink " draggable="false" href={"#h"+this.props.id.substring(4)} onClick={() => haivetilesController.displayHover(this.props.id)}>
					  <HaiveIcon typeId={this.props.keyId} small="false"/>
					  <h1>{this.props.title}</h1>
					  <p>{this.props.desc}</p>
					</a>
				  </div>
				</li>
			);
		}else if (this.props.keyId == "openslot") {
			return(
				<li className="hex under">
				  <div className={"animated speed-ultrafast fadeIn hexIn"}>
					<a id={this.props.id} className="hexLink" draggable="false">
					  <img src="images/empty_haive.png" alt="" />
					  <h1>This slot is empty !</h1>
					  <p>Drag a Haive tower here and start building.</p>
					</a>
				  </div>
				</li>
			);
		}
	}
}
