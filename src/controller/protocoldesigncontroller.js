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

const gv = require('../../const/global');
const style = require('../../const/style');
const Timeline = require('../model/timeline/timeline').Timeline;
const Block = require("../model/timeline/block").Block;
let dropBlockStyle = new style.DropBlockStyle();

/**
 * This class is the controller concerning the protocol design (actually designing the protocol, using a timeline).
 * It manages everything there is to manage concerning this part of the interface.
 */
export class ProtocolDesignController{
	constructor(){
		gv.protocolDesignController = this;
		this.timeline = new Timeline();
		this.droppedBlock="";
		this.cancelGetLiquid = this.cancelGetLiquid.bind(this);
	}

    /**
	 * Creates a new timeline. Sends out a warning because the actual timeline will be overriden.
     */
	createNewTimeline(){
		console.log('Warning');
		gv.mainAppController.hoverMisc("warningCreatingNewTimeline", function(){gv.protocolConceptionController.createNewTimeline()});
	}

    /**
	 * Attaches the drag and drop items to the blueprint area once it has mounted.
     * @param that is the blueprint "view" which will need to be updated.
     */
	blueprintMounted(that){
		this.designblockdroppedDraggable();
		this.snaptothisDroppable(that, that.props.blockDropped);
	}

    /**
	 * Everytime the blueprint is updated, reattaches the drag and drop items.
     * @param that is the blueprint "view" which will need to be updated.
     */
	blueprintUpdated(that){
		this.designblockdroppedDraggable();
		this.snaptothisDroppable(that, that.props.blockDropped);
	}

    /**
	 * When a "get liquid" block (or a block with a similar purpose
     */
	cancelGetLiquid(){
		this.timeline.removeBlock(this.timeline.getIndexOf(this.droppedBlock));
		window.location="#_";
		dropBlockStyle.removeDarken();
		style.filterContainers('chip', 'lighten');
		style.filterContainers('other', 'lighten');
		dropBlockStyle.stopBreathingBorder('containerspage');
		gv.hoverview.clearAll();
		gv.protocolDesignView.refresh();
	}

    /**
	 * Method which "lits up" the liquid containers.
     */
	lightenLiquidContainers(){
		dropBlockStyle.removeDarken();
		style.filterContainers('chip', 'lighten');
		style.filterContainers('other', 'lighten');
		dropBlockStyle.stopBreathingBorder('containerspage');
	}

    /**
	 * Method which adds a block on the timeline following the tip passed as a parameter
     * @param tip "Tip" item, containing a certain amount of a certain liquid.
     */
	addBlockContainingTip(tip){
		if(this.droppedBlock.getLiquidQuantity() != undefined){
			this.droppedBlock.getTip().
				addLiquid(
					this.droppedBlock.getLiquidQuantity()[0],
					this.droppedBlock.getLiquidQuantity()[1]
				);
		}

		this.lightenLiquidContainers();

		let maxQuantity = tip.getLiquidAmount();
		let currentQuantity = $('#quantityselectorquantity').val();

		if(tip.getAmountUnit() == "mL"){
			maxQuantity *= 1000;
		}

		if(gv.currentlySelectedDimension == "mL"){
			currentQuantity *= 1000;
		}

		//If the chosen quantity is wrong or above the max quantity, the quantity contained by the tip is immediately set to the maximum one.
		if(currentQuantity > maxQuantity || currentQuantity < 0 || (!(currentQuantity < 0) && !(currentQuantity > 0))){
			this.timeline.setBlock(new Block({
				text:"GET LIQUID :\u00a0"+tip.getLiquid(),
				type:"get liquid",
				tip:tip,
				liquidQuantity:[tip.getLiquidAmount(),tip.getAmountUnit()]
			}), this.timeline.getIndexOf(this.droppedBlock));
			tip.setLiquidAmount(0);
		}else{
			this.timeline.setBlock(new Block({
				text:"GET LIQUID :\u00a0"+tip.getLiquid(),
				type:"get liquid",
				tip:tip,
				liquidQuantity:[currentQuantity, gv.currentlySelectedDimension]
			}), this.timeline.getIndexOf(this.droppedBlock));
			let q = maxQuantity-currentQuantity;
			if(q / 1000 > 0){
				q /= 1000;
				tip.setAmountUnit('mL');
			}
			tip.setLiquidAmount(q);

		}

		this.getSpeed();
		this.timeline.setErrors();
		gv.protocolDesignView.refresh();
	}

