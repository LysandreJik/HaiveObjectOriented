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

const gv = require('../../../const/global');
const Container = require('../../model/container').Container;

/**
 * Controller class for the container select. Any action taken on the container select screen is redirected and managed here.
 */
export class ContainerSelectController{

    /**
     * Attaches the draggable element to the containers.
     */
    attachDraggable(){
		let windowWidth = $(window).width();
		//The ratio is 0.888 when the window width is 1920.
		let ratio = 0.888*(windowWidth/1920);

		let background = $('#background');

		//This attaches the draggable property. It is in update dimensions because the "cursorAt" needs to be refreshed everytime a refresh occurs
		for (let i = 0; i < 7; i++) {
			$( function() {
				$( "#golink"+i ).draggable({
					cursorAt: { top: 50*ratio, left:100*ratio},
					revert:function(){
						let id_tag = gv.getClosestContainer((gv.mouseX-background.offset().left), (gv.mouseY-background.offset().top));
						return id_tag == null;
					},
					helper:'clone',
					start: function() {
						//console.log("Started drag");
						gv.dragInMotion = true;
					},
					stop: function() {
						gv.dragInMotion = false;
					}
				});
			});
		}
	}

    /**
     * Attaches the droppable element to the main content.
     */
	attachMainContentDroppable(){

	    let background = $('#background');

		for (let i = 0; i < 7; i++) {

			$( function() {
				$("#canvasContent").droppable({
					accept:".ui-draggable",

					drop: function( event, ui ) {

						let id_tag = gv.getClosestContainer((gv.mouseX-background.offset().left), (gv.mouseY-background.offset().top));

						if(id_tag != null){
							//Gets the closest container from the drop point
                            let id_tag = gv.getClosestContainer((gv.mouseX-background.offset().left), (gv.mouseY-background.offset().top));

							if(gv.currentlySelectedHaive.getContainer(id_tag) != ""){
								gv.availableContainers.addContainer(new Container({type:gv.currentlySelectedHaive.getContainer(id_tag).getType(), name:"none", id:"none", loc:"containerbar"}));
							}

							gv.availableContainers.removeFirstContainerByType(gv.acceptedContainerTypes[ui.draggable.prop('id').substring(6)]);
                            gv.currentlySelectedHaive.addContainer(id_tag, gv.acceptedContainerTypes[ui.draggable.prop('id').substring(6)]);
							gv.containerViewCanvas.refresh();
							gv.containerBar.refresh();
						}
					}
				});
			});
		}
	}

    /**
     * Action taken once the opening animation has ended.
     */
	updateAtAnimationEnd(){
		setTimeout(function(){
			gv.containerView.setState({animationDone:"true"});
			$("#divanim").remove();
		}, 500);
	}

    /**
     * Manages the event listeners.
     * @param action String : if it is equal to "add", it will add the event listeners, otherwise it will remove them.
     */
	manageEventListeners(action){
		if(action == "add"){
			window.addEventListener("resize", this.updateDimensions);
			window.addEventListener("mousemove", this.mouseHover);
		}else{
			window.removeEventListener("resize", this.updateDimensions);
			window.removeEventListener("mousemove", this.mouseHover);
		}
	}

    /**
     * Refreshed the view canvas
     */
	updateDimensions(){
		gv.containerViewCanvas.refresh();
	}

    /**
     * Manages the mouse movement on screen to highlight the containers.
     * @param event mouseEvent.
     */
	mouseHover(event){
		let mouseX = event.pageX;
		let mouseY = event.pageY;
        let background = $('#background');
		let id_tag = gv.getClosestContainer((mouseX-background.offset().left), (mouseY-background.offset().top));

		$(".canvascontainerstopimages").css({opacity:0.2});
		$("#"+id_tag).css({opacity:1});


		if(id_tag != null){
			//console.log(document.getElementById(id_tag).nodeName);
			if(document.getElementById(id_tag).nodeName == "DIV"){
				//console.log(id_tag+" hovered on");
				if(gv.containerViewCanvas.state.hover != id_tag){
					gv.containerViewCanvas.refresh("hover",id_tag);
				}

			}else{
				let containers = document.getElementsByClassName("canvascontainersontop");

				for(let i = 0; i < containers.length; i++){
					if($(containers[i]).is('.canvascontainersontop_hover')){
						containers[i].classList.remove('canvascontainersontop_hover');
					}

				}

				document.getElementById(id_tag).classList.add('canvascontainersontop_hover');
			}
		}else{
			if(gv.containerViewCanvas.state.hover != null){
				gv.containerViewCanvas.refresh("hover",null);
			}
		}
	}

    /**
     * Method called when the "Add liquid to containers" button is pressed. Will send out warnings if no liquid container or no tip container has been added.
     */
	addLiquidToContainers(){
		if(!gv.currentlySelectedHaive.containsLiquidContainer()){
			gv.mainAppController.hoverMisc("warninglackofliquidcontainers", function(){window.location='#_';gv.myAssets.setSelected(2.1);});
		}else if(!gv.currentlySelectedHaive.containsTipContainer()){
			gv.mainAppController.hoverMisc("warninglackofchipcontainers", function(){window.location='#_';gv.myAssets.setSelected(2.1);});
		}else{
			gv.myAssets.setSelected(2.1);
		}

	}
}
