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
const ProgressBar = require('react-progressbar.js');
const Circle = ProgressBar.Circle;

/**
 * Loading screen ! Loads all the images into the cache and updates the progressbar according to the amount of images loaded.
 */
export class LoadingScreen extends React.Component{
	constructor(props){
		super(props);
		gv.loadingScreen = this;
	}

	refresh(state, value){
		if(state == undefined){
			this.setState({refresh:true});
		}else{
			this.setState({state:value});
		}
	}

	render() {
        const options = {
            strokeWidth: 5,
            color: '#95CAFF',
            trailColor: '#eee',
            trailWidth: 2,
        };

        // For demo purposes so the container has some dimensions.
        // Otherwise progress bar won't be shown
        const containerStyle = {
            width: '400px',
            height: '400px',
        };

        return (
			<section className="loadingscreen animated fadeIn">
				<div className="circleprogressbar">
					<Circle
		                progress={gv.imageLoad}
		                text={'WAKING UP THE BEES'}
		                options={options}
		                initialAnimate={true}
		                containerStyle={containerStyle} />
				</div>
			</section>
        );
    }
}
