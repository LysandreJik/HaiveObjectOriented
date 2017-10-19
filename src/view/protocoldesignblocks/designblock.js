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
/**
 * The Block React Component. Every block on the timeline or on the right side of the timeline on the protocol design screen is made from this component.
 */
export class Block extends React.Component{

	constructor(props){
		super(props);
		this.contextMenu = this.contextMenu.bind(this);
		this.state = {big:false};
		this.displayFullInfo = this.displayFullInfo.bind(this);
		this.hideFullInfo = this.hideFullInfo.bind(this);
	}

	componentDidMount(){
		if(this.props.dropped == true) {
            $('#designblock_' + this.props.id).bind("contextmenu", this.contextMenu);
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

	displayFullInfo(){
        document.querySelector('#designblock_'+this.props.id).classList.toggle('designblockshowfullinfo');
        document.querySelector('#designblock_'+this.props.id).classList.toggle('animated');
        document.querySelector('#designblock_'+this.props.id).classList.toggle('speed-ultrafast');
        document.querySelector('#designblock_'+this.props.id).classList.toggle('pulse');
	    this.setState({big:true});
    }

    hideFullInfo(){
        document.querySelector('#designblock_'+this.props.id).classList.toggle('designblockshowfullinfo');
        document.querySelector('#designblock_'+this.props.id).classList.toggle('animated');
        document.querySelector('#designblock_'+this.props.id).classList.toggle('speed-ultrafast');
        document.querySelector('#designblock_'+this.props.id).classList.toggle('pulse');
        this.setState({big:false});
    }

    /**
     * Returns the block object
     * @returns {XML}
     */
	getBlock(){
        if(this.state.big){
            return(
                <div id={"designblock_"+this.props.id} style={{"backgroundColor":this.props.block.getColor(), "left":"calc(50% - 8vw)"}} className={"designblock"+ (this.props.dropped == true ? "dropped" : "")+(this.props.block.getType() == "megablock" ? " designmegablockdropped" : "")}>
				<span className="designblocktext" style={{"color":this.props.block.getForegroundColor()}}>
					{
					    this.props.block.getExtendedText().map(function(text, index){
                        return <div key={index}><span>{text}</span><br></br></div>
                        })
					}
				</span>
                    <br></br>
                    <br></br>
                    {this.props.id.substring(0,1) == "d" ? <div onClick={() => gv.hoverview.displayNotes(this.props.block)}><a><i  className={"fa fa-edit editfiles"}></i></a></div> : ""}
                    {this.props.id.substring(0,1) == "d" ? <MoreInfo more={false} display={this}/> : ""}
                    {this.props.block.isError() ? <span className="errormessagebig animated fadeInRight">{this.props.block.getErrorText()}</span> : ""}
                    {this.props.block.getComment() != undefined ? <span className={"commentbig animated fadeInLeft"}>{this.props.block.getComment()}</span> : ""}
                    {this.props.block.isWarning() && !this.props.block.isError() ? <span className="warningmessagebig animated fadeInRight">{this.props.block.getWarningText()}</span> : ""}
                </div>
            );
        }else{
            return(
                <div id={"designblock_"+this.props.id} style={{"backgroundColor":this.props.block.getColor(), "left":"calc(50% - 4vw)"}} className={"designblock"+ (this.props.dropped == true ? "dropped" : "")+(this.props.block.getType() == "megablock" ? " designmegablockdropped" : "")}>
				<span className="designblocktext" style={{"color":this.props.block.getForegroundColor()}}>
					{this.props.block.getText()}
                    <br></br>
                    {this.props.block.getLiquidQuantity() != undefined ? this.props.block.getLiquidQuantity()[0]+this.props.block.getLiquidQuantity()[1] : ""}
				</span>
                    <br></br>
                    <br></br>
                    {this.props.id.substring(0,1) == "d" ? <div onClick={() => gv.hoverview.displayNotes(this.props.block)}><a><i  className={"fa fa-edit editfiles"}></i></a></div> : ""}
                    {this.props.id.substring(0,1) == "d" ? <MoreInfo more={true} display={this}/> : ""}
                    {this.props.block.isError() ? <span className="errormessage animated fadeInRight">{this.props.block.getErrorText()}</span> : ""}
                    {this.props.block.getComment() != undefined ? <span className={"comment animated fadeInLeft"}>{this.props.block.getComment()}</span> : ""}
                    {this.props.block.isWarning() && !this.props.block.isError() ? <span className="warningmessage animated fadeInRight">{this.props.block.getWarningText()}</span> : ""}
                </div>
            );
        }

    }

	render(){
        return this.getBlock();
	}
}

/**
 * The button which allows the user to display more information about the component
 */
export class MoreInfo extends React.Component{
    constructor(props){
        super(props);
        this.showMoreInfo = this.showMoreInfo.bind(this);
        this.showLessInfo = this.showLessInfo.bind(this);
    }

    showMoreInfo(){
        this.props.display.displayFullInfo();
    }

    showLessInfo(){
        this.props.display.hideFullInfo();
    }

    render(){
        if(this.props.more == true){
            return(
                <div id={"moreinfo"} className={"moredetailbutton"} onClick={this.showMoreInfo}>
                    <div className="circle-plus">
                        <div className="circle">
                            <div className="horizontal"></div>
                            <div className="vertical"></div>
                        </div>
                    </div>
                </div>

            );
        }else{
            return(

                <div id={"moreinfo"} className={"moredetailbutton"} onClick={this.showLessInfo}>
                    <div className="circle-plus">
                        <div className="circle">
                            <div className="horizontal"></div>
                        </div>
                    </div>
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
