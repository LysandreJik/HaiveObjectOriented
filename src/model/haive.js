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

const acceptedLocs = require('../../const/global').acceptedContainerLocs;
const clone = require('../../const/global').clone;
const TipContainer = require('./tipcontainer').TipContainer;
const LiquidContainer = require('./liquidcontainer').LiquidContainer;
const gv = require('../../const/global');

const Timeline = require('../model/timeline/timeline').Timeline;

/**
 *  Class which hold "Haive" types. "Haive" can be filled with objects from the "Container" class.
 */
export class Haive{
	constructor(args){
		if(typeof(args.name) == "string")
			this.name = args.name;
		else
			throw new TypeError("Error at Haive's constructor : name isn't of type string");

		if(typeof(args.id) == "string")
			this. id = args.id;
		else
			throw new TypeError("Error at Haive's constructor : id isn't of type string");

		if(typeof(args.type) == "string")
			this.type = args.type;
		else
			throw new TypeError("Error at Haive's constructor : type isn't of type string");

		this.refID = args.refID;
		this.desc = args.desc;
		this.timeline = args.timeline;

		if(this.timeline == undefined){
		    this.timeline = new Timeline();
        }

		if(args.containers == undefined){
            this.containers = [];
        }else{
            this.containers = args.containers;
        }
	}

    /**
     * Getter for this Haive's timeline.
     * @returns {*}
     */
	getTimeline(){
	    console.log(this.timeline);
	    return this.timeline;
    }

    /**
     * Setter for this Haive's timeline.
     * @param timeline
     */
    setTimeline(timeline){
	    this.timeline = timeline;
    }

    /**
     * Returns the reference ID of the Haive
     * @returns {*} String
     */
	getRefID(){
		return this.refID;
	}

    /**
     * Set the Haive's reference ID.
     * @param refID String
     */
	setRefID(refID){
		this.refID = refID;
	}

    /**
     * Get the Haive's description. This can be set by the user.
     * @returns {*} String
     */
	getDesc(){
		return this.desc;
	}

    /**
     * Set the Haive's description. This can be set by the user.
     * @param desc String
     */
	setDesc(desc){
		this.desc = desc;
	}

    /**
     * Set the containers for the haive.
     * @param containers Container array
     */
	setContainers(containers){
		this.clear();
		let containersTemp = [];

		for(let i = 0; i < containers.length; i++){
			containersTemp.push(containers[i].getClone());
		}

		this.containers = containersTemp;
	}

    /**
     * Get the containers from the haive.
     * @returns {*} Container array
     */
	getContainers(){
		if(this.containers.length == 0){
			return "empty";
		}else{
			return this.containers;
		}


	}

	getJSONContainers(){
	    let jsonContainers = [];

	    for(let i = 0; i < this.containers.length; i++){
	        jsonContainers.push(this.containers[i].getJSONCopy());
        }

        return jsonContainers;
    }

    /**
     * Get a container from the Haive, according to the location passed as parameter.
     * @param loc Location of the container, String
     * @returns {*} Container object
     */
	getContainer(loc){
		for (let container in this.containers) {
			if(this.containers[container].getLoc() == loc) {
				return this.containers[container];
			}
		}

		return "";
	}

    /**
     * Create a new container from the passed type to the passed location
     * @param loc Location of the container, String
     * @param container String type
     */
	addContainer(loc, container){
        let containerExists = false;
        let containerObj = gv.containerSelectModel.containersAvailable.getAvailableContainersPerType(container)[0];

		if(acceptedLocs.indexOf(loc) == -1){
			throw new SyntaxError("Container location isn't correct : "+loc)
		}else{
			for (let i = 0; i < this.containers.length; i++) {
				if(this.containers[i].getLoc() == loc) {
				    if(containerObj.isLiquidContainer()){
                        this.containers[i] = new LiquidContainer({
                            loc:loc,
                            name:containerObj.getName(),
                            id:containerObj.getId(),
                            type:container
                        });
                    }else{
                        this.containers[i] = new TipContainer({
                            loc:loc,
                            name:containerObj.getName(),
                            id:containerObj.getId(),
                            type:container
                        });
                    }

					containerExists = true;
				}
			}

			if(!containerExists){
			    let type = container;
			    if(type == "P20 normal chip" || type == "P200 normal chip" || type == "P1000 normal chip" || type == "P1000 long chip"){
                    this.containers.push(new TipContainer({
                        loc:loc,
                        name:containerObj.getName(),
                        id:containerObj.getId(),
                        type:container
                    }));
                }else{
                    this.containers.push(new LiquidContainer({
                        loc:loc,
                        name:containerObj.getName(),
                        id:containerObj.getId(),
                        type:container
                    }));
                }

			}
		}

        gv.containerSelectModel.containersAvailable.removeContainer(containerObj);

        if(this.containers.length > 0 && gv.myAssets != undefined){
            gv.myAssets.setState({button:[false, false, false]});
        }else if(gv.myAssets != undefined){
            gv.myAssets.setState({button:[false, false, true]});
        }
	}

