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
 * Class that sends back a component which is a different color following its prop "color"
 */
export class HaiveIcon extends React.Component{
	render(){
		if(this.props.typeId == gv.centrifuge){
			return <img className='draggable' src={gi.getImage("CENTRIFUGE")} alt="" />
		}else if(this.props.typeId == gv.freezer){
			return <img className='draggable' src={gi.getImage("FREEZER")} alt="" />
		}else if(this.props.typeId == gv.dispenser){
			return <img className='draggable' src={gi.getImage("DISPENSER")} alt="" />
		}else{
			return <div>ERROR</div>
		}
	}
}
