const gv = require('./global');

export function filterContainers(container, filter){
	if(container == 'liquid'){
		if(filter == 'lighten'){
			for(var i = 0; i < gv.protocolDesignModel.getContainerContents().length; i++){
				//console.log(gv.protocolDesignModel.getContainerContents()[i][0]);
				if(gv.protocolDesignModel.getContainerContents()[i][0] == "LIQUID CONTAINER"){
					document.getElementById('mini_container_'+i).classList.remove('darkenfilter');
					document.getElementById('mini_container_'+i).classList.remove('animated');
					document.getElementById('mini_container_'+i).classList.add('lightenfilter');
					document.getElementById('mini_container_'+i).classList.add('animated');
				}
			}
			setTimeout(function(){
				for(var i = 0; i < gv.protocolDesignModel.getContainerContents().length; i++){
					//console.log(gv.protocolDesignModel.getContainerContents()[i][0]);
					if(gv.protocolDesignModel.getContainerContents()[i][0] == "LIQUID CONTAINER"){
						document.getElementById('mini_container_'+i).classList.remove('lightenfilter');
						document.getElementById('mini_container_'+i).classList.remove('animated');
					}
				}
			}, 2000);
		}else if(filter == 'darken'){
			for(var i = 0; i < gv.protocolDesignModel.getContainerContents().length; i++){
				//console.log(gv.protocolDesignModel.getContainerContents()[i][0]);
				if(gv.protocolDesignModel.getContainerContents()[i][0] == "LIQUID CONTAINER"){
					//console.log("Darkening "+'mini_container_'+i);
					document.getElementById('mini_container_'+i).classList.add('darkenfilter');
					document.getElementById('mini_container_'+i).classList.add('animated');
				}
			}
		}
	}else if(container == 'chip'){
		if(filter == 'lighten'){
			for(var i = 0; i < gv.protocolDesignModel.getContainerContents().length; i++){
				//console.log(gv.protocolDesignModel.getContainerContents()[i][0]);
				if(gv.protocolDesignModel.getContainerContents()[i][0] == "CHIP CONTAINER"){
					document.getElementById('mini_container_'+i).classList.remove('darkenfilter');
					document.getElementById('mini_container_'+i).classList.remove('animated');
					document.getElementById('mini_container_'+i).classList.add('lightenfilter');
					document.getElementById('mini_container_'+i).classList.add('animated');
				}
			}
			setTimeout(function(){
				for(var i = 0; i < gv.protocolDesignModel.getContainerContents().length; i++){
					//console.log(gv.protocolDesignModel.getContainerContents()[i][0]);
					if(gv.protocolDesignModel.getContainerContents()[i][0] == "CHIP CONTAINER"){
						document.getElementById('mini_container_'+i).classList.remove('lightenfilter');
						document.getElementById('mini_container_'+i).classList.remove('animated');
					}
				}
			}, 2000);
		}else if(filter == 'darken'){
			for(var i = 0; i < gv.protocolDesignModel.getContainerContents().length; i++){
				//console.log(gv.protocolDesignModel.getContainerContents()[i][0]);
				if(gv.protocolDesignModel.getContainerContents()[i][0] == "CHIP CONTAINER"){
					document.getElementById('mini_container_'+i).classList.add('darkenfilter');
					document.getElementById('mini_container_'+i).classList.add('animated');
				}
			}
		}
	}else if(container == 'other'){
		if(filter == 'lighten'){
			for(var i = 0; i < gv.protocolDesignModel.getContainerContents().length; i++){
				//console.log(gv.protocolDesignModel.getContainerContents()[i][0]);
				if(gv.protocolDesignModel.getContainerContents()[i][0] == "OTHER CONTAINER"){
					document.getElementById('mini_container_'+i).classList.remove('darkenfilter');
					document.getElementById('mini_container_'+i).classList.remove('animated');
					document.getElementById('mini_container_'+i).classList.add('lightenfilter');
					document.getElementById('mini_container_'+i).classList.add('animated');
				}
			}
			setTimeout(function(){
				for(var i = 0; i < gv.protocolDesignModel.getContainerContents().length; i++){
					//console.log(gv.protocolDesignModel.getContainerContents()[i][0]);
					if(gv.protocolDesignModel.getContainerContents()[i][0] == "OTHER CONTAINER"){
						document.getElementById('mini_container_'+i).classList.remove('lightenfilter');
						document.getElementById('mini_container_'+i).classList.remove('animated');
					}
				}
			}, 2000);
		}else if(filter == 'darken'){
			for(var i = 0; i < gv.protocolDesignModel.getContainerContents().length; i++){
				//console.log(gv.protocolDesignModel.getContainerContents()[i][0]);
				if(gv.protocolDesignModel.getContainerContents()[i][0] == "OTHER CONTAINER"){
					document.getElementById('mini_container_'+i).classList.add('darkenfilter');
					document.getElementById('mini_container_'+i).classList.add('animated');
				}
			}
		}
	}
}

