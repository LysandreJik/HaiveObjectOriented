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

/**
 * Controller for the navbar.
 */
export class NavbarController{

    /**
     * Sets the refresh navbar function
     * @param that Navbar React component
     */
	setRefreshNavbarFunction(that){
		this.navbar = that;
	}

    /**
     * Sets the refresh App function
     * @param that App React component
     */
	setRefreshAppFunction(that){
		this.app = that;
	}

    /**
     * refreshes the navbar
     */
	refreshNavbar(){
		if(this.navbar != undefined){
			this.navbar.updateState("updated", true);
		}
	}

    /**
     * Refreshes the app
     */
	refreshApp(){
		this.app.updateApp("updated", true);
	}

}
