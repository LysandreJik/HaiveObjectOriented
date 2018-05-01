import {CONTAINER_POSITIONS} from "../../../const/structure";

const timeline = require('../../../const/global').timeline;
const gv = require('../../../const/global');

export class HaiveSelectorModel{
    constructor(){
        gv.haiveSelectorModel = this;

        this.tileHaives = [];
        this.storeHaives = [];

        for(let i = -4; i < 5; i++){
            for(let j = -1; j < 4; j++){
                if(i==0 && j==0){
                    this.tileHaives.push([null, i, j]);
                }else{
                    this.tileHaives.push(["empty", i, j]);
                }
            }
        }

        this.state = timeline.getTemporaryState();
        this.storeHaives = this.state.getStoreHaives();
        this.dashHaives = this.state.getHaives();

        this.updateState = this.updateState.bind(this);
        this.refreshModel = this.refreshModel.bind(this);
    }

    getDashHaives(){
        return this.dashHaives;
    }

    setCurrentlySelectedHaive(haive){
        this.state.setCurrentlySelectedHaive(haive);
    }

    getCurrentlySelectedHaive(){
        return this.state.getCurrentlySelectedHaive();
    }

    refreshModel(){
        this.state = timeline.getTemporaryState();
        this.storeHaives = this.state.getStoreHaives();
        this.dashHaives = this.state.getHaives();

        //console.log(this.dashHaives);

        let tempTiles = [];

        for(let i = 0; i < this.tileHaives.length; i++){
            if(this.tileHaives[i][0] !== "empty" && this.tileHaives[i][0] !== null){
                //console.log("Temp tile in ", this.tileHaives[i][0]);
                tempTiles.push([this.getDashHaive(this.tileHaives[i][1], this.tileHaives[i][2]).getClone(), this.tileHaives[i][1], this.tileHaives[i][2]]);
            }else{
                tempTiles.push(this.tileHaives[i]);
            }
        }

        this.tileHaives = tempTiles;
    }

