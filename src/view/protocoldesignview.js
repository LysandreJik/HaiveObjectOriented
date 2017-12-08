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
import { Block } from './protocoldesignblocks/designblock';
import { MainSeparator } from './protocoldesignblocks/designblock';
import { SnapSpaceNoMargin } from "./protocoldesignblocks/snap";
import { ContainerMini } from "./protocoldesignblocks/containermini";
import { Hoverview } from "./hoverview";

const gv = require('../../const/global');
const designblocks = require('./protocoldesignblocks/designblock');
const BlueprintController = require('../controller/blueprintcontroller').BlueprintController;
const FileManagement = require('../controller/filemanagement').FileManagement;
const blueprintController = new BlueprintController();
const fileManagement = new FileManagement();
let model;
let controller;

/**
 * ProtocolDesign React Component. Top level component of the protocol design, which includes : Menu, BluePrintContent, BlockStore, ContainerPage and Hoverview.
 */
export class ProtocolDesign extends React.Component{
	constructor(props){
		super(props);
		this.state = {disabled:"", blockDropped:"", selectingTip:"none", quantity:"none", wait:false, depositLiquid:"none", depositLiquidSpecs:"none", pipetting:"none", pipettingSelector:'none'};
		this.setQuantitySelector = this.setQuantitySelector.bind(this);
		this.setPipettingSelector = this.setPipettingSelector.bind(this);
		gv.protocolDesignView = this;
		model = gv.protocolDesignModel;
		controller = gv.protocolDesignController;
		blueprintController.setController(controller);
	}

	componentDidMount(){
		model.protocolDesignInit();
	}

	refresh(state, value){
		if(state == undefined){
			this.setState({refresh:true});
		}else{
			// console.log("Setting state to "+state+" "+value);
			this.setState({state:value});
		}
	}

	getSpeedSelector(){
        const parent = this;
        return(
			<div className="speedbox" id={"speed"}>
				<div id="warning_div">
					<span>SPEED</span>
					<h5>Please select the speed of the operation</h5>
					<ul id="pipettetipsdialogunit" className="speeddialog">
					<li>
						<input type="radio" id="speed_ultraslow" name="amount" onClick={function(){gv.currentlySelectedSpeed="Ultra slow"}}/>
						<label className="labelmarginbottom" htmlFor="speed_ultraslow">Ultra-slow</label>
					</li>
					<li>
						<input type="radio" id="speed_slow" name="amount" onClick={function(){gv.currentlySelectedSpeed="Slow"}}/>
						<label className="labelmarginbottom" htmlFor="speed_slow">Slow</label>
					</li>
					<li>
						<input type="radio" id="speed_medium" name="amount" defaultChecked="true" onClick={function(){gv.currentlySelectedSpeed="Medium"}}/>
						<label className="labelmarginbottom" htmlFor="speed_medium">Medium</label>
					</li>
					<li>
						<input type="radio" id="speed_fast" name="amount" onClick={function(){gv.currentlySelectedSpeed="Fast"}}/>
						<label className="labelmarginbottom" htmlFor="speed_fast">Fast</label>
					</li>
					<li>
						<input type="radio" id="speed_ultrafast" name="amount" onClick={function(){gv.currentlySelectedSpeed="Ultra fast"}}/>
						<label className="labelmarginbottom" htmlFor="speed_ultrafast">Ultra-fast</label>
					</li>
					</ul>

					<br></br>

					<button value="Validate" onClick={
						function(){
							parent.state.blockDropped.setSpeed(gv.currentlySelectedSpeed);
							parent.setState({pipetting:"none", pipettingSelector:"none", selectingTip:'none', quantity:"none", blockDropped:'', receiveBlockDroppedNumber:'', disabled:'_'});
							window.location="#_";
							controller.timeline.addEmptyBlocks();
							gv.protocolDesignController.droppedBlock = undefined;
							gv.protocolDesignRunInterface.setVisible(false);
						}
					}>Ok</button>
				</div>
			</div>
		);
	}

	setQuantitySelector(tip){
		this.setState({quantity:tip});
	}

	setPipettingSelector(tip){
		this.setState({pipettingSelector:tip});
		setTimeout(function(){window.location="#pipetting"},10);
	}

	render(){
		return(
			<section className="vbox ">
				<section className="scrollable wrapper">
					<div id="maincontent" className="row animated fadeIn speed-fast">


						<ContainersPage blockDropped={controller.clickOnContainer.bind(this)} disabled={this.state.disabled}/>
						<BlueprintContent warning={this.props.warning} blockDropped={controller.blockDropped.bind(this)}/>
                        <span className={"startblueprint"}>START</span>
                        <span className={"stopblueprint"}>END</span>
						<BlockStore />
						<Hoverview />
                        <RunInterface/>
                        <Menu/>
						{this.getSpeedSelector()}
					</div>
				</section>
			</section>
		);
	}
}

