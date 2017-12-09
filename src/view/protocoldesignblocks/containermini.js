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

/**
 * The container mini class is used for the protocol conception part. It creates the containers shown on the left side of the timeline
 */
export class ContainerMini extends React.Component{

	constructor(props){
		super(props);
		this.getFilledTips = this.getFilledTips.bind(this);
	}

	getFilledTips(loc){

        const colors = this.props.container.getLiquidTipsSingletons();

        if(loc == "miniature"){
			if(colors.length > 0){
				return(
					<div className="animated fadeIn">
						{colors.map(function(color, index){
							return <img id={"color_"+index} key={index} src={"images/containers/container_info/circles/circle_"+color.getColor()+".png"}/>;
						  })}
					</div>
				);
			}else{
				return("");
			}
		}else{
			if(colors.length > 0){
				return(
					<div id="pipettetipdialog" className="containerminidetail animated fadeInLeft speed-ultrafast" method="post">
						{colors.map(function(color, index){
							return <div key={index}><img id={"color_"+index}  src={"images/containers/container_info/circles/circle_"+color.getColor()+".png"}/><span>{color.getLiquid()}</span></div>;
						  })}
					</div>
				);
			}else{
				return "";
			}
		}
	}

	render(){
		return(
			<div id={this.props.id} className="containerspagediv">
                <div id={"nested"+this.props.id} className="containgerspagenesteddiv" onMouseDown={() => this.props.blockDropped(this.props.id)}>
					{this.props.container.isLiquidContainer() ? "LIQUID CONTAINER" : (this.props.container.isTipContainer() ? "CHIP CONTAINER" : "")}
					<br></br>
					{this.props.container.isLiquidContainer() ? this.getFilledTips("miniature") : this.props.container.isTipContainer() ? this.props.container.getNumberOfUncontaminatedFullTips() > 1 ? this.props.container.getNumberOfUncontaminatedFullTips()+" CHIPS LEFT" : this.props.container.getNumberOfUncontaminatedFullTips()+" CHIP LEFT" :""}
					<br></br>
					{this.props.container.getType()}
					{this.props.hover == this.props.id.substring(15) ? this.props.container.isLiquidContainer()  ? this.getFilledTips("detail") : "" : ""}
					<br></br>

				</div>

			</div>
		);
	}
}