export class DropBlockStyle{
	getChip(){
		this.darken();
		filterContainers('liquid', 'darken');
		filterContainers('other', 'darken');
		this.breathingBorder('containerspage');
	}

	getLiquid(){
		this.darken();
		filterContainers('chip', 'darken');
		filterContainers('other', 'darken');
		this.breathingBorder('containerspage');
	}

	depositChip(){
		this.darken();
		filterContainers('liquid', 'darken');
		filterContainers('other', 'darken');
		this.breathingBorder('containerspage');
	}

	depositLiquid(){
		this.darken();
		filterContainers('chip', 'darken');
		filterContainers('other', 'darken');
		this.breathingBorder('containerspage');
	}

	pipetting(){
		this.darken();
		filterContainers('chip', 'darken');
		filterContainers('other', 'darken');
		this.breathingBorder('containerspage');
	}

	darkenAll(){
		document.getElementById('myassetsmaincontent').classList.add('darkenFilter');
		document.getElementById('myassetsmaincontent').classList.add('animated');
	}

	breathingBorder(id){
		document.getElementById(id).classList.add('breathingborder');
		document.getElementById(id).classList.add('animated');
	}

	stopBreathingBorder(id){
		document.getElementById(id).classList.remove('breathingborder');
		document.getElementById(id).classList.remove('animated');
	}

	darken(){
		document.getElementById('myassetsmaincontent').classList.add('darkenbackground');
		document.getElementById('myassetsmaincontent').classList.add('animated');
		document.getElementById('containerspage').classList.add('keepbackgroundlight');
		document.getElementById('containerspage').classList.add('animated');

		document.getElementById('blueprint').classList.add('darkenfilter');
		document.getElementById('blueprint').classList.add('animated');
		document.getElementById('blockstore').classList.add('darkenfilter');
		document.getElementById('blockstore').classList.add('animated');

		document.getElementById('blueprint').classList.add('setuntouchable');
		document.getElementById('blockstore').classList.add('setuntouchable');
	}

	removeDarken(){
		document.getElementById('myassetsmaincontent').classList.remove('darkenbackground');
		document.getElementById('myassetsmaincontent').classList.remove('animated');
		document.getElementById('containerspage').classList.remove('keepbackgroundlight');
		document.getElementById('containerspage').classList.remove('animated');

		document.getElementById('blueprint').classList.remove('darkenfilter');
		document.getElementById('blueprint').classList.remove('animated');
		document.getElementById('blockstore').classList.remove('darkenfilter');
		document.getElementById('blockstore').classList.remove('animated');

		document.getElementById('blueprint').classList.remove('setuntouchable');
		document.getElementById('blockstore').classList.remove('setuntouchable');
	}

	lighten(){
		document.getElementById('myassetsmaincontent').classList.add('lightenbackground');
		document.getElementById('myassetsmaincontent').classList.add('animated');
		document.getElementById('containerspage').classList.add('keepbackgroundlight');
		document.getElementById('containerspage').classList.add('animated');

		document.getElementById('blueprint').classList.add('lightenfilter');
		document.getElementById('blueprint').classList.add('animated');
		document.getElementById('blockstore').classList.add('lightenfilter');
		document.getElementById('blockstore').classList.add('animated');

		setTimeout(function(){
			document.getElementById('myassetsmaincontent').classList.remove('lightenbackground');
			document.getElementById('myassetsmaincontent').classList.remove('animated');
			document.getElementById('containerspage').classList.remove('keepbackgroundlight');
			document.getElementById('containerspage').classList.remove('animated');

			document.getElementById('blueprint').classList.remove('lightenfilter');
			document.getElementById('blueprint').classList.remove('animated');
			document.getElementById('blockstore').classList.remove('lightenfilter');
			document.getElementById('blockstore').classList.remove('animated');
		}, 2000);
	}
}