    updateEmptyTiles(){
        let nonEmpty = this.getNonEmptyTiles();

        for(let i = 0; i < nonEmpty.length; i++){

            //console.log(nonEmpty[i]);

            if(nonEmpty[i][2] % 2 == 1 || nonEmpty[i][2] % 2 == -1){
                let tileLeft = this.getTileHaive(nonEmpty[i][1]-1, nonEmpty[i][2]);
                if(tileLeft == "empty"){
                    this.setTileHaive(nonEmpty[i][1]-1, nonEmpty[i][2], null);
                }

                //console.log("Displaying ", nonEmpty[i][1]-1, nonEmpty[i][2]);

                let tileRight = this.getTileHaive(nonEmpty[i][1]+1, nonEmpty[i][2]);
                if(tileRight == "empty"){
                    this.setTileHaive(nonEmpty[i][1]+1, nonEmpty[i][2], null);
                }

                //console.log("Displaying ", nonEmpty[i][1]+1, nonEmpty[i][2]);

                let tileBottomLeft = this.getTileHaive(nonEmpty[i][1], nonEmpty[i][2]+1);
                if(tileBottomLeft == "empty"){
                    this.setTileHaive(nonEmpty[i][1], nonEmpty[i][2]+1, null);
                }

                //console.log("Displaying ", nonEmpty[i][1], nonEmpty[i][2]+1);

                let tileBottomRight = this.getTileHaive(nonEmpty[i][1]+1, nonEmpty[i][2]+1);
                if(tileBottomRight == "empty"){
                    this.setTileHaive(nonEmpty[i][1]+1, nonEmpty[i][2]+1, null);
                }

                //console.log("Displaying ", nonEmpty[i][1]+1, nonEmpty[i][2]+1);

                let tileTopLeft = this.getTileHaive(nonEmpty[i][1], nonEmpty[i][2]-1);
                if(tileTopLeft == "empty"){
                    this.setTileHaive(nonEmpty[i][1], nonEmpty[i][2]-1, null);
                }

                //console.log("Displaying ", nonEmpty[i][1], nonEmpty[i][2]-1);

                let tileTopRight = this.getTileHaive(nonEmpty[i][1]+1, nonEmpty[i][2]-1);
                if(tileTopRight == "empty"){
                    this.setTileHaive(nonEmpty[i][1]+1, nonEmpty[i][2]-1, null);
                }

                //console.log("Displaying ", nonEmpty[i][1]+1, nonEmpty[i][2]-1);
            }
            else{
                let tileLeft = this.getTileHaive(nonEmpty[i][1]-1, nonEmpty[i][2]);
                if(tileLeft == "empty"){
                    this.setTileHaive(nonEmpty[i][1]-1, nonEmpty[i][2], null);
                }

                //console.log("Displaying ", nonEmpty[i][1]-1, nonEmpty[i][2]);

                let tileRight = this.getTileHaive(nonEmpty[i][1]+1, nonEmpty[i][2]);
                if(tileRight == "empty"){
                    this.setTileHaive(nonEmpty[i][1]+1, nonEmpty[i][2], null);
                }

                //console.log("Displaying ", nonEmpty[i][1]+1, nonEmpty[i][2]);

                let tileBottomLeft = this.getTileHaive(nonEmpty[i][1]-1, nonEmpty[i][2]+1);
                if(tileBottomLeft == "empty"){
                    this.setTileHaive(nonEmpty[i][1]-1, nonEmpty[i][2]+1, null);
                }

                //console.log("Displaying ", nonEmpty[i][1]-1, nonEmpty[i][2]+1);

                let tileBottomRight = this.getTileHaive(nonEmpty[i][1], nonEmpty[i][2]+1);
                if(tileBottomRight == "empty"){
                    this.setTileHaive(nonEmpty[i][1], nonEmpty[i][2]+1, null);
                }

                //console.log("Displaying ", nonEmpty[i][1], nonEmpty[i][2]+1);

                let tileTopLeft = this.getTileHaive(nonEmpty[i][1]-1, nonEmpty[i][2]-1);
                if(tileTopLeft == "empty"){
                    this.setTileHaive(nonEmpty[i][1]-1, nonEmpty[i][2]-1, null);
                }

                //console.log("Displaying ", nonEmpty[i][1]-1, nonEmpty[i][2]-1);

                let tileTopRight = this.getTileHaive(nonEmpty[i][1], nonEmpty[i][2]-1);
                if(tileTopRight == "empty"){
                    this.setTileHaive(nonEmpty[i][1], nonEmpty[i][2]-1, null);
                }

                //console.log("Displaying ", nonEmpty[i][1], nonEmpty[i][2]-1);
            }

        }

        let allEmpty = this.getAllEmptyTiles();
        for(let i = 0; i < allEmpty.length; i++){
            //console.log(allEmpty[i]);
            let neighbours = this.getTileNeighbours(allEmpty[i][1], allEmpty[i][2]);
            //console.log("Neighbours : ", neighbours);

            let alone = true;

            for(let i = 0; i < neighbours.length; i++){
                //console.log(neighbours[i]);
                if(neighbours[i] != "empty" && neighbours[i] != null && neighbours[i] != ""){
                    alone = false;
                }
            }


            if(alone){
                //console.log("alone ! ");
                this.setTileHaive(allEmpty[i][1], allEmpty[i][2], "empty");
            }
        }


        if(this.getFullHaives().length == 0){
            this.setTileHaive(0, 0, null);
        }

        gv.haiveSelectorView.refresh();
        gv.mainAppController.saveState();

    }

    updateState(description){
        this.updateNeighbours();
        timeline.updateState(this.state, description);
    }

    updateNeighbours(){
        for(let i = 0; i < this.getDashHaives().length; i++){
            this.updateHaiveNeighbours(this.getDashHaives()[i]);
        }
    }

