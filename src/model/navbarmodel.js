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

const sectionsConst = require('../../const/global').navbarMenuTitlesAndIcons;
const gv = require('../../const/global');

let controller;

/**
 * This is the Model object of the Navbar.
 */
export class NavbarModel{
	constructor(args){

		controller = args.controller;
		this.sections = [];

		for (let section in sectionsConst) {
			this.sections.push(
				new Section({
					title:sectionsConst[section][0],
					icon:sectionsConst[section][1],
					active:false
				})
			)
		}

		this.sections[0].setActive(true);
		this.handler = this.handler.bind(this);
		this.func = null;

		gv.navbarModel = this;
	}

    /**
     * Sets the active section of the navbar according to the passed parameter
     * @param sectionTitle String
     */
	setActiveSection(sectionTitle){
		for(let i = 0; i < this.sections.length; i++){
			if(this.sections[i].title == sectionTitle){
				this.sections[i].setActive(true);
			}else{
				this.sections[i].setActive(false);
			}
		}

		controller.refreshNavbar();
		controller.refreshApp();
	}

    /**
     * Getter for the active section
     * @returns {*} Section object
     */
	getActiveSection(){
		for(let i = 0; i < this.sections.length; i++){
			if(this.sections[i].getActive() == true){
				return this.sections[i];
			}
		}

		return this.sections[0];
	}

    /**
     * Getter for all of the sections actually contained
     * @returns {Array} Array of Section objects.
     */
	getSections(){
		return this.sections;
	}

    /**
     * Returns the Navbar object's controller
     * @returns {*}
     */
	getController(){
		return controller;
	}

    /**
     * The Navbar's handler. This is the main function called when the user changes the active section.
     * @param e
     */
	handler(e){
        this.setActiveSection(e);
	}
}

/**
 * Section object for the navbar
 */
class Section{
	constructor(args){
		this.title = args.title;
		this.active = args.active;
		this.icon = args.icon;
	}

	getTitle(){
		return this.title;
	}

	getActive(){
		return this.active;
	}

	setActive(active){
		this.active = active;
	}

	getIcon(){
		return this.icon;
	}
}
