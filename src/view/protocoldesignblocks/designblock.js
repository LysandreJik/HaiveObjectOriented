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
 * The Block React Component. Every block on the timeline or on the right side of the timeline on the protocol design screen is made from this component.
 */
export class Block extends React.Component{

	constructor(props){
		super(props);
		this.contextMenu = this.contextMenu.bind(this);
	}

	componentDidMount(){
		if(this.props.dropped == true){
			$('#designblock_'+this.props.id).bind("contextmenu", this.contextMenu);
		}
	}

	contextMenu(e){
		e.preventDefault();
		$("#droppedblocks_context").css("left",e.pageX);
		$("#droppedblocks_context").css("top",e.pageY);
		this.props.openedContextMenu("designblock_"+this.props.id);
		// $("#droppedblocks_context").hide(100);
		$("#droppedblocks_context").fadeIn(0,startFocusOut());
	}

	render(){
	    if(this.props.block.getType() == "megablock"){
            return(
                <div id={"designblock_"+this.props.id} style={{"backgroundColor":this.props.block.getColor()}} className={"designblock"+ (this.props.dropped == true ? "dropped" : "")+" designmegablockdropped"}>
				<span className="designblocktext" style={{"color":this.props.block.getForegroundColor()}}>
					{this.props.block.getText()}
                    <br></br>
                    {this.props.block.getLiquidQuantity() != undefined ? this.props.block.getLiquidQuantity()[0]+this.props.block.getLiquidQuantity()[1] : ""}
				</span>

                    {this.props.block.isError() ? <span className="errormessage animated fadeInRight">{this.props.block.getErrorText()}</span> : ""}
                    {this.props.block.isWarning() && !this.props.block.isError() ? <span className="warningmessage animated fadeInRight">{this.props.block.getWarningText()}</span> : ""}
                </div>
            );
        }else{
            return(
                <div id={"designblock_"+this.props.id} style={{"backgroundColor":this.props.block.getColor()}} className={"designblock"+ (this.props.dropped == true ? "dropped" : "")}>
				<span className="designblocktext" style={{"color":this.props.block.getForegroundColor()}}>
					{this.props.block.getText()}
                    <br></br>
                    {this.props.block.getLiquidQuantity() != undefined ? this.props.block.getLiquidQuantity()[0]+this.props.block.getLiquidQuantity()[1] : ""}
				</span>

                    {this.props.block.isError() ? <span className="errormessage animated fadeInRight">{this.props.block.getErrorText()}</span> : ""}
                    {this.props.block.isWarning() && !this.props.block.isError() ? <span className="warningmessage animated fadeInRight">{this.props.block.getWarningText()}</span> : ""}
                </div>
            );
        }

	}
}

/**
 * Separator for the BlockStore.
 */
export class Separator extends React.Component{
	render(){
		return(
			<div className="separator">
				{this.props.text}
			</div>
		);
	}
}

/**
 * Main Separator for the BlockStore
 */
export class MainSeparator extends React.Component{
	render(){
		return(
			<div className="mainseparator">
				{this.props.text}
			</div>
		);
	}
}

/**
 * Returns all designblocks
 * @param model
 * @returns {XML}
 */
export function getDesignBlocks(model){
	return (
		<div>
			{model.getDesignBlocks().map(function(category, categoryIndex){
				return (
					<div key={categoryIndex}>
						<Separator text={category[0]}/>
						{category[1].map(function(block, blockIndex){
							return <Block id={"store"+"_"+category[0]+"_"+blockIndex} key={blockIndex} block={block}/>;
						})}
					</div>
				);
			  })}
		</div>
	);
}

/**
 * Context menu focus out function
 */
function startFocusOut(){
	$(document).on("click",function(){
		$("#droppedblocks_context").hide();
		$(document).off("click");
	});

	$(document).mouseup(function(e){
		$("#droppedblocks_context").hide();
		$(document).off("click");
	});
}
