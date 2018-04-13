import Haive from "../../src/structure/Haive";
import {CONTAINER_POSITIONS, CONTAINER_SUBTYPES, HAIVE_TYPES} from "../../const/structure";
import LiquidContainer from "../../src/structure/Containers/LiquidContainer";

let haiveInit = {name: "Haive 1", type: HAIVE_TYPES.DISPENSER};
let haiveInit2 = {name: "Haive 2", type: HAIVE_TYPES.FREEZER};
let liquidContainerInit = {
    position: CONTAINER_POSITIONS.TOP_LEFT,
    subType: CONTAINER_SUBTYPES.FS6_FALCON_STAND,
};


//HAIVE INIT
test('Haive initialization', () => {
    let haive = new Haive(haiveInit);
    expect(haive.getName()).toBe(haiveInit.name);
    expect(haive.getType()).toBe(haiveInit.type);
});

//SET AND REMOVAL OF CONTAINERS
test('Set and remove top left container', () => {
    let haive = new Haive(haiveInit);
    let liquidContainer = new LiquidContainer(liquidContainerInit);
    haive.setTopLeftContainer(liquidContainer);
    expect(haive.getContainers().topLeft).toBe(liquidContainer);
    haive.removeTopLeftContainer();
    expect(haive.getContainers().topLeft).toBe(null);
});
test('Set and remove top right container', () => {
    let haive = new Haive(haiveInit);
    let liquidContainer = new LiquidContainer(liquidContainerInit);
    haive.setTopRightContainer(liquidContainer);
    expect(haive.getContainers().topRight).toBe(liquidContainer);
    haive.removeTopRightContainer();
    expect(haive.getContainers().topRight).toBe(null);
});
test('Set and remove middle left container', () => {
    let haive = new Haive(haiveInit);
    let liquidContainer = new LiquidContainer(liquidContainerInit);
    haive.setMiddleLeftContainer(liquidContainer);
    expect(haive.getContainers().middleLeft).toBe(liquidContainer);
    haive.removeMiddleLeftContainer();
    expect(haive.getContainers().middleLeft).toBe(null);
});
test('Set and remove middle right container', () => {
    let haive = new Haive(haiveInit);
    let liquidContainer = new LiquidContainer(liquidContainerInit);
    haive.setMiddleRightContainer(liquidContainer);
    expect(haive.getContainers().middleRight).toBe(liquidContainer);
    haive.removeMiddleRightContainer();
    expect(haive.getContainers().middleRight).toBe(null);
});
test('Set and remove bottom left container', () => {
    let haive = new Haive(haiveInit);
    let liquidContainer = new LiquidContainer(liquidContainerInit);
    haive.setBottomLeftContainer(liquidContainer);
    expect(haive.getContainers().bottomLeft).toBe(liquidContainer);
    haive.removeBottomLeftContainer();
    expect(haive.getContainers().bottomLeft).toBe(null);
});
test('Set and remove bottom right container', () => {
    let haive = new Haive(haiveInit);
    let liquidContainer = new LiquidContainer(liquidContainerInit);
    haive.setBottomRightContainer(liquidContainer);
    expect(haive.getContainers().bottomRight).toBe(liquidContainer);
    haive.removeBottomRightContainer();
    expect(haive.getContainers().bottomRight).toBe(null);
});

//SET AND REMOVAL OF NEIGHBOURS
test('Set and remove top left neighbour', () => {
    let haive = new Haive(haiveInit);
    let haive2 = new Haive(haiveInit2);
    haive.setTopLeftNeighbour(haive2);
    expect(haive.getNeighbours().topLeft).toBe(haive2);
    haive.removeTopLeftNeighbour();
    expect(haive.getNeighbours().topLeft).toBe(null);
});
test('Set and remove top right neighbour', () => {
    let haive = new Haive(haiveInit);
    let haive2 = new Haive(haiveInit2);
    haive.setTopRightNeighbour(haive2);
    expect(haive.getNeighbours().topRight).toBe(haive2);
    haive.removeTopRightNeighbour();
    expect(haive.getNeighbours().topRight).toBe(null);
});
test('Set and remove middle left neighbour', () => {
    let haive = new Haive(haiveInit);
    let haive2 = new Haive(haiveInit2);
    haive.setMiddleLeftNeighbour(haive2);
    expect(haive.getNeighbours().middleLeft).toBe(haive2);
    haive.removeMiddleLeftNeighbour();
    expect(haive.getNeighbours().middleLeft).toBe(null);
});
test('Set and remove middle right neighbour', () => {
    let haive = new Haive(haiveInit);
    let haive2 = new Haive(haiveInit2);
    haive.setMiddleRightNeighbour(haive2);
    expect(haive.getNeighbours().middleRight).toBe(haive2);
    haive.removeMiddleRightNeighbour();
    expect(haive.getNeighbours().middleRight).toBe(null);
});
test('Set and remove bottom left neighbour', () => {
    let haive = new Haive(haiveInit);
    let haive2 = new Haive(haiveInit2);
    haive.setBottomLeftNeighbour(haive2);
    expect(haive.getNeighbours().bottomLeft).toBe(haive2);
    haive.removeBottomLeftNeighbour();
    expect(haive.getNeighbours().bottomLeft).toBe(null);
});
test('Set and remove bottom right neighbour', () => {
    let haive = new Haive(haiveInit);
    let haive2 = new Haive(haiveInit2);
    haive.setBottomRightNeighbour(haive2);
    expect(haive.getNeighbours().bottomRight).toBe(haive2);
    haive.removeBottomRightNeighbour();
    expect(haive.getNeighbours().bottomRight).toBe(null);
});