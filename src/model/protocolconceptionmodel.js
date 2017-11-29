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

export class ProtocolConceptionModel{
	constructor(){
		gv.protocolConceptionModel = this;

	}

    /**
     * Method called when a tip has been clicked on in the protocol conception part.
     * @param parent
     * @param container
     * @param key
     */
    clickedOnTip(parent, container, key){
        const x = Math.floor(key/this.getContainerWidthAndHeight(container)[1]);
        const y = key%this.getContainerWidthAndHeight(container)[1];
        if(container.isTipContainer()){
            if(container.getTip(x,y).isFull()){
                container.getTip(x,y).setFull(false);
                container.getTip(x,y).setColor("");
            }else{
                container.getTip(x,y).setFull(true);
                container.getTip(x,y).setColor("blue");
            }
            parent.setState({selected:"none"});
        }else if(container.isLiquidContainer()){
            parent.setState({selected:container.getTip(x,y)});
        }
    }

    /**
     * Method called when a drag is done on the protocol conception part.
     * @param parent
     * @param container
     * @param key
     */
    setTip(parent, container, key){
        const x = Math.floor(key/this.getContainerWidthAndHeight(container)[1]);
        const y = key%this.getContainerWidthAndHeight(container)[1];
        if(container.isTipContainer()){
            container.getTip(x,y).setFull(true);
            container.getTip(x,y).setColor("blue");
            parent.setState({selected:"none"});
        }else if(container.isLiquidContainer()){
            parent.setState({selected:container.getTip(x,y)});
        }
    }

    /**
     * Resets the "selected" state of the ProtocolConception view.
     * @param that ProtocolConception view object
     */
	setNoneSelected(that){
		that.setState({selected:"none"});
	}

    /**
     * Set liquid in the passed tip by getting the information from the HTML element.
     * @param tip Tip object
     * @param func Validation function
     */
	setLiquid(tip, func){
	    const liquidTypeVal = $('#liquidtype_pipettetipsdialog').val();

        const liquidAmountPipette = $('#liquidamount_pipettetipsdialog').val();
	    const textField = $("#liquidamount_pipettetipsdialogspan");

	    console.log(liquidTypeVal, textField);

		//Checks if the liquid name is specified and if the liquid amount contains only digits and 0 or 1 comma or dot;
		if(liquidTypeVal != "" && !liquidTypeVal.includes(':')){
			if(/^\d*[,.]\d+$/.test(liquidAmountPipette) || /^\d+$/.test(liquidAmountPipette)){
				tip.setLiquid(liquidTypeVal);
				tip.setLiquidAmount(liquidAmountPipette);
				tip.setColor(document.getElementById("pipettetipsdialogcolorselect").value);
				func();
			}else{
                textField.text("Amount of liquid - Please enter a valid amount");
			}
		}else{
            textField.text("Type of liquid - Please enter a name");
		}
	}

    /**
     * Gets the pipette image location.
     * @param container
     * @returns {Array}
     */
	pipetteImageLoc(container){
		let pipetteTipImages = [];

		let ij = this.getContainerWidthAndHeight(container);
		if(ij == undefined){
			ij = [8,12];
		}

		for(let i = 0; i < ij[0]; i++){
			for(let j = 0; j < ij[1]; j++){
				pipetteTipImages.push(this.getPipetteLocation(container.getTip(i, j), container));
			}
		}
		return pipetteTipImages;
	}

    /**
     * Get the tip disposition in each container
     * TODO: Add the new containers !
     * @param container Container object
     * @returns {[number,number]} Array of ints : width and height.
     */
    getContainerWidthAndHeight(container){
		if(container.getType() == "P200 normal chip" || container.getType() == "P20 normal chip" || container.getType() == "P1000 normal chip" || container.getType() == "P1000 long chip"){
			return [8,12];
		}else if(container.getType() == "15 screw tubes"){
			return [3   ,5];
		}else if(container.getType() == "20 magnetic beads"){
			return [4,5];
		}else if(container.getType() == "6 falcon stand"){
			return [2,3];
		}
	}

