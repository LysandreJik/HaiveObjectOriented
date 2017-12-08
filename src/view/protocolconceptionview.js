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

const gv = require('../../const/global');
const gi = require('../../const/globalImages').gi;
let model;

/**
 * View Component of the Protocol Conception.
 */
export class AddLiquids extends React.Component{
	constructor(props){
		super(props);
		this.state = {containerSelected:"none"};
		gv.protocolConceptionView = this;
		model = gv.protocolConceptionModel;
	}

	refresh(state, value){
		if(state == undefined){
			this.setState({refresh:true});
		}else{
			// console.log("Setting state to "+state+" "+value);
			this.setState({state:value});
		}
	}

	getButtonText(container){
		if(container.isLiquidContainer()){
			return "Add liquid";
		}else if(container.isTipContainer()){
			return "Add chip";
		}else{
			return "Unknown container"
		}
	}

	protocolDesignHasStarted(){
		if(gv.protocolDesignController.timeline.getBlocks().length == 3){
			if(gv.protocolDesignController.timeline.getBlocks()[0].getType() == "START_BLOCK" && gv.protocolDesignController.timeline.getBlocks()[1].getType() == "empty" && gv.protocolDesignController.timeline.getBlocks()[2].getType() == "empty"){
				return false;
			}
		}

		return true;
	}

