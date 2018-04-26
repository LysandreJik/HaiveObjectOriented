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
import {ContainersHover} from "../protocolconceptionview";
import {CONTAINER_POSITIONS, CONTAINER_SUBTYPES, getContainerIDFromPosition} from "../../../const/structure";

const gv = require('../../../const/global');
const containerImgBaseSize = 150;

let model;
let controller;

/**
 * Container select React component. Main Component of the containerview class.
 */
export class ContainerSelect extends React.Component{
	constructor(props){
		super(props);
		this.state = {animationDone:"false", containerSelected:"none"};
		gv.containerView = this;
		model = this.props.model;
		controller = model.getController();
		controller.updateAtAnimationEnd();
	}


	render(){
		return(
			<section className="vbox ">
				<section className="scrollable wrapper">
					<div id="divanim">
					<img className="animated speed-slow center zoomIn" src="images/animations/zoominhexagon.png" />
					</div>
					<div id="maincontent">
						<div style={{height:"100%", width:"80%"}}>
							<div className="canvashex">
								{this.state.animationDone=="true"&&gv.currentlySelectedHaive!=undefined?<MainContent/>:""}
							</div>
							<div className="containersandbutton">
								{this.state.animationDone=="true"&&gv.currentlySelectedHaive!=undefined?<Containers func={this.props.func} updateAll={this.updateAll}/>:""}
								{this.state.animationDone=="true"&&gv.currentlySelectedHaive!=undefined?<button className="btnghostdarker animated speed-ultrafast pulse" onClick={this.props.buy}>BUY</button>:""}
							</div>
						</div>
						{this.state.animationDone=="true"&&gv.currentlySelectedHaive!=undefined?<div className="animated fadeIn protocol_hexagonmap">
							<h1 className="colorblue">{gv.currentlySelectedHaive.getName().toUpperCase()}</h1>
							<br></br>
							<span className="colorblue" style={{"fontSize":"30px"}}>{gv.currentlySelectedHaive.getType()}</span>
							<br></br>
							<br></br>
							<span className="colorblue" style={{"fontSize":"20px"}}>{gv.currentlySelectedHaive.getDesc()}</span>
						</div>:""}
						{this.state.animationDone=="true"&&gv.currentlySelectedHaive==undefined?<h1>PLEASE SELECT A HAIVE FIRST</h1>:""}
                        {this.state.containerSelected != "none" ? <ContainersHover type={this.state.containerSelected}/> : ""}
					</div>
				</section>
			</section>
		);
	}
}

/**
 * Containers React component. Every container is rendered with this class.
 */
class Containers extends React.Component{
	constructor(props){
		super(props);
		this.state = {imageLoaded:false};
		gv.containerBar = this;
		this.getContainersBar = this.getContainersBar.bind(this);
	}

	componentDidMount(){
		controller.attachDraggable();
		controller.manageEventListeners("add");
	}

	componentDidUpdate(){
		controller.attachDraggable();
	}

	componentWillUnmount(){
		controller.manageEventListeners("remove");
	}

	refresh(state, value){
		if(state == undefined){
			this.setState({refresh:true});
		}else{
			this.setState({state:value});
		}
	}

	getContainers(containerType){
        const windowWidth = $(window).width();
        //The ratio is 0.888 when the window width is 1920.
        const ratio = 0.888 * (windowWidth / 1920);
        const containers = model.containersAvailable.getAvailableContainersPerType(containerType);
        if(containers.length > 0){
			return (
				<a id={"golink"+gv.acceptedContainerTypes.indexOf(containerType.name)}>
					<div className="containercenter animated speed-ultrafast pulse">
						<div id={"container_"+gv.acceptedContainerTypes.indexOf(containerType.name)} className="containerimg">
                            <span>{containerType.name}</span><br></br>
							<img id={"img"+"golink"+gv.acceptedContainerTypes.indexOf(containerType.name)} src={"images/containers/container_main_images/"+(containerType.name).replace(/ /g,'_')+".png"} width={containerImgBaseSize*ratio} draggable="false"/>
							<h1 className="displaynumbercontainers">{containers.length}</h1>
						</div>
					</div>
				</a>
			);
		}else{
			return <div></div>;
		}
	}

