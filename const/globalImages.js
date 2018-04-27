const gv = require('./global');

class GlobalImages{
	constructor(){
		this.images =  [];
		this.counter = 0;
	}

	addImage(name, src){
		this.images.push([name, src]);
	}

	getImage(name){
		for(var i = 0; i < this.images.length; i++){
			if(this.images[i][0] == name){
				return this.images[i][1];
			}
		}

		return "404 : "+name;
	}

	loadImages(){
		this.counter = 0;
		for (var image in this.images) {
			this.__loadImage(this.images[image][1], this.images.length);
		}
	}

	get(string){
		if(string == "P20 normal chip"){
			return this.getImage("P20_NORMAL_CHIP");
		}else if(string == "P200 normal chip"){
			return this.getImage("P200_NORMAL_CHIP");
		}else if(string == "P1000 normal chip"){
			return this.getImage("P1000_NORMAL_CHIP");
		}else if(string == "P1000 long chip"){
			return this.getImage("P1000_LONG_CHIP");
		}else if(string == "6 falcon stand"){
			return this.getImage("6_FALCON_STAND");
		}else if(string == "20 magnetic beads"){
			return this.getImage("20_MAGNETIC_BEADS");
		}else if(string == "15 screw tubes"){
			return this.getImage("15_SCREW_TUBES");
		}else{
			throw new SyntaxError("String provided to to get is not currently supported : "+string+".");
		}
	}

	//This method loads images into the cache and controls the loader.
	__loadImage(image_src, n){
		var image = new Image();
		var parent = this;

		$(image).load(function(){
			parent.counter++;
			gv.imageLoad = parent.counter/n;

			if(parent.counter == n){
				setTimeout(function(){gv.navbarModel.setActiveSection("Welcome");},100);
			}

			if(gv.loadingScreen != undefined){
				gv.loadingScreen.refresh();
			}

		})
		image.src = image_src;
	}
}

export var gi = new GlobalImages();

gi.addImage("HEXAGON_LARGE", "images/hexagon_large.png");
gi.addImage("EMPTY_HAIVE", "images/empty_haive.png");

gi.addImage("CENTRIFUGE", "images/dashboard_haive_types/centrifuge_temp.png");
gi.addImage("FREEZER", "images/dashboard_haive_types/freezer_temp.png");
gi.addImage("DISPENSER", "images/dashboard_haive_types/dispenser_temp.png");

gi.addImage("ZOOM_IN_HEXAGON", "images/animations/zoominhexagon.png");

gi.addImage("CONTAINER_SMALL", "images/containers/container_small.png");
gi.addImage("CONTAINER_SMALL_HOVER", "images/containers/container_small_hover.png");
gi.addImage("CONTAINER_HOVER", "images/containers/container_hover.png");

gi.addImage("6_FALCON_STAND", "images/containers/container_main_images/6_falcon_stand.png");
gi.addImage("15_SCREW_TUBES", "images/containers/container_main_images/15_screw_tubes.png");
gi.addImage("20_MAGNETIC_BEADS", "images/containers/container_main_images/20_magnetic_beads.png");
gi.addImage("P20_NORMAL_CHIP", "images/containers/container_main_images/P20_normal_chip.png");
gi.addImage("P200_NORMAL_CHIP", "images/containers/container_main_images/P200_normal_chip.png");
gi.addImage("P1000_LONG_CHIP", "images/containers/container_main_images/P1000_long_chip.png");
gi.addImage("P1000_NORMAL_CHIP", "images/containers/container_main_images/P1000_normal_chip.png");

gi.addImage("6_FALCON_STAND_DARK", "images/containers/container_main_images/6_falcon_stand_dark.png");
gi.addImage("15_SCREW_TUBES_DARK", "images/containers/container_main_images/15_screw_tubes_dark.png");
gi.addImage("20_MAGNETIC_BEADS_DARK", "images/containers/container_main_images/20_magnetic_beads_dark.png");
gi.addImage("P20_NORMAL_CHIP_DARK", "images/containers/container_main_images/P20_normal_chip_dark.png");
gi.addImage("P200_NORMAL_CHIP_DARK", "images/containers/container_main_images/P200_normal_chip_dark.png");
gi.addImage("P1000_LONG_CHIP_DARK", "images/containers/container_main_images/P1000_long_chip_dark.png");
gi.addImage("P1000_NORMAL_CHIP_DARK", "images/containers/container_main_images/P1000_normal_chip_dark.png");

gi.addImage("6_FALCON_INFO", "images/containers/container_info/6falcon.png");
gi.addImage("15_SCREW_INFO", "images/containers/container_info/15_screw_tubes.png");
gi.addImage("20_MAGNETIC_INFO", "images/containers/container_info/20_magnetic_beads.png");
gi.addImage("P20_INFO", "images/containers/container_info/p20.png");
gi.addImage("P200_INFO", "images/containers/container_info/p200.png");
gi.addImage("P1000_LONG_INFO", "images/containers/container_info/p1000_long.png");
gi.addImage("P1000_NORMAL_INFO", "images/containers/container_info/p1000_normal.png");

gi.addImage("CIRCLE", "images/containers/container_info/circles/circle.png");
gi.addImage("CIRCLE_BLUE", "images/containers/container_info/circles/circle_blue.png");
gi.addImage("CIRCLE_CYAN", "images/containers/container_info/circles/circle_cyan.png");
gi.addImage("CIRCLE_GREEN", "images/containers/container_info/circles/circle_green.png");
gi.addImage("CIRCLE_MAGENTA", "images/containers/container_info/circles/circle_magenta.png");
gi.addImage("CIRCLE_ORANGE", "images/containers/container_info/circles/circle_orange.png");
gi.addImage("CIRCLE_PURPLE", "images/containers/container_info/circles/circle_purple.png");
gi.addImage("CIRCLE_YELLOW", "images/containers/container_info/circles/circle_yellow.png");
gi.addImage("HOVER", "images/containers/container_info/circles/hover.png");

gi.addImage("TOP_LEFT", "images/protocol_design_hexagon_configuration/top_left.png");
gi.addImage("TOP_RIGHT", "images/protocol_design_hexagon_configuration/top_right.png");
gi.addImage("MIDDLE_LEFT", "images/protocol_design_hexagon_configuration/middle_left.png");
gi.addImage("MIDDLE_RIGHT", "images/protocol_design_hexagon_configuration/middle_right.png");
gi.addImage("BOTTOM_LEFT", "images/protocol_design_hexagon_configuration/bottom_left.png");
gi.addImage("BOTTOM_RIGHT", "images/protocol_design_hexagon_configuration/bottom_right.png");

gi.addImage("CANVAS_BACKGROUND", "images/canvas_background.png");
gi.addImage("EMPTY", "images/empty.png");

gi.addImage("CENTRIFUGE_DEPTH", "images/haive_types/centrifuge.png");
gi.addImage("FREEZER_DEPTH", "images/haive_types/freezer.png");
gi.addImage("DISPENSER_DEPTH", "images/haive_types/dispenser.png");