    /**
     * Gets the style of the passed tip according to its container.
     * @param tip
     * @param container
     * @returns {{top: string, left: string, width: number, height: number, postion: string}}
     */
	getPipetteLocation(tip, container){
		try{
		    const hexagonHover = $('#hexagonhover');

            const width = hexagonHover.width()*0.28;
            const height = hexagonHover.height()*0.615;

            const horinzontal_tips = this.getContainerWidthAndHeight(container)[0];
            const vertical_tips = this.getContainerWidthAndHeight(container)[1];

			//10% left and 10% right
            const left_right_margins = width*0.1;
            const top_bottom_margins = width*0.1;

			//tips are 8.5% of the total size
            const size_of_tips = width*0.085;

			//spaces are the remainder of the space
            const horizontal_size_of_spaces_between_tips = (width - (left_right_margins*2) - (size_of_tips*horinzontal_tips))/(horinzontal_tips-1);

			//spaces are 3% of the total size - vertical
            const vertical_size_of_spaces_between_tips = (height - (top_bottom_margins*2) - (size_of_tips*vertical_tips))/(vertical_tips-1);

			return{
				top: top_bottom_margins+(size_of_tips+vertical_size_of_spaces_between_tips)*tip.getY()+'px',
				left: left_right_margins+(size_of_tips+horizontal_size_of_spaces_between_tips)*tip.getX()+'px',
				width:size_of_tips,
				height:size_of_tips,
				postion:"absolute"
			};
		}catch(e){}
	}

    /**
     * Get the style of the div according to the HTML positioning
     * @returns {{top: string, left: string, width: string, height: string, position: string}}
     */
	getStyleDiv(){
		try{

            const hexagonHover = $('#hexagonhover');

			return{
				top: document.getElementById("hexagonhover").getBoundingClientRect().top+hexagonHover.height()*0.213 +'px',
				left: document.getElementById("hexagonhover").getBoundingClientRect().left+hexagonHover.width()*0.089+'px',
				width:hexagonHover.width()*0.28+'px',
				height:hexagonHover.height()*0.615+'px',
				position:"absolute"
			};
		}catch(e){}
	}

    /**
     * Get the style of the infobulle according to which tip the user clicked on and the concerned container.
     * @param tip
     * @param container
     * @returns {{top: string, left: string}}
     */
	getStyleInfobulle(tip, container){
		let stylePipetteTips = this.getPipetteLocation(tip, container);
		return{
			top: (parseInt(stylePipetteTips.top.slice(0,-3))+(stylePipetteTips.height/2)-40-2)+"px",
			left: (parseInt(stylePipetteTips.left.slice(0,-3))+stylePipetteTips.width+2+5)+"px",
		};
	}

    /**
     * Get the style of the title
     * @returns {{top: string, left: string, width: string, position: string, textAlign: string, fontSize: string}}
     */
	getStyleTitle(){
		return{
			top:"-38%",
			left:"-20%",
			width:"300%",
			position:"absolute",
			"textAlign":"left",
			fontSize: "4vw"
		}
	}

    /**
     * Add liquid to the passed tip (The key allows for tip identification)
     * @param key int attached to a tip
     * @param container Container object
     * @param that ProtocolConception view object
     */
	addLiquid(key, container, that){
		that.setNoneSelected();

        let parent = that;

        let x = Math.floor(key/parent.getContainerWidthAndHeight(container)[1]);
		let y = key%parent.getContainerWidthAndHeight(container)[1];

		let element = document.getElementById('infobulle');

		if(element != null){
			element.classList.remove("animated");
			element.classList.remove('fadeInRight');
			void element.offsetWidth;
			element.classList.add("fadeInRight");
			element.classList.add("animated");
		}

		let chip = container.getTip(x, y);
		that.setState({selected:chip});
	}

    /**
     * Get color of the tip.
     * @param key Key of the tip
     * @param container Container object
     * @returns {*} String of hexadecimal color
     */
	getColor(key, container){
        const x = Math.floor(key / this.getContainerWidthAndHeight(container)[1]);
        const y = key % this.getContainerWidthAndHeight(container)[1];
        return container.getTip(x, y).getColor();
	}

    /**
     * Returns the color with the underscore for image selecction.
     * @param key
     * @param container
     * @returns {*}
     */
	getColorWithUnderscore(key, container){
		let color = this.getColor(key, container);
		if(color != ""){
			return "_"+color;
		}else{
			return color;
		}
	}
}