    /**
     * Method which adds a "Pipetting" block on the timeline following the tip passed as a parameter
     * @param tip "Tip" item, containing a certain amount of a certain liquid.
	 * @param that is the "ProtocolDesign" view class, which contains the information needed to identify the current block under modifications.
     */
	selectedTipPipetting(tip, that){
		if(this.timeline.getBlock(that.state.receiveBlockDroppedNumber).getLiquidQuantity() != undefined){
			this.timeline.getBlock(that.state.receiveBlockDroppedNumber).getTip().
				addLiquid(
					this.timeline.getBlock(that.state.receiveBlockDroppedNumber).getLiquidQuantity()[0],
					this.timeline.getBlock(that.state.receiveBlockDroppedNumber).getLiquidQuantity()[1]
				);
		}
		dropBlockStyle.removeDarken();
		style.filterContainers('chip', 'lighten');
		style.filterContainers('other', 'lighten');
		dropBlockStyle.stopBreathingBorder('containerspage');
		let maxQuantity = tip.getLiquidAmount();
		let currentQuantity = $('#quantityselectorquantity').val();
		if(tip.getAmountUnit() == "mL"){
			maxQuantity *= 1000;
		}

		if(gv.currentlySelectedDimension == "mL"){
			currentQuantity *= 1000;
		}

		if(currentQuantity > maxQuantity || currentQuantity < 0 || (!(currentQuantity < 0) && !(currentQuantity > 0))){
			this.timeline.setBlock(new Block({
				text:"PIPETTING :\u00a0"+tip.getLiquid()+" ("+tip.getLiquidAmount()+tip.getAmountUnit()+")",
				type:"pipetting",
				tip:tip,
				liquidQuantity:[tip.getLiquidAmount(),tip.getAmountUnit()]
			}), that.state.receiveBlockDroppedNumber);
			tip.setLiquidAmount(0);
		}else{
			this.timeline.setBlock(new Block({
				text:"PIPETTING :\u00a0"+tip.getLiquid()+" ("+currentQuantity+gv.currentlySelectedDimension+")",
				type:"pipetting",
				tip:tip,
				liquidQuantity:[currentQuantity, gv.currentlySelectedDimension]
			}), that.state.receiveBlockDroppedNumber);
			let q = maxQuantity-currentQuantity;
			if(q / 1000 > 0){
				q /= 1000;
				tip.setAmountUnit('mL');
			}
			tip.setLiquidAmount(q);

		}
		//gv.protocolDesignModel.getContainerContents()[loc] = container;
		this.getSpeed();
	}