class RunInterface extends React.Component{
    constructor(props){
        super(props);
        this.state = {visible:false};
        gv.protocolDesignRunInterface = this;
    }

    setVisible(visible){
        this.setState({visible:visible});
        console.log("Set state to visible =  "+visible);
    }

    render(){
        return(
            <div id={"runinterface"}>
                <button className="runbutton menuitem" onClick={gv.protocolDesignController.startProtocol}>START THE PROTOCOL</button>
                {this.state.visible ? <button className="menuitem cancelbutton animated fadeIn speed-ultrafast" onClick={gv.protocolDesignController.cancelBlockDropped}>CANCEL</button> : ""}
            </div>
        );
    }
}

/**
 * The Menu React Component. Displays the 4 clickable buttons on the window's top-right
 */
class Menu extends React.Component{
	render(){
		return(
			<div className="menu">
				<button className="menuitem" onClick={gv.protocolDesignController.createNewTimeline}>New</button>
				<button className="menuitem" onClick={gv.protocolDesignBlueprintcontentView.resetBlocks}>Save</button>
				<button className="menuitem">Open</button>
				<button className="menuitem" onClick={fileManagement.export}>Export</button>
			</div>
		);
	}
}

/**
 * The ContainersPage React Component. Displays all the containers currently selected for the Haive.
 */
class ContainersPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {hovered:"_"};
		this.mouseMovement = this.mouseMovement.bind(this);
	}

	componentDidMount(){
		window.addEventListener("mousemove", this.mouseMovement);
		this.setState({loaded:true});
	}

	componentWillUnmount(){
		window.removeEventListener("mousemove", this.mouseMovement);
	}

	mouseMovement(e){
		let mouseX = e.pageX;
		let mouseY = e.pageY;
		let temp_state = -1;
		let miniContainerArray = [];
		for(let i = 0; i < gv.currentlySelectedHaive.getContainers().length; i++){
			miniContainerArray.push([i, document.getElementById('mini_container_'+i).getBoundingClientRect()]);
		}

		for (let i = 0; i < miniContainerArray.length; i++) {
			if(mouseX > miniContainerArray[i][1].left && mouseX < miniContainerArray[i][1].right && mouseY > miniContainerArray[i][1].top && mouseY < miniContainerArray[i][1].bottom){
				temp_state = miniContainerArray[i][0];
			}
		}

		if(this.state.hovered != temp_state){
			if(!this.props.disabled.includes(temp_state)){
				this.setState({hovered:temp_state});
			}else{
				this.setState({hovered:-1});
			}
		}
	}

	render(){
        const parent = this;
        return(
			<div id="containerspage" className="containerspage">
				{gv.currentlySelectedHaive.getContainers().map(function(container, index){
					return <ContainerMini id={"mini_container_"+index} key={index} blockDropped={parent.props.blockDropped} hover={parent.state.hovered} container={container} />;
				})}
			</div>
		);
	}
}

/**
 * The BlueprintContent React Component. Contains the Timeline.
 */
class BlueprintContent extends React.Component{
	constructor(props){
		super(props);
		this.state={updated:false, show:false, resetBlocks:false};
		gv.protocolDesignBlueprintcontentView = this;


		this.showRectangle = this.showRectangle.bind(this);
		this.hideRetangle = this.hideRetangle.bind(this);
		this.showOptions = this.showOptions.bind(this);
		this.hideOptions = this.hideOptions.bind(this);
		this.resetResetBlocks = this.resetResetBlocks.bind(this);
		this.resetBlocks = this.resetBlocks.bind(this);
	}

	componentDidMount(){
		controller.blueprintMounted(this);
	}

	componentDidUpdate(){
		controller.blueprintUpdated(this);
		controller.timeline.setErrors();
	}

	componentWillUnmount(){
	    controller.blueprintUnmounted(this);
    }

    showRectangle(x1, y1, x2, y2){

	    let x = Math.min(x1, x2);
	    let y = Math.min(y1, y2);

	    let width = Math.abs(x1-x2);
	    let height = Math.abs(y1-y2);

	    this.setState({show:[x,y,width,height]});
    }

    hideRetangle(){
        this.setState({show:false});
    }

    showOptions(){
        this.setState({options:true});
    }

    hideOptions(){
        this.setState({options:false});
    }

    resetBlocks(){
        this.setState({resetBlocks:this.resetResetBlocks});

    }

    resetResetBlocks(){
        this.setState({resetBlocks:false});
    }