	render(){
		let windowWidth = $('#content').width();
        let parent = this;
		return(
			<div className="animated fadeIn speed-ultrafast">

				{this.protocolDesignHasStarted() ?
					<div className="btnghostcenter">
                        {/*<button style={{"margin":"2px"}} className="btnghost" onClick={function(){gv.mainAppController.hoverMisc("warningCreatingNewTimeline", function(){gv.protocolConceptionController.createNewTimeline()});}}>START A NEW PROTOCOL DESIGN</button>*/}
						<button style={{"margin":"2px"}} className="btnghost" onClick={() => gv.myAssets.setSelected(3)}>EDIT PROTOCOL</button>
					</div>
				:
					<button className="btnghost btnghostcenter" onClick={gv.protocolConceptionController.saveContainers}>START THE PROTOCOL EDITING</button>
				}

				<div className="liquidcontentmaindiv divgridcontainers">
					{gv.currentlySelectedHaive.getContainers().map(function(container, index){
						return(
							<div className="liquidcontentmaindivs" key={index}>
								<img src={gi.get(container.getType())} width={windowWidth*0.18}></img>
								<button className="btnghost" onClick={() => gv.protocolConceptionController.clickedContainer(container)}>{parent.getButtonText(container)}</button>
								<h3>{container.getType()+", "+container.getLoc()}</h3>
								{parent.state.containerSelected != "none" ? <ContainersHover type={parent.state.containerSelected}/> : ""}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

/**
 * Component displayed when a container is clicked on.
 */
export class ContainersHover extends React.Component{

    componentDidMount(){
        this.setState({updated:true});
    }

	render(){
		return(
			<div className="lightbox" id={"cthover"} draggable="false">
                <ContainerImageHover type={this.props.type}/>
                <PipetteTips container={this.props.type}/>
			</div>
		);
	}
}

/**
 * Component displayed when a user clicks on a Tip to add a liquid to it.
 */
class PipetteTipsDialog extends React.Component{
    constructor(props){
        super(props);
        this.changeSelectColor = this.changeSelectColor.bind(this);
    }

	componentDidMount(){
        $("#liquidtype_pipettetipsdialog").val(this.props.chip.getLiquid());
        $("#liquidamount_pipettetipsdialog").val(this.props.chip.getLiquidAmount());

		if(this.props.chip.getColor() != ""){
            $("#pipettetipsdialogcolorselect").val(this.props.chip.getColor());
			this.changeSelectColor();
		}

		this.props.chip.isViscous() ? "" : $("#v_A").trigger("click");
		this.props.chip.getAmountUnit() == "uL" ? "" : $("#a50").trigger("click");

		document.getElementById('content').addEventListener('click', this.props.keepFocus);

	}

	componentWillUnmount(){
		document.getElementById('content').removeEventListener('click', this.props.keepFocus);
	}

	render(){
		const parent = this;
		return(
			<form id="pipettetipdialog" className="pipettetipsdialog" method="post">

				<label htmlFor="field1">
					<span id="liquidtype_pipettetipsdialogspan">Type of liquid</span><input id="liquidtype_pipettetipsdialog" type="text" name="field1" required="true" />
				</label>
				<ul className="donate-now biglist">

				<li>
					<input type="radio" id="v_A" name="viscous_aqueous" onClick={function(){parent.props.chip.setViscous(false);console.log("Set viscous to false for", parent.props.chip)}}/>
					<label className="labelmarginbottom" htmlFor="v_A">Aqueous</label>
				</li>
				<li>
					<input type="radio" id="v_V" name="viscous_aqueous" defaultChecked="true" onClick={function(){parent.props.chip.setViscous(true);console.log("Set viscous to true for", parent.props.chip)}}/>
					<label className="labelmarginbottom" htmlFor="v_V">Viscous</label>
				</li>
				</ul>

				<label htmlFor="field2">
					<span id="liquidamount_pipettetipsdialogspan">Amount of liquid</span><input id="liquidamount_pipettetipsdialog" type="text" name="field2" required="true" />

					<ul id="pipettetipsdialogunit" className="donate-now">
					<li>
						<input type="radio" id="a25" name="amount" defaultChecked={parent.props.chip.getAmountUnit() == "uL"} onClick={function(){parent.props.chip.setAmountUnit("uL");console.log("Set amount unittyutyu to ul for", parent.props.chip)}}/>
						<label className="labelmarginbottom" htmlFor="a25">uL</label>
					</li>
					<li>
						<input type="radio" id="a50" name="amount" defaultChecked={parent.props.chip.getAmountUnit() == "mL"} onClick={function(){parent.props.chip.setAmountUnit("mL");console.log("Set amount unit to ml for", parent.props.chip)}}/>
						<label className="labelmarginbottom" htmlFor="a50">mL</label>
					</li>
					</ul>

				</label>

				<label>
					<input type="button" value="Validate" onClick={function(){model.setLiquid(parent.props.chip, parent.props.selected);}}/>{"\u00a0\u00a0\u00a0"}
				</label>

				<label>
					<input type="button" value="Cancel" onClick={this.props.selected}/>
				</label>

				<i className="arrowleftdialog"></i>

				<select id="pipettetipsdialogcolorselect" className="pipettetipsdialogcolorselect" defaultValue="blue" onChange={this.changeSelectColor}>
					<option defaultValue="selected" id="blue">Blue</option>
					<option id="orange">Orange</option>
					<option id="yellow">Yellow</option>
					<option id="green">Green</option>
					<option id="cyan">Cyan</option>
					<option id="magenta">Magenta</option>
					<option id="purple">Purple</option>
				</select>

			</form>
		);
	}

	changeSelectColor(){
		const x = document.getElementById("pipettetipsdialogcolorselect").value;
		console.log(x);
    	if(x == 'Orange'){
			document.getElementById("pipettetipsdialogcolorselect").style.backgroundColor = "orange";
			document.getElementById("pipettetipsdialogcolorselect").style.color = "white";
		}else if (x == "Blue") {
			document.getElementById("pipettetipsdialogcolorselect").style.backgroundColor = "blue";
			document.getElementById("pipettetipsdialogcolorselect").style.color = "white";
		}else if (x == "Green") {
			document.getElementById("pipettetipsdialogcolorselect").style.backgroundColor = "green";
			document.getElementById("pipettetipsdialogcolorselect").style.color = "white";
		}else if (x == "Yellow") {
			document.getElementById("pipettetipsdialogcolorselect").style.backgroundColor = "yellow";
			document.getElementById("pipettetipsdialogcolorselect").style.color = "black";
		}else if (x == "Cyan") {
			document.getElementById("pipettetipsdialogcolorselect").style.backgroundColor = "cyan";
			document.getElementById("pipettetipsdialogcolorselect").style.color = "black";
		}else if (x == "Magenta") {
			document.getElementById("pipettetipsdialogcolorselect").style.backgroundColor = "magenta";
			document.getElementById("pipettetipsdialogcolorselect").style.color = "black";
		}else if (x == "Purple") {
			document.getElementById("pipettetipsdialogcolorselect").style.backgroundColor = "purple";
			document.getElementById("pipettetipsdialogcolorselect").style.color = "black";
		}

		this.props.chip.setColor(x);
	}
}

/**
 * Displays the Pipette tips according to their x and y position in the container.
 */
class PipetteTips extends React.Component{
	constructor(props){
		super(props);
		//The selected state means the pipette tip actually selected and under modifications. The full pipettes indicates the x and y position of the test tube that has a certain type of liquid in it : x:y:liquidColor:liquidName:Aqueous:Amount:Unit:Container
		this.state = {selected:"none", fullPipettes:["-1:-1:none:none:none:-1:none:"+this.props.id]};

		//window.addEventListener("resize", function(){parent.setState({selected:"none"})});
		this.setNoneSelected = this.setNoneSelected.bind(this);
		this.keepFocus = this.keepFocus.bind(this);
		this.keepFocusDialog = this.keepFocusDialog.bind(this);

		this.mouseDown = this.mouseDown.bind(this);
		this.mouseUp = this.mouseUp.bind(this);
		this.mouseMove = this.mouseMove.bind(this);
		this.mouseIsDown = false;

        model = gv.protocolConceptionModel;
	}

	componentDidMount(){
		document.getElementById('content').addEventListener('click', this.keepFocus);
		document.getElementById('content').addEventListener("mousedown", this.mouseDown);
		document.getElementById('content').addEventListener("mouseup", this.mouseUp);
		document.getElementById('content').addEventListener("mousemove", this.mouseMove);
	}

	componentWillUnmount(){
		document.getElementById('content').removeEventListener('click', this.keepFocus);
		document.getElementById('content').removeEventListener("mousedown", this.mouseDown);
		document.getElementById('content').removeEventListener("mouseup", this.mouseUp);
		document.getElementById('content').removeEventListener("mousemove", this.mouseMove);
	}

	mouseDown(e){
		this.mouseIsDown = true;
	}

	mouseUp(e){
		this.mouseIsDown = false;

		if(e.target.id != "hexagonhover" && e.target.id != "tips" && e.target.id != "infobulle" && !$(e.target).parents("#pipettetipdialog").length && !$(e.target).parents("#tips").length && e.target.id != "pipettetipdialog"){
			this.setNoneSelected();
			window.location = "#_";
		}
	}

	mouseMove(e){
		if(this.mouseIsDown && e.target.id.substring(0,12) == "hexagonhover"){
			model.setTip(this, this.props.container, e.target.id.substring(12));
		}
	}

	keepFocus(e){
		if(e.target.id != "hexagonhover" && e.target.id != "cthover" && e.target.id != "tips" && e.target.id != "infobulle" && !$(e.target).parents("#pipettetipdialog").length && !$(e.target).parents("#tips").length && e.target.id != "pipettetipdialog"){
			this.setNoneSelected();
			window.location = "#_";
		}
	}

	keepFocusDialog(e){
		if(!$(e.target).parents("#infobulle").length){
			this.setNoneSelected();
		}
	}

	setNoneSelected(){
		this.setState({selected:"none"});
	}

	render(){
        const styleDiv = model.getStyleDiv();
        const pipetteImageLoc = model.pipetteImageLoc(this.props.container);
        const parent = this;

		return(
			<div id="tips" style={styleDiv}>
				<h2 className="hovertitle" style={model.getStyleTitle()}>{parent.props.container.getType()}</h2>
				{pipetteImageLoc.map(function(image, key) {
						return <img key={key} className="canvas" style={image} src="images/containers/container_info/circles/hover.png" id={"hexagonhover"+key} draggable={false}/>;
				})}

				{pipetteImageLoc.map(function(image, key) {
						return <img key={key} className="canvastopimage" style={image} src={"images/containers/container_info/circles/circle"+model.getColorWithUnderscore(key, parent.props.container).toLowerCase()+".png"} id={"hexagonhover"+key} draggable={false}
							onClick={() => model.clickedOnTip(parent, parent.props.container, key)}/>;
				})}

				{this.state.selected != "none" ? <div id="infobulle" className="canvasdiv animated fadeInRight speed-ultrafast" style={model.getStyleInfobulle(this.state.selected, this.props.container)}>
					<PipetteTipsDialog selected={this.setNoneSelected} chip={this.state.selected} keepFocus={this.keepFocusDialog}/>
				</div> : ""}

			</div>

		);
	}
}

/**
 * Image displayed on container hover.
 */
class ContainerImageHover extends React.Component{
	render(){
		if(this.props.type.getType() == "P1000 normal chip"){
			return(<img src="images/containers/container_info/p1000_normal.png" id="hexagonhover" draggable={false}/>);
		}else if(this.props.type.getType() == "P1000 long chip"){
			return(<img src="images/containers/container_info/p1000_long.png" id="hexagonhover" draggable={false}/>);
		}else if(this.props.type.getType() == "P200 normal chip"){
			return(<img src="images/containers/container_info/p200.png" id="hexagonhover" draggable={false}/>);
		}else if(this.props.type.getType() == "P20 normal chip"){
			return(<img src="images/containers/container_info/p20.png" id="hexagonhover" draggable={false}/>);
		}else if(this.props.type.getType() == "6 falcon stand"){
			return(<img src="images/containers/container_info/6falcon.png" id="hexagonhover" draggable={false}/>);
		}else if(this.props.type.getType() == "15 screw tubes"){
			return(<img src="images/containers/container_info/15_screw_tubes.png" id="hexagonhover" draggable={false}/>);
		}else if(this.props.type.getType() == "20 magnetic beads"){
			return(<img src="images/containers/container_info/20_magnetic_beads.png" id="hexagonhover" draggable={false}/>);
		}else{
			return(<img src="images/containers/container_info/p200.png" id="hexagonhover" draggable={false}/>);
		}

	}
}