    /**
	 * Method called when a block is dragged and dropped.
     * @param block is the HTML element which corresponds to the dropped block.
     * @param snaptothis is the ID of the  HTML element which corresponds to the empty space.
     * @param blockObj is a "Block" object. If undefined, the html element will be used instead.
     */
	blockDropped(block, snaptothis, blockObj){
		let blockObject;
		if(blockObj == undefined){
			let category = block.prop('id').split('_')[block.prop('id').split('_').length-2];
			let index = block.prop('id').split('_')[block.prop('id').split('_').length-1];
			blockObject = gv.protocolDesignModel.getBlockFromCategoryAndIndex(category, index);
		}else{
			blockObject = blockObj;
		}

		if(blockObject == null){
			blockObject = gv.protocolDesignModel.getEndBlock();
			console.log(blockObject);
		}


		gv.currentlySelectedDimension = "mL";

		console.log(blockObject);
		gv.protocolDesignController.droppedBlock = gv.protocolDesignController.timeline.getBlocks()[snaptothis.split('_')[snaptothis.split('_').length-1]];

		if(blockObject.getType() == "get tip" || blockObject.getType() == "deposit tip"){
			dropBlockStyle.getChip();
			gv.protocolDesignView.setState({
				blockDropped:gv.protocolDesignController.timeline.getBlocks()[snaptothis.split('_')[snaptothis.split('_').length-1]],
				disabled:gv.protocolDesignModel.getLiquidContainersAsString()+gv.protocolDesignModel.getOtherContainersAsString()
			});
		}

		if(blockObject.getType() == "get liquid" || blockObject.getType() == "deposit liquid" || blockObject.getType() == "pipetting"){
			dropBlockStyle.getLiquid();
			gv.protocolDesignView.setState({
				blockDropped:gv.protocolDesignController.timeline.getBlocks()[snaptothis.split('_')[snaptothis.split('_').length-1]],
				disabled:gv.protocolDesignModel.getTipContainersAsString()+gv.protocolDesignModel.getOtherContainersAsString()
			});
		}

		if(blockObject.getType() == "wait"){
			gv.hoverview.setState({
				wait:gv.protocolDesignController.timeline.getBlocks()[snaptothis.split('_')[snaptothis.split('_').length-1]]
			});
			setTimeout(function(){window.location='#wait'},1);
		}
	}

    /**
	 * Method called when the user clicked on a container, choosing which tip type/liquid he wants.
     * @param container is the container object corresponding to the container clicked on by the user.
     */
	clickOnContainer(container){
		let containerObj = gv.currentlySelectedHaive.getContainers()[container.substring(15)];

		if(gv.protocolDesignController.droppedBlock == "" || gv.protocolDesignController.droppedBlock == undefined){
		    return;
        }


		console.log(containerObj, gv.protocolDesignController.droppedBlock.getType());

		if(gv.protocolDesignController.droppedBlock.getType() == "get tip"){
			if(containerObj.isTipContainer() && containerObj.getNumberOfFullTips() > 0){
				dropBlockStyle.removeDarken();
				style.filterContainers('liquid', 'lighten');
				style.filterContainers('other', 'lighten');
				dropBlockStyle.stopBreathingBorder('containerspage');
				if(gv.protocolDesignController.droppedBlock.getContainer() == undefined){
					containerObj.bookTip();
				}else{
					if(gv.protocolDesignController.droppedBlock.getContainer() != container){
						gv.protocolDesignController.droppedBlock.getContainer().unbookTip();
						containerObj.bookTip();
					}
				}

				gv.protocolDesignController.droppedBlock.setContainer(containerObj);
				gv.protocolDesignController.droppedBlock.setText("Get "+containerObj.getType());

				gv.protocolDesignView.refresh();
				gv.protocolDesignController.getSpeed();
			}
		}else if(gv.protocolDesignController.droppedBlock.getType() == "deposit tip") {
			console.log(containerObj.getType(), gv.protocolDesignController.timeline.getCurrentlyHeldTipContainer(gv.protocolDesignController.timeline.getIndexOf(gv.protocolDesignController.droppedBlock)));
			if(containerObj.isTipContainer()){
				dropBlockStyle.removeDarken();
				style.filterContainers('liquid', 'lighten');
				style.filterContainers('other', 'lighten');
				dropBlockStyle.stopBreathingBorder('containerspage');
				gv.protocolDesignController.droppedBlock.setContainer(containerObj);
				gv.protocolDesignController.droppedBlock.setText("Deposit tip in "+containerObj.getType()+" container");

				gv.protocolDesignView.refresh();
				gv.protocolDesignController.getSpeed();
			}
		}else if(gv.protocolDesignController.droppedBlock.getType() == "get liquid"){
			if(containerObj.isLiquidContainer()){
				console.log(gv.protocolDesignController.droppedBlock);
				if(gv.protocolDesignController.droppedBlock.getTip() != undefined){
					gv.protocolDesignController.droppedBlock.getTip().addLiquid(gv.protocolDesignController.droppedBlock.getLiquidQuantity()[0], gv.protocolDesignController.droppedBlock.getLiquidQuantity()[1]);
					gv.temporaryLiquidQuantity = [gv.protocolDesignController.droppedBlock.getLiquidQuantity()[0], gv.protocolDesignController.droppedBlock.getLiquidQuantity()[1], gv.protocolDesignController.droppedBlock.getTip()];
				}
				gv.hoverview.getLiquid(gv.currentlySelectedHaive.getContainers()[container.substring(15)]);
			}
		}else if(gv.protocolDesignController.droppedBlock.getType() == "deposit liquid") {
			if(containerObj.isLiquidContainer()){
				gv.hoverview.depositLiquid(gv.currentlySelectedHaive.getContainers()[container.substring(15)]);
			}
		}else if(gv.protocolDesignController.droppedBlock.getType() == "pipetting") {
			if(containerObj.isLiquidContainer()){
				gv.hoverview.pipetting(gv.currentlySelectedHaive.getContainers()[container.substring(15)]);
			}
		}


		console.log("Clicked on container with a "+gv.protocolDesignController.droppedBlock.getType()+" block.");
	}