	getContainersBar(){
        const parent = this;
        return(
			<div id="allcontainers" className="containers animated">
				{Object.keys(CONTAINER_SUBTYPES).map(function(containerType, index){

					return <div key={index}>{parent.getContainers(CONTAINER_SUBTYPES[containerType])}</div>;
				})}
			</div>
		);
	}

	render(){
		return(this.getContainersBar());
	}
}

/**
 * MainContent React component. This is the main "Haive" on the container select. This is the area where the containers are dropped.
 */
class MainContent extends React.Component{
	constructor(props){
		super(props);
		gv.containerViewMainContent = this;
	}

	componentDidMount(){
		controller.attachMainContentDroppable();
	}

	refresh(state, value){
		if(state == undefined){
			this.setState({refresh:true});
		}else{
			this.setState({state:value});
		}
	}

	render(){
		return(
			<div id="canvasContent" className="animated fadeInUp">
				<h1 className="colorblue">SELECT YOUR CONTAINERS</h1>
				<button className="btnghostinvisible animated fadeInLeft">Non</button><br></br>
				<Canvas/>
			</div>
		);
	}
}

/**
 * Canvas React component. This is the main component of the MainContent.
 */
class Canvas extends React.Component{
	constructor(props){
		super(props);
		gv.containerViewCanvas = this;
		this.state = {containers:model.getContainersOnField(), refresh:false, hover:""};
	}

	componentDidMount(){
		controller.manageEventListeners("add");
		this.refresh()
	}

	componentWillUnmount(){
		controller.manageEventListeners("remove");
	}

	refresh(state, value){
		if(state == undefined){
			this.setState({refresh:true});
		}else if(state == "hover"){
			this.setState({hover:value});
		}else{
			this.setState({state:value});
		}
	}

	addContainerToCanvas(loc, container){
		let containersTemp = this.state.containers;
		containersTemp[gv.getContainerLocNumberFromLocString(loc)] = container;
		this.setState({containers:containersTemp});
	}

	getContainersInHaive(container_location, container, dark){
		if(typeof ratio == 'undefined'){
            const windowWidth = $(window).width();
            //The ratio is 0.888 when the window width is 1920.
			var ratio = 0.888*(windowWidth/1920);
		}

        const divStyle = gv.getDivStylePosition(container_location);

        return (
				<div id={getContainerIDFromPosition(container_location)} className="canvascontainersontop animated speed-ultrafast pulse"  draggable = {false} style={divStyle}>
					<img id={"img_"+container_location} src={("images/containers/container_main_images/"+container.getContainerSubType().name.replace(/ /g,'_'))+(dark ? "_dark" : "") + ".png"} draggable = {false} width={containerImgBaseSize*ratio} />
					{<button style={{"left":0, "position":"absolute"}} onClick={
					    function(){
                            gv.protocolConceptionController.clickedContainer(gv.currentlySelectedHaive.getContainer(container_location));
					    }
					} className="btnghostinvisiblebutclickable">{"Remove "+container.getContainerSubType().name}</button>}
				</div>
			);
	}

