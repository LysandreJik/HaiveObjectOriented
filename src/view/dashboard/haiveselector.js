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
const timeline = require('../../../const/global').timeline;
const gv = require('../../../const/global');
const gi = require('../../../const/globalImages').gi;

const HaiveSelectorModel = require("../../model/dashboard/haiveselectormodel").HaiveSelectorModel;
const model = new HaiveSelectorModel();

const HaiveSelectorController = require("../../controller/dashboard/haiveselectorcontroller").HaiveSelectorController;
const controller = new HaiveSelectorController();
import { HexagonHoverTypes } from './hoverview';
import { HaiveDesc } from './hoverview';

import React from 'react';

/**
 * Controller class for the Haive store (dashboard).
 */
export class HaiveSelector extends React.Component{
    constructor(props) {
        super(props);
        this.state = {hover:"none", hoverMisc:"none"};
        gv.haiveSelectorView = this;
    }

    refresh(state, value){
        if(state == undefined){
            this.setState({refresh:true});
        }else if(state == "hover"){
            this.setState({hover:value});
        }else if(state == "hovermisc"){
            this.setState({hoverMisc:value});
        }else{
            this.setState({state:value});
        }
    }

    render(){
        return(
            <div className={"maincontent"}>
                <HaiveDispenser/>
                <HaiveBlueprint/>
                {this.state.hover != "none" ? <HexagonHoverTypes small={false} keyId={this.state.hover}/> : ""}
                {this.state.hoverMisc.split(':')[0] == "setdescofhaive" ? <HaiveDesc id={this.state.hoverMisc.split(':')[1]}/> : ""}
            </div>
        );
    }
}

export class HaiveDispenser extends React.Component{
    render(){
        return(
            <div id={"haivedispenser"} className={"haivedispenser"}>
                <ul className="haivestoreul">
                    {model.getStoreHaives().map(function(hex, index){
                        return (
                            <Hexagon x={index} y={0} key={index} title={hex.getName()} description={hex.getDesc()} type={hex.getType()} small={true}/>
                        );
                    })}
                </ul>
            </div>
        )
    }
}


export class HaiveBlueprint extends React.Component{
    render(){
        return(
            <div id={"haiveblueprint"} className={"haiveblueprint blueprintgrid"}>
                <ul className={"blueprintul"}>
                    {model.getTileHaives().map(function(hex, index){
                        if(hex[0] != null && hex[0] != "empty"){
                            return (
                                <Hexagon x={hex[1]} y={hex[2]} key={index} title={hex[0].getName()} description={hex[0].getDesc()} type={hex[0].getType()} small={false}/>
                            );
                        }else if(hex[0] == "empty"){
                            return (
                                <Hexagon x={hex[1]} y={hex[2]} key={index} title={"empty"} small={false}/>
                            );
                        }else{
                            return (
                                <Hexagon x={hex[1]} y={hex[2]} key={index} title={"null"} small={false}/>
                            );
                        }
                    })}
                </ul>
            </div>
        )
    }
}

class Hexagon extends React.Component{
    constructor(props){
        super(props);
        this.offsetX = 3;
        this.offsetY = 5;
    }

    componentDidMount(){
        let element = $("#hex"+this.props.x+this.props.y);
        this.width = element.width()+this.offsetX;
        this.height = element.height();
        this.setState({updated:true});

    };

    componentDidUpdate(){
        if(!this.props.small){
            const component =  $('#draggable_' + this.props.x + "_" + this.props.y);
            const posComponent = component.offset();
            const blueprint = document.getElementById("haiveblueprint");

            let isHere = false;
            for(let i = 0; i < gv.hexagon_tiles_canv_pos.length; i++) {
                if (gv.hexagon_tiles_canv_pos[i][2] == this.props.x && gv.hexagon_tiles_canv_pos[i][3] == this.props.y) {
                    isHere = true;
                }
            }

            if(!isHere){
                gv.hexagon_tiles_canv_pos.push([blueprint.scrollLeft+posComponent.left+component.width()/2, blueprint.scrollTop+posComponent.top+component.height()/2, this.props.x, this.props.y]);
            }
        }
        controller.addDraggables(this.props.small, this.props.x, this.props.y);
    }

    getStyle(small){
        if(this.width == undefined){
            return {"position":"relative"};
        }

        if(small){
            if(this.props.y % 2 == 1 || this.props.y % 2 == -1){
                return {
                    'left':(this.width*this.props.x-this.width/6*this.props.x),
                    "top":(this.height*this.props.y+this.offsetY),
                    "width":($("#haivedispenser").height()-20)+"px"
                };
            }

            return {
                'left':(this.width*this.props.x-this.width/6*this.props.x),
                "top":(this.height*this.props.y+this.offsetY),
                "width":($("#haivedispenser").height()-20)+"px"
            };
        }else{

            let haiveblueprint = $('#haiveblueprint');

            let offsetX = haiveblueprint.width()/2 - this.width/2;
            let offsetY = haiveblueprint.height()/2 - this.height/2;

            if(this.props.y % 2 == 1 || this.props.y % 2 == -1){
                return {
                    'left':(offsetX+((this.width-this.offsetX)/2+this.offsetX)*this.props.x*2+this.width/2)+"px",
                    "top":(offsetY+(this.height*this.props.y)-(41*this.props.y))+'px'
                };
            }

            return {
                'left':(offsetX+((this.width-this.offsetX)/2+this.offsetX)*this.props.x*2)+'px',
                "top":(offsetY+(this.height*this.props.y)-(41*this.props.y))+'px'
            };
        }
    }

    render(){
        let parent = this;
        if(this.props.title == "null"){
            return(
                <li className="hexsmall" style={this.getStyle(this.props.small)} id={this.props.small ? "draggable_small_"+this.props.x : "draggable_"+this.props.x+"_"+this.props.y}>
                    <div className={"animated fadeIn hexsmallIn"}>
                        <a id={"hex"+this.props.x+this.props.y} className="hexempty" draggable="false">
                            <img className={"empty"} src={gi.getImage('EMPTY')} alt="" />
                        </a>
                    </div>
                </li>
            );
        }else if(this.props.title == "empty"){
            return(
                <li className="hexsmall" style={this.getStyle(this.props.small)} id={this.props.small ? "draggable_small_"+this.props.x : "draggable_"+this.props.x+"_"+this.props.y}>
                    <div className={"animated fadeIn hexsmallIn"}>
                        <a id={"hex"+this.props.x+this.props.y} className="hexempty" draggable="false">
                            <img className={""} src={gi.getImage('EMPTY')} alt="" />
                        </a>
                    </div>
                </li>
            );
        }else{
            return(
                <li className="hexsmall" style={this.getStyle(this.props.small)} id={this.props.small ? "draggable_small_"+this.props.x : "draggable_"+this.props.x+"_"+this.props.y}>
                    <div className={"animated fadeIn hexsmallIn"} onClick={!this.props.small ?
                        function(){
                            console.log(parent.props, parent.props.type);
                            gv.haiveSelectorView.refresh("hover", parent.props.x+"_"+parent.props.y);
                            setTimeout(function(){window.location = "#"+parent.props.x+"_"+parent.props.y;}, 1);
                        } : ""}>
                        <a id={"hex"+this.props.x+this.props.y} className="hexLink" draggable="false">
                            <img src={gi.getImage(this.props.type.toUpperCase())} alt="" />
                            <h1>{this.props.title}</h1>
                            <p>{this.props.description}</p>
                        </a>
                    </div>
                </li>
            );
        }

    }
}