    /**
	 * Method called when a "Wait" block is dropped on the timeline and a number of seconds is entered.
     * @param parent
     */
	defineWait(parent){
		if(/^\d+$/.test(document.getElementById('wait_textfield').value)){
			parent.props.block.setText("Wait "+document.getElementById('wait_textfield').value+" seconds");
			parent.props.block.setType("wait");
			window.location="#_";
            gv.protocolDesignView.refresh();
		}else{
			$("#waitspan").text("Please enter a duration in seconds - only numbers are accepted");
		}


	}

    /**
	 * Method called when a "Deposit liquid" block is dropped on the timeline and all the information concerning said block's liquid is entered.
     * @param parent corresponds to the React component "DepositLiquidNew"
     * @param type is the unit of the liquid quantity (uL or mL)
     * @param newLiquid is a boolean which is true if the "Add liquid to new test tube" option is seleted, false otherwise.
     */
	defineDepositLiquid(parent, type, newLiquid){
		let tip;

		if(newLiquid == false){
			tip = parent.props.tip;
		}else{
			tip = newLiquid
		}

		let emptyTip = true;
		let depositName = $("#depositliquid_name").val();
		let depositAmount = $("#depositliquid_amount").val();

		if(tip.getLiquidAmount() == 0 || tip.getLiquidAmount() == ""){
			emptyTip = false;
		}
		window.location="#_";
		tip.setLiquid(depositName);
		tip.addLiquid(depositAmount, type);
		gv.protocolDesignView.refresh();
		parent.props.parent.setState({depositLiquid:"none", depositLiquidSpecs:"none"});
		if(tip.getColor() == ""){
			tip.setColor("blue");
		}

		this.timeline.setBlock(new Block({
			text:"DISPOSE LIQUID :\u00a0"+tip.getLiquid()+" ("+depositAmount+type+")",
			type:"deposit liquid",
			tip:tip,
			liquidQuantity:[depositAmount, type],
			dirtyingTip:!emptyTip
		}), this.timeline.getIndexOf(parent.props.block));
		this.getSpeed();
	}