    getNeighbours(x, y){
        if(y % 2 == 0){
            let tileLeft = this.getDashHaive(x-1, y);
            let tileRight = this.getDashHaive(x+1, y);
            let tileBottomLeft = this.getDashHaive(x-1, y+1);
            let tileBottomRight = this.getDashHaive(x, y+1);
            let tileTopLeft = this.getDashHaive(x-1, y-1);
            let tileTopRight = this.getDashHaive(x, y-1);
            //console.log("Result", "L "+tileLeft, "R "+tileRight, "BL "+tileBottomLeft, "BR "+tileBottomRight, "TL "+tileTopLeft, "TR "+tileTopRight);

            return [tileLeft, tileRight, tileBottomLeft, tileBottomRight, tileTopLeft, tileTopRight];
        }else{
            let tileLeft = this.getDashHaive(x-1, y);
            let tileRight = this.getDashHaive(x+1, y);
            let tileBottomLeft = this.getDashHaive(x, y+1);
            let tileBottomRight = this.getDashHaive(x+1, y+1);
            let tileTopLeft = this.getDashHaive(x, y-1);
            let tileTopRight = this.getDashHaive(x+1, y-1);
            //console.log("Result", "L "+tileLeft, "R "+tileRight, "BL "+tileBottomLeft, "BR "+tileBottomRight, "TL "+tileTopLeft, "TR "+tileTopRight);

            return [tileLeft, tileRight, tileBottomLeft, tileBottomRight, tileTopLeft, tileTopRight];
        }
    }

    updateHaiveNeighbours(haive){
        let x = haive.getX();
        let y = haive.getY();

        let middleLeft, middleRight, topLeft, topRight, bottomLeft, bottomRight;

        if(y % 2 == 0){
            middleLeft = this.getDashHaive(x-1, y);
            middleRight = this.getDashHaive(x+1, y);
            bottomLeft = this.getDashHaive(x-1, y+1);
            bottomRight = this.getDashHaive(x, y+1);
            topLeft = this.getDashHaive(x-1, y-1);
            topRight = this.getDashHaive(x, y-1);
        }else{
            middleLeft = this.getDashHaive(x-1, y);
            middleRight = this.getDashHaive(x+1, y);
            bottomLeft = this.getDashHaive(x, y+1);
            bottomRight = this.getDashHaive(x+1, y+1);
            topLeft = this.getDashHaive(x, y-1);
            topRight = this.getDashHaive(x+1, y-1);
        }

        middleLeft !== undefined ? haive.setNeighbour(middleLeft, CONTAINER_POSITIONS.MIDDLE_LEFT) : "";
        middleRight !== undefined ? haive.setNeighbour(middleRight, CONTAINER_POSITIONS.MIDDLE_RIGHT) : "";
        topLeft !== undefined ? haive.setNeighbour(topLeft, CONTAINER_POSITIONS.TOP_LEFT) : "";
        topRight !== undefined ? haive.setNeighbour(topRight, CONTAINER_POSITIONS.TOP_RIGHT) : "";
        bottomLeft !== undefined ? haive.setNeighbour(bottomLeft, CONTAINER_POSITIONS.BOTTOM_LEFT) : "";
        bottomRight !== undefined ? haive.setNeighbour(bottomRight, CONTAINER_POSITIONS.BOTTOM_RIGHT) : "";
    }

    getTileNeighbours(x, y){
        if(y % 2 == 0){
            let tileLeft = this.getTileHaive(x-1, y);
            let tileRight = this.getTileHaive(x+1, y);
            let tileBottomLeft = this.getTileHaive(x-1, y+1);
            let tileBottomRight = this.getTileHaive(x, y+1);
            let tileTopLeft = this.getTileHaive(x-1, y-1);
            let tileTopRight = this.getTileHaive(x, y-1);
            //console.log("Result", "L "+tileLeft, "R "+tileRight, "BL "+tileBottomLeft, "BR "+tileBottomRight, "TL "+tileTopLeft, "TR "+tileTopRight);

            return [tileLeft, tileRight, tileBottomLeft, tileBottomRight, tileTopLeft, tileTopRight];
        }else{
            let tileLeft = this.getTileHaive(x-1, y);
            let tileRight = this.getTileHaive(x+1, y);
            let tileBottomLeft = this.getTileHaive(x, y+1);
            let tileBottomRight = this.getTileHaive(x+1, y+1);
            let tileTopLeft = this.getTileHaive(x, y-1);
            let tileTopRight = this.getTileHaive(x+1, y-1);
            //console.log("Result", "L "+tileLeft, "R "+tileRight, "BL "+tileBottomLeft, "BR "+tileBottomRight, "TL "+tileTopLeft, "TR "+tileTopRight);

            return [tileLeft, tileRight, tileBottomLeft, tileBottomRight, tileTopLeft, tileTopRight];
        }
    }
    