	render(){
		return(
			<div id="canvasContainers" className="canvascontainers">
				<img id="background" src="images/canvas_background.png" className="canvascontainersimagebackground" draggable = {false}/>

					{gv.currentlySelectedHaive.getContainer(CONTAINER_POSITIONS.TOP_LEFT) === null ? <img id="top-left" src="images/protocol_design_hexagon_configuration/top_left.png" className="canvascontainersimagebackground canvascontainerstopimages" draggable = {false}/> :
						this.getContainersInHaive(CONTAINER_POSITIONS.TOP_LEFT, gv.currentlySelectedHaive.getContainer(CONTAINER_POSITIONS.TOP_LEFT), this.state.hover == CONTAINER_POSITIONS.TOP_LEFT)}

					{gv.currentlySelectedHaive.getContainer(CONTAINER_POSITIONS.TOP_RIGHT) === null  ? <img id="top-right" src="images/protocol_design_hexagon_configuration/top_right.png" className="canvascontainersimagebackground canvascontainerstopimages" draggable = {false}/> :
						this.getContainersInHaive(CONTAINER_POSITIONS.TOP_RIGHT, gv.currentlySelectedHaive.getContainer(CONTAINER_POSITIONS.TOP_RIGHT), this.state.hover == CONTAINER_POSITIONS.TOP_RIGHT)}

					{gv.currentlySelectedHaive.getContainer(CONTAINER_POSITIONS.MIDDLE_LEFT) === null  ? <img id="middle-left" src="images/protocol_design_hexagon_configuration/middle_left.png" className="canvascontainersimagebackground canvascontainerstopimages" draggable = {false}/> :
						this.getContainersInHaive(CONTAINER_POSITIONS.MIDDLE_LEFT, gv.currentlySelectedHaive.getContainer(CONTAINER_POSITIONS.MIDDLE_LEFT), this.state.hover == CONTAINER_POSITIONS.MIDDLE_LEFT)}

					{gv.currentlySelectedHaive.getContainer(CONTAINER_POSITIONS.MIDDLE_RIGHT) === null  ? <img id="middle-right" src="images/protocol_design_hexagon_configuration/middle_right.png" className="canvascontainersimagebackground canvascontainerstopimages" draggable = {false}/> :
						this.getContainersInHaive(CONTAINER_POSITIONS.MIDDLE_RIGHT, gv.currentlySelectedHaive.getContainer(CONTAINER_POSITIONS.MIDDLE_RIGHT), this.state.hover == CONTAINER_POSITIONS.MIDDLE_RIGHT)}

					{gv.currentlySelectedHaive.getContainer(CONTAINER_POSITIONS.BOTTOM_LEFT) === null  ? <img id="bottom-left" src="images/protocol_design_hexagon_configuration/bottom_left.png" className="canvascontainersimagebackground canvascontainerstopimages" draggable = {false}/> :
						this.getContainersInHaive(CONTAINER_POSITIONS.BOTTOM_LEFT, gv.currentlySelectedHaive.getContainer(CONTAINER_POSITIONS.BOTTOM_LEFT), this.state.hover == CONTAINER_POSITIONS.BOTTOM_LEFT)}

					{gv.currentlySelectedHaive.getContainer(CONTAINER_POSITIONS.BOTTOM_RIGHT) === null  ? <img id="bottom-right" src="images/protocol_design_hexagon_configuration/bottom_right.png" className="canvascontainersimagebackground canvascontainerstopimages" draggable = {false}/> :
						this.getContainersInHaive(CONTAINER_POSITIONS.BOTTOM_RIGHT, gv.currentlySelectedHaive.getContainer(CONTAINER_POSITIONS.BOTTOM_RIGHT), this.state.hover == CONTAINER_POSITIONS.BOTTOM_RIGHT)}


				{gv.currentlySelectedHaive.getContainer(CONTAINER_POSITIONS.TOP_LEFT) !== null  || gv.currentlySelectedHaive.getContainer(CONTAINER_POSITIONS.TOP_RIGHT) !== null  || gv.currentlySelectedHaive.getContainer(CONTAINER_POSITIONS.MIDDLE_LEFT) !== null  ||
					gv.currentlySelectedHaive.getContainer(CONTAINER_POSITIONS.MIDDLE_RIGHT) !== null  || gv.currentlySelectedHaive.getContainer(CONTAINER_POSITIONS.BOTTOM_LEFT) !== null || gv.currentlySelectedHaive.getContainer(CONTAINER_POSITIONS.BOTTOM_RIGHT) !== null  ?
					<button className="protocols animated fadeInLeft btnghostdarker canvascontainertext" onClick={
					    function(){
					        gv.myAssets.setSelected(3);
					        if(gv.currentlySelectedHaive.getTimeline().getNonEmptyBlocks().length == 0){
                                gv.protocolConceptionController.saveContainers();
                            }

					    }
					}>EDIT PROTOCOLS</button> : ""}

			</div>
		);
	}
}