    /**
	 * Method called when a "Pipetting" block is dropped on the timeline and all the information concerning said block's liquid is entered
     * @param parent corresponds to the React component "Pipetting"
     * @param type is the unit of the liquid quantity (uL or mL)
     */
	definePipetting(parent, type){
		let emptyTip = true;
		if(parent.props.tip.getLiquidAmount() == 0 || parent.props.tip.getLiquidAmount() == ""){
			emptyTip = false;
		}
		window.location="#_";
		parent.props.tip.setLiquid($("#depositliquid_name").val());
		parent.props.tip.addLiquid(this.timeline.getCurrentlyHeldLiquidQuantity()[0], type);
		gv.protocolDesignView.refresh();
		parent.props.parent.setState({depositLiquid:"none", depositLiquidSpecs:"none"});
		if(parent.props.tip.getColor() == ""){
			parent.props.tip.setColor("blue");
		}
		this.timeline.setBlock(new Block({
			text:"PIPETTING :\u00a0"+parent.props.tip.getLiquid(),
			type:"pipetting",
			tip:parent.props.tip,
			liquidQuantity:[$("#depositliquid_amount").val(), type],
			dirtyingTip:!emptyTip
		}), this.timeline.getIndexOf(parent.props.block));
		this.lightenLiquidContainers();
		this.getSpeed();
	}

    /**
	 * Attaches the draggable component to the draggable blocks.
     */
	designblockdroppedDraggable(){

		let designBlockDropped = $(".designblockdropped");

		designBlockDropped.draggable({
			containment:".blueprint",
			scroll:true,
			revert:"invalid",
			snapMode: "inner",
			snapTolerance: 25
		});

	}

    /**
	 * Attaches the droppable component to the snaptothis empty blocks.
     * @param parent corresponds to the React component "BlueprintContent"
     * @param blockDroppedFunc function called when the block is dropped. Here it is "blockDropped" form this same class, however it has been bound to the "ProtocolDesign" view.
     */
	snaptothisDroppable(parent, blockDroppedFunc){
		let controller = this;
		$(".snaptothis").droppable({
			accept:".designblock, .designblockdropped",
			drop:function(event, ui){
                let draggableItem = $('#'+ui.draggable.prop('id'));
				let dropBlockIndex = event.target.id.split('_')[1];
				let dragBlockIndex = ui.draggable.prop('id') == "END_BLOCK_VALUE" || ui.draggable.prop('id') == "START_BLOCK_VALUE" ? ui.draggable.prop('id') : ui.draggable.prop('id').split('_')[2];
				//If the drag and drop comes from the design block store
				if(ui.draggable.prop('class').includes('designblock ')){
					if(draggableItem.find('span').text() != "Start"){
						if(controller.timeline.containsType("END_BLOCK_VALUE") && controller.timeline.getIndexOfType("END_BLOCK_VALUE") < dropBlockIndex){
							// TODO: WARNING
						}

						let category = ui.draggable.prop('id').split('_')[ui.draggable.prop('id').split('_').length-2];
						let index = ui.draggable.prop('id').split('_')[ui.draggable.prop('id').split('_').length-1];
						let blockObject = gv.protocolDesignModel.getBlockFromCategoryAndIndex(category, index);

						if(blockObject == null){
							blockObject = gv.protocolDesignModel.getEndBlock();
						}

						controller.timeline.overrideBlock(blockObject.getClone(), dropBlockIndex);
						blockDroppedFunc($('#'+ui.draggable.prop('id')), event.target.id);
						parent.setState({updated:true});
					}
				//If the block is moved on the dropped line
				}else if (ui.draggable.prop('class').includes('designblockdropped')) {
					if(controller.timeline.containsType("END_BLOCK_VALUE") && controller.timeline.getIndexOfType("END_BLOCK_VALUE") < dropBlockIndex && dragBlockIndex != "END_BLOCK_VALUE"){
						// TODO: WARNING
					}
					controller.timeline.switchBlocksByIndex(dragBlockIndex, dropBlockIndex);
					parent.setState({updated:true});
				}
			}
		});
	}

    /**
	 * Attaches the draggable component to the design blocks.
     * @param first_iteration
     */
	designblockDraggable(){
		$(".designblock").draggable({
			containment:".scrollable",
			scroll:true,
			helper:"clone",
			appendTo: 'body',
			snap:".snaptothis",
			snapMode: "inner",
			snapTolerance: 25,
			revert:"invalid"
		});

	}

    /**
	 * Sets the window location to the speed selector.
     */
    getSpeed(){
		window.location = "#speed";
	}
}