    /**
     * Add a container to the passed location
     * @param loc Location of the container, String
     * @param container Container object
     */
	addContainerObject(loc, container){
        let containerExists = false;
		for (let i = 0; i < this.containers.length; i++) {
			if(this.containers[i].getLoc() == loc) {
				this.containers[i] = container;
				containerExists = true;
			}
		}

		if(!containerExists){
			this.containers.push(container);
		}

        if(this.containers.length > 0 && gv.myAssets != undefined){
            gv.myAssets.setState({button:[false, false, false]});
        }else if(gv.myAssets != undefined){
            gv.myAssets.setState({button:[false, false, true]});
        }
	}

    /**
     * Remove the container at the location passed as a parameter
     * @param loc Location of the container, String
     */
	removeContainer(loc){
		for (let i = 0; i < this.containers.length; i++) {
			if(this.containers[i].getLoc() == loc) {
				if(this.containers.length == 1){
					this.containers = [];
				}else{
					this.containers.splice(i, 1);
				}

			}
		}

		if(this.containers.length > 0 && gv.myAssets != undefined){
		    gv.myAssets.setState({button:[false, false, false]});
        }else if(gv.myAssets != undefined){
            gv.myAssets.setState({button:[false, false, true]});
        }
	}

    /**
     * Returns true if the haive doesn't contain any container, false otherwise.
     * @returns {boolean}
     */
	isEmpty(){
		return this.getContainers() == "empty";
	}

    /**
     * Returns true if the haive contains 6 containers, false otherwise
     * @returns {boolean}
     */
	isFull(){
		return this.containers.length == 6;
	}

    /**
     * Empties the current haive
     */
	clear(){
		this.containers = [];
	}

	//GETTERS AND SETTERS
    /**
     * Getter for the Haive's name
     * @returns {*} String name
     */
	getName(){
		return this.name;
	}

    /**
     * Setter for Haive's name
     * @param name String
     */
	setName(name){
		this.name = name;
	}

    /**
     * Getter for the Haive's ID
     * @returns {*} String
     */
	getId(){
		return this.id;
	}

    /**
     * Setter for the Haive's ID
     * @param id String
     */
	setId(id){
		this.id = id;
	}

    /**
     * Getter for the Haive's type
     * @returns {*} String
     */
	getType(){
		return this.type;
	}

    /**
     * Setter for the Haive's type
     * @param type String
     */
	setType(type){
		this.type = type;
	}

    /**
     * Gets a clone of the current haive. (REFERENCEMENT PREVENTING)
     * @returns {Haive}
     */
	getClone(){

	    var containersClone = [];

	    for(var i = 0; i < this.containers.length; i++){
	        containersClone.push(this.containers[i].getClone());
        }

		return new Haive({
			id:clone(this.getId()),
			type:clone(this.getType()),
			name:clone(this.getName()),
			refID:clone(this.getRefID()),
			desc:clone(this.getDesc()),
            containers:containersClone
		})
	}

    /**
     * Returns true if the Haive contains a liquid container
     *
     * TODO:Add the new containers
     * @returns {boolean}
     */
	containsLiquidContainer(){
		for (const container in this.containers) {
			//console.log(this.containers[container][1]);
			if(this.containers[container].getType() == "15 screw tubes" || this.containers[container].getType() == "6 falcon stand" || this.containers[container].getType() == "20 magnetic beads") {
				return true;
			}
		}

		return false;
	}

    /**
     * Returns true if the Haive contains a tip container
     *
     * TODO:Add the new containers
     * @returns {boolean}
     */
	containsTipContainer(){
		for (const container in this.containers) {
			//console.log(this.containers[container][1]);
			if(this.containers[container].getType() == "P20 normal chip" || this.containers[container].getType() == "P200 normal chip" ||
					this.containers[container].getType() == "P1000 normal chip" || this.containers[container].getType() == "P1000 long chip") {
				return true;
			}
		}

		return false;
	}
}
