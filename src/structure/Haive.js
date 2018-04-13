export default class Haive{
    constructor(args){
        this.name = args.name;
        this.type = args.type;
        this.containers = {
            topLeft:null,
            middleLeft:null,
            bottomLeft:null,
            topRight:null,
            middleRight:null,
            bottomRight:null
        };
        this.neighbours = {
            topLeft:null,
            middleLeft:null,
            bottomLeft:null,
            topRight:null,
            middleRight:null,
            bottomRight:null
        };
    }

    getName(){
        return this.name;
    }

    getType(){
        return this.type;
    }

    getContainers(){
        return this.containers;
    }

    getNeighbours(){
        return this.neighbours;
    }

    setTopLeftContainer(container){
        this.containers.topLeft = container;
    }

    setTopRightContainer(container){
        this.containers.topRight = container;
    }

    setMiddleLeftContainer(container){
        this.containers.middleLeft = container;
    }

    setMiddleRightContainer(container){
        this.containers.middleRight = container;
    }

    setBottomLeftContainer(container){
        this.containers.bottomLeft = container;
    }

    setBottomRightContainer(container){
        this.containers.bottomRight = container;
    }

    removeTopLeftContainer(){
        this.containers.topLeft = null;
    }

    removeTopRightContainer(){
        this.containers.topRight = null;
    }

    removeMiddleLeftContainer(){
        this.containers.middleLeft = null;
    }

    removeMiddleRightContainer(){
        this.containers.middleRight = null;
    }

    removeBottomLeftContainer(){
        this.containers.bottomLeft = null;
    }

    removeBottomRightContainer(){
        this.containers.bottomRight = null;
    }

    setTopLeftNeighbour(neighbour){
        this.neighbours.topLeft = neighbour;
    }

    setTopRightNeighbour(neighbour){
        this.neighbours.topRight = neighbour;
    }

    setMiddleLeftNeighbour(neighbour){
        this.neighbours.middleLeft = neighbour;
    }

    setMiddleRightNeighbour(neighbour){
        this.neighbours.middleRight = neighbour;
    }

    setBottomLeftNeighbour(neighbour){
        this.neighbours.bottomLeft = neighbour;
    }

    setBottomRightNeighbour(neighbour){
        this.neighbours.bottomRight = neighbour;
    }

    removeTopLeftNeighbour(){
        this.neighbours.topLeft = null;
    }

    removeTopRightNeighbour(){
        this.neighbours.topRight = null;
    }

    removeMiddleLeftNeighbour(){
        this.neighbours.middleLeft = null;
    }

    removeMiddleRightNeighbour(){
        this.neighbours.middleRight = null;
    }

    removeBottomLeftNeighbour(){
        this.neighbours.bottomLeft = null;
    }

    removeBottomRightNeighbour(){
        this.neighbours.bottomRight = null;
    }
}