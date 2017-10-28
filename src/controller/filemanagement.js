//NOT YET IMPLEMENTED



const gv = require('../../const/global');

export class FileManagement{

	export(){
		console.log(gv.currentlySelectedHaive);
		console.log(gv.protocolDesignController.timeline);

		let file = [];
		let actualCounter = 0;

		for(let i = 0; i < gv.protocolDesignController.timeline.getBlocks().length; i++){
		    let block = gv.protocolDesignController.timeline.getBlock(i);

		    if(block.getType() != "empty"){
                actualCounter++;

		        if(block.getType() != "megablock"){
		            if(block.getComment() != ""){
                        file.push({
                            "Block ":[
                                {
                                    "Number":actualCounter
                                },
                                {
                                    "Type":block.getType()
                                }, {
                                    "Comment:":block.getComment()
                                }
                            ]
                        });
                    }else{
                        file.push({
                            "Block ":[
                                {
                                    "Number":actualCounter
                                },
                                {
                                    "Type":block.getType()
                                }
                            ]
                        });
                    }

                }


            }
        }

        console.log(JSON.stringify(file));
	}

}
