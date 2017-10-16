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
		this.resizeNestedDiv = this.resizeNestedDiv.bind(this);
		this.getFilledTips = this.getFilledTips.bind(this);
	}

	componentDidMount(){
        const parent = this;
        window.addEventListener("resize", this.resizeNestedDiv);
        const checkExist = setInterval(function () {
            if ($('#img' + parent.props.id).length) {
                if ($('#img' + parent.props.id).width() > 0) {
                    parent.resizeNestedDiv();
                    clearInterval(checkExist);
                }
            }
        }, 100);
    }

	componentDidUpdate(){
		this.resizeNestedDiv();
	}

	componentWillUnmount(){
		window.removeEventListener("resize", this.resizeNestedDiv);
	}

	resizeNestedDiv(){
        const parent = this;

        let canvaselement = document.getElementById('nested'+parent.props.id);
		let imgelement =  $('#img'+parent.props.id);
		let imgelementspecs = imgelement.position();

		canvaselement.style.left = (imgelementspecs.left+5)+"px";
		canvaselement.style.top = (imgelementspecs.top+5)+"px";
		canvaselement.style.width = (imgelement.width()-10)+"px";
		canvaselement.style.height = (imgelement.height()-10)+"px";
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
				<img  id={"img"+this.props.id} className="containerspageimg" src={'images/containers/'+ (this.props.hover == this.props.id.substring(15) ? 'container_small_hover.png' : 'container_small.png')} />
				<div id={"nested"+this.props.id} className="containgerspagenesteddiv" onClick={() => this.props.blockDropped(this.props.id)}>
					{this.props.container.isLiquidContainer() ? "LIQUID CONTAINER" : (this.props.container.isTipContainer() ? "CHIP CONTAINER" : "")}
					<br></br>
					{this.props.container.isLiquidContainer() ? this.getFilledTips("miniature") : this.props.container.isTipContainer() ? this.props.container.getNumberOfFullTips() > 1 ? this.props.container.getNumberOfFullTips()+" CHIPS LEFT" : this.props.container.getNumberOfFullTips()+" CHIP LEFT" :""}
					<br></br>
					{this.props.container.getType()}
					{this.props.hover == this.props.id.substring(15) ? this.props.container.isLiquidContainer()  ? this.getFilledTips("detail") : "" : ""}
					<br></br>
					{/*this.props.container.getName()*/}
				</div>
			</div>
		);
	}
}
