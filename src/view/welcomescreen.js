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

export class WelcomeScreen extends React.Component{
    render(){
        return(

            <div className="welcomescreen">
                <h1 className={"title"}>Dashboard</h1>
                <MyLaboratory/>
                <CurrentExperiment/>
            </div>

        );
    }
}

class MyLaboratory extends React.Component{
    render(){
        return (
            <div className={"mylab"}>
                <h3>My laboratory</h3>
                <span>{"Currently selected haive : "+gv.currentlySelectedHaive.getName()}</span><br></br>
                <span>{"Type : "+gv.currentlySelectedHaive.getType()}</span>
                <span>{"Containers : "+gv.currentlySelectedHaive.getContainers()}</span>
            </div>
        );
    }
}

class CurrentExperiment extends React.Component{
    render(){
        return (
            <div className={"currentexperiment"}>
                <h3>Current experiment</h3>
                <span>No experiment is currently running</span>
            </div>
        );
    }
}