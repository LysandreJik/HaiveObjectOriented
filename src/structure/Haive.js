import {CONTAINER_POSITIONS} from "../../const/structure";

export default class Haive{
    constructor(args){
        this._name = args.name;
        this._type = args.type;
        this._id = args.id;
        this._description = args.description;
        this._x = args.x;
        this._y = args.y;

        if(args.containers === undefined){
            this._containers = {
                topLeft:null,
                middleLeft:null,
                bottomLeft:null,
                topRight:null,
                middleRight:null,
                bottomRight:null
            };
        }else{
            this._containers = args.containers;
        }

        if(args.neighbours === undefined){
            this._neighbours = {
                topLeft:null,
                middleLeft:null,
                bottomLeft:null,
                topRight:null,
                middleRight:null,
                bottomRight:null
            };
        }else{
            this._neighbours = args.neighbours;
        }

        //TODO HAIVE POSITION
    }

    getClone(){
        let containers = {
            topLeft: this._containers.topLeft === null ? null : this._containers.topLeft.getClone(),
            middleLeft: this._containers.middleLeft === null ? null : this._containers.middleLeft.getClone(),
            bottomLeft: this._containers.bottomLeft === null ? null : this._containers.bottomLeft.getClone(),
            topRight: this._containers.topRight === null ? null : this._containers.topRight.getClone(),
            middleRight: this._containers.middleRight === null ? null : this._containers.middleRight.getClone(),
            bottomRight: this._containers.bottomRight === null ? null : this._containers.bottomRight.getClone()
        };

        // Returning actual neighbours and not clones because the link is important. The dictionary has to be made again however, so that the link
        // to previous clones is not kept (neighbours kept, not their positions).
        let neighbours = {
            topLeft: this._neighbours.topLeft === null ? null : this._neighbours.topLeft,
            middleLeft: this._neighbours.middleLeft === null ? null : this._neighbours.middleLeft,
            bottomLeft: this._neighbours.bottomLeft === null ? null : this._neighbours.bottomLeft,
            topRight: this._neighbours.topRight === null ? null : this._neighbours.topRight,
            middleRight: this._neighbours.middleRight === null ? null : this._neighbours.middleRight,
            bottomRight: this._neighbours.bottomRight === null ? null : this._neighbours.bottomRight
        };
        return new Haive({
            name: this._name,
            type: this._type,
            id: this._id,
            containers: containers,
            neighbours: neighbours,
            description: this._description,
            x: this._x,
            y: this._y
        });
    }

    getX(){
        return this._x;
    }

    setName(name){
        this._name = name;
    }

    setDesc(desc){
        this._description = desc;
    }

    getY(){
        return this._y;
    }

    setX(x){
        this._x = x;
    }

    setY(y){
        this._y = y;
    }

    getDesc(){
        return this._description;
    }

    getID(){
        return this._id;
    }

    getName(){
        return this._name;
    }

    getType(){
        return this._type;
    }

    getContainers(){
        return this._containers;
    }

    getNeighbours(){
        return this._neighbours;
    }

    switchContainers(containerPosition1, containerPosition2){
        let containerTemp = this.getContainer(containerPosition1).getClone();
        this.setContainer(this.getContainer(containerPosition2), containerPosition1);
        this.setContainer(containerTemp, containerPosition2);
    }

    setContainer(container, containerPosition){
        if(this.getContainer(containerPosition) !== null){
            this.getContainer(containerPosition).setPosition(null);
        }
        switch (containerPosition) {
            case(CONTAINER_POSITIONS.TOP_LEFT):
                this._containers.topLeft = container;
                this._containers.topLeft.setPosition(containerPosition);
                break;
            case(CONTAINER_POSITIONS.TOP_RIGHT):
                this._containers.topRight = container;
                this._containers.topRight.setPosition(containerPosition);
                break;
            case(CONTAINER_POSITIONS.MIDDLE_LEFT):
                this._containers.middleLeft = container;
                this._containers.middleLeft.setPosition(containerPosition);
                break;
            case(CONTAINER_POSITIONS.MIDDLE_RIGHT):
                this._containers.middleRight = container;
                this._containers.middleRight.setPosition(containerPosition);
                break;
            case(CONTAINER_POSITIONS.BOTTOM_LEFT):
                this._containers.bottomLeft = container;
                this._containers.bottomLeft.setPosition(containerPosition);
                break;
            case(CONTAINER_POSITIONS.BOTTOM_RIGHT):
                this._containers.bottomRight = container;
                this._containers.bottomRight.setPosition(containerPosition);
                break;
        }
    }