    addStoreHaive(haive){
        this.storeHaives.push(haive);
        //console.log("Added haive to store with containers : ", haive.getContainers());
    }

    removeStoreHaive(x){
        this.storeHaives.splice(x, 1);
    }

    removeTileHaive(x, y){
        //console.log(x, y);
        //console.log(JSON.stringify(this.tileHaives));
        for(let i = 0; i < this.tileHaives.length; i++) {
            if (this.tileHaives[i][1] == x && this.tileHaives[i][2] == y) {
                if(this.tileHaives[i][0] !== null && this.tileHaives[i][0] !== "empty"){
                    this.tileHaives[i][0].setX(null);
                    this.tileHaives[i][0].setY(null);
                }
                this.tileHaives[i][0] = null;
            }
        }

        //console.log(this.tileHaives);
        this.updateEmptyTiles();
        gv.haiveSelectorView.refresh();
    }

    getTileHaives(){
        return this.tileHaives;
    }

    getStoreHaives(){
        return this.storeHaives;
    }

    getDashHaive(x, y){
        return this.dashHaives.filter(function(i){if(i.getX() == x && i.getY() == y){return i;}})[0];
    }

    getTileHaive(x, y){

        for(let i = 0; i < this.tileHaives.length; i++) {
            if (this.tileHaives[i][1] == x && this.tileHaives[i][2] == y) {
                return this.tileHaives[i][0];
            }
        }

        return "";
    }

    setTileHaive(x, y, haive){
        for(let i = 0; i < this.tileHaives.length; i++) {
            if (this.tileHaives[i][1] == x && this.tileHaives[i][2] == y) {
                this.tileHaives[i][0] = haive;
                if(haive !== null && haive !== "empty"){
                    this.tileHaives[i][0].setX(x);
                    this.tileHaives[i][0].setY(y);
                }
            }
        }

        if(haive !== null && haive !== "empty"){
            let found = false;
            for(let i = 0; i < this.dashHaives.length; i++){
                if(this.dashHaives[i].getID() === haive.getID()){
                    found = true;
                }
            }
            if(!found){
                haive.setX(x);
                haive.setY(y);
                this.dashHaives.push(haive);
            }
        }
    }

    addTileHaive(haive, x ,y){
        for(let i = 0; i < this.tileHaives.length; i++) {
            if (this.tileHaives[i][1] == x && this.tileHaives[i][2] == y) {
                this.tileHaives[i][0] = haive;
                if(haive !== null && haive !== "empty"){
                    this.tileHaives[i][0].setX(x);
                    this.tileHaives[i][0].setY(y);
                }
            }
        }

        if(haive !== null && haive !== "empty"){
            let found = false;
            for(let i = 0; i < this.dashHaives.length; i++){
                if(this.dashHaives[i].getID() === haive.getID()){
                    found = true;
                    this.dashHaives[i].setX(x);
                    this.dashHaives[i].setY(y);
                }
            }
            if(!found){
                haive.setX(x);
                haive.setY(y);
                this.dashHaives.push(haive);
            }
        }
    }

    getNonEmptyTiles(){
        let nonEmptyTiles = [];

        for(let i = 0; i < this.tileHaives.length; i++) {
            if (this.tileHaives[i][0] != null && this.tileHaives[i][0] != "empty") {
                nonEmptyTiles.push(this.tileHaives[i]);
            }
        }

        return nonEmptyTiles;
    }

    getAllEmptyTiles(){
        let allEmptyTiles = [];

        for(let i = 0; i < this.tileHaives.length; i++) {
            if (this.tileHaives[i][0] == null) {
                allEmptyTiles.push(this.tileHaives[i]);
            }
        }

        //console.log(allEmptyTiles);

        return allEmptyTiles;
    }

    getFullHaives(){
        let fullHaives = [];

        for(let i = 0; i < this.tileHaives.length; i++) {
            if (this.tileHaives[i][0] != null && this.tileHaives[i][0] != "empty") {
                fullHaives.push(this.tileHaives[i]);
            }
        }

        return fullHaives;
    }
}