	render(){
		return(
			<div id="blueprint" className="gridcontent blueprint">
				<SnappedItems resetBlocks={this.state.resetBlocks}/>
				<ContextMenu context="snaptothis"/>
				<ContextMenu context="blueprintdroppedblock"/>

                {this.state.show != false ? <SelectingSquare pos={this.state.show}/> : ""}
                {this.state.options == true ? <SelectionOptions/> : ""}

			</div>
		);
	}
}

/**
 * Snapped items of the BlueprintContent
 */
class SnappedItems extends React.Component{
	render(){
	    const parent = this;
		return (
			<div id={"snappeditems"}>
				  {controller.timeline.getBlocks().map(function(block, index){
					  return block.getType() != "empty" ? <Block resetBlocks={parent.props.resetBlocks} id={"dropped_"+index} key={index} block={block} dropped={true} openedContextMenu={blueprintController.openedContextMenu}/> : <SnapSpaceNoMargin id={index} key={index} openedContextMenu={blueprintController.openedContextMenu}/>;
				  })}
			</div>
		);
	}
}

/**
 * The square that appears when the user left clicks on the blueprint to select some blocks
 */
class SelectingSquare extends React.Component{
    render(){
        return(
            <div className="itemSelector" style={{"width":this.props.pos[2]+"px", "height":this.props.pos[3]+"px", "top":this.props.pos[1]+"px", "left":this.props.pos[0]+"px"}}>

            </div>
        );
    }
}

/**
 * The options that are displayed upon selection on the Blueprint.
 */
class SelectionOptions extends React.Component{
    render(){
        return(
            <div id={"selectionOptions"} className="selectionOptions animated fadeInLeft">
                <span id="selectionOption" className="selectionOption" onClick={blueprintController.copySelectedBlocks}>COPY GROUP</span>
                <br></br><br></br>
                <span id="selectionOption" className="selectionOption" onClick={blueprintController.deleteSelectionBlocks}>DELETE GROUP</span>
                <br></br><br></br>
                <span id="selectionOption" className="selectionOption" onClick={blueprintController.mergeInOneGroup}>MERGE IN ONE BLOCK</span>
            </div>
        )
    }
}

/**
 * Context Menu which varies from where the right click was done.
 */
class ContextMenu extends React.Component{
	render(){

		if(this.props.context=="snaptothis"){
			return(
				<div id='snaptothis_context'>
					<ul id='items'>
						<li className={blueprintController.blockCopyTimeline != undefined ? "itemscontext" : "droppedblocks_context_greyed_out"} onClick={blueprintController.paste}>Paste</li>
                        <li className={blueprintController.blocksCopyTimeline != undefined ? "itemscontext" : "droppedblocks_context_greyed_out"} onClick={blueprintController.pasteGroup}>Paste group</li>
					</ul>
				</div>
			);
		}else if(this.props.context=="blueprintdroppedblock"){
		    let blockObject = blueprintController.controller.timeline.getBlock(blueprintController.getSelectedItemContextMenu().split('_')[blueprintController.getSelectedItemContextMenu().split('_').length-1]);
			return(
				<div id='droppedblocks_context'>
					<ul id='items'>
						<li className={"itemscontext"} onClick={blueprintController.copyDroppedBlock}>Copy</li>
						<li className={blueprintController.blockCopyTimeline != undefined ? "itemscontext" : "droppedblocks_context_greyed_out"} onClick={blueprintController.paste}>Paste</li>
                        <li className={blueprintController.blocksCopyTimeline != undefined ? "itemscontext" : "droppedblocks_context_greyed_out"} onClick={blueprintController.pasteGroup}>Paste group</li>
						<li className={"itemscontext"} onClick={blueprintController.deleteDroppedBlock}>Delete</li>
						<li className={"itemscontext"} onClick={blueprintController.removeDroppedBlock}>Delete and remove space</li>
						<li className={"itemscontext"} onClick={blueprintController.modifyDroppedBlock}>Modify</li>
                        <li className={blockObject != undefined ? (blockObject.getType() == "megablock" ? "itemscontext" : "droppedblocks_context_greyed_out") : "droppedblocks_context_greyed_out"} onClick={blueprintController.splitMegablock}>Split into multiple blocks</li>
					</ul>
				</div>
			);
		}else{
			return(
				<div></div>
			);
		}
	}
}

/**
 * Block store component
 */
class BlockStore extends React.Component{
	componentDidMount(){
		controller.designblockDraggable();
	}

	render(){
		return(
			<div id="blockstore" className="blockstore">
				<MainSeparator text="DESIGN BLOCKS"/>
				{designblocks.getDesignBlocks(model)}
			</div>
		);
	}
}