    removeContainer(containerPosition){
        switch (containerPosition) {
            case(CONTAINER_POSITIONS.TOP_LEFT):
                this._containers.topLeft.setPosition(null);
                this._containers.topLeft = null;
                break;
            case(CONTAINER_POSITIONS.TOP_RIGHT):
                this._containers.topRight.setPosition(null);
                this._containers.topRight = null;
                break;
            case(CONTAINER_POSITIONS.MIDDLE_LEFT):
                this._containers.middleLeft.setPosition(null);
                this._containers.middleLeft = null;
                break;
            case(CONTAINER_POSITIONS.MIDDLE_RIGHT):
                this._containers.middleRight.setPosition(null);
                this._containers.middleRight = null;
                break;
            case(CONTAINER_POSITIONS.BOTTOM_LEFT):
                this._containers.bottomLeft.setPosition(null);
                this._containers.bottomLeft = null;
                break;
            case(CONTAINER_POSITIONS.BOTTOM_RIGHT):
                this._containers.bottomRight.setPosition(null);
                this._containers.bottomRight = null;
                break;
        }
    }

    getContainer(containerPosition){
        switch (containerPosition) {
            case(CONTAINER_POSITIONS.TOP_LEFT):
                return this._containers.topLeft;
            case(CONTAINER_POSITIONS.TOP_RIGHT):
                return this._containers.topRight;
            case(CONTAINER_POSITIONS.MIDDLE_LEFT):
                return this._containers.middleLeft;
            case(CONTAINER_POSITIONS.MIDDLE_RIGHT):
                return this._containers.middleRight;
            case(CONTAINER_POSITIONS.BOTTOM_LEFT):
                return this._containers.bottomLeft;
            case(CONTAINER_POSITIONS.BOTTOM_RIGHT):
                return this._containers.bottomRight;
        }
    }


    setNeighbour(neighbour, neighbourPosition){
        switch (neighbourPosition) {
            case(CONTAINER_POSITIONS.TOP_LEFT):
                this._neighbours.topLeft = neighbour;
                break;
            case(CONTAINER_POSITIONS.TOP_RIGHT):
                this._neighbours.topRight = neighbour;
                break;
            case(CONTAINER_POSITIONS.MIDDLE_LEFT):
                this._neighbours.middleLeft = neighbour;
                break;
            case(CONTAINER_POSITIONS.MIDDLE_RIGHT):
                this._neighbours.middleRight = neighbour;
                break;
            case(CONTAINER_POSITIONS.BOTTOM_LEFT):
                this._neighbours.bottomLeft = neighbour;
                break;
            case(CONTAINER_POSITIONS.BOTTOM_RIGHT):
                this._neighbours.bottomRight = neighbour;;
                break;
        }
    }

    getNeighbour(neighbourPosition){
        switch (neighbourPosition) {
            case(CONTAINER_POSITIONS.TOP_LEFT):
                return this._neighbours.topLeft;
            case(CONTAINER_POSITIONS.TOP_RIGHT):
                return this._neighbours.topRight;
            case(CONTAINER_POSITIONS.MIDDLE_LEFT):
                return this._neighbours.middleLeft;
            case(CONTAINER_POSITIONS.MIDDLE_RIGHT):
                return this._neighbours.middleRight;
            case(CONTAINER_POSITIONS.BOTTOM_LEFT):
                return this._neighbours.bottomLeft;
            case(CONTAINER_POSITIONS.BOTTOM_RIGHT):
                return this._neighbours.bottomRight;
        }
    }
}