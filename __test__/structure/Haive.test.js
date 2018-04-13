import Haive from "../../src/structure/Haive";
import {CONTAINER_POSITIONS, CONTAINER_SUBTYPES, HAIVE_TYPES} from "../../const/structure";
import LiquidContainer from "../../src/structure/Containers/LiquidContainer";

let haiveInit = {name: "Haive 1", type: HAIVE_TYPES.DISPENSER};
let haiveInit2 = {name: "Haive 2", type: HAIVE_TYPES.FREEZER};
let liquidContainerInit = {
    subType: CONTAINER_SUBTYPES.FS6_FALCON_STAND,
};
let liquidContainerInit2 = {
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
    haive.setContainer(liquidContainer, CONTAINER_POSITIONS.TOP_LEFT);
    expect(haive.getContainer(CONTAINER_POSITIONS.TOP_LEFT)).toBe(liquidContainer);
    expect(haive.getContainer(CONTAINER_POSITIONS.TOP_LEFT).getPosition()).toBe(CONTAINER_POSITIONS.TOP_LEFT);
    haive.removeContainer(CONTAINER_POSITIONS.TOP_LEFT);
    expect(haive.getContainer(CONTAINER_POSITIONS.TOP_LEFT)).toBe(null);
    expect(liquidContainer.getPosition()).toBe(null);
});
test('Set and remove top right container', () => {
    let haive = new Haive(haiveInit);
    let liquidContainer = new LiquidContainer(liquidContainerInit);
    haive.setContainer(liquidContainer, CONTAINER_POSITIONS.TOP_RIGHT);
    expect(haive.getContainer(CONTAINER_POSITIONS.TOP_RIGHT)).toBe(liquidContainer);
    expect(haive.getContainer(CONTAINER_POSITIONS.TOP_RIGHT).getPosition()).toBe(CONTAINER_POSITIONS.TOP_RIGHT);
    haive.removeContainer(CONTAINER_POSITIONS.TOP_RIGHT);
    expect(haive.getContainer(CONTAINER_POSITIONS.TOP_RIGHT)).toBe(null);
    expect(liquidContainer.getPosition()).toBe(null);
});
test('Set and remove middle left container', () => {
    let haive = new Haive(haiveInit);
    let liquidContainer = new LiquidContainer(liquidContainerInit);
    haive.setContainer(liquidContainer, CONTAINER_POSITIONS.MIDDLE_LEFT);
    expect(haive.getContainer(CONTAINER_POSITIONS.MIDDLE_LEFT)).toBe(liquidContainer);
    expect(haive.getContainer(CONTAINER_POSITIONS.MIDDLE_LEFT).getPosition()).toBe(CONTAINER_POSITIONS.MIDDLE_LEFT);
    haive.removeContainer(CONTAINER_POSITIONS.MIDDLE_LEFT);
    expect(haive.getContainer(CONTAINER_POSITIONS.MIDDLE_LEFT)).toBe(null);
    expect(liquidContainer.getPosition()).toBe(null);
});
test('Set and remove middle right container', () => {
    let haive = new Haive(haiveInit);
    let liquidContainer = new LiquidContainer(liquidContainerInit);
    haive.setContainer(liquidContainer, CONTAINER_POSITIONS.MIDDLE_RIGHT);
    expect(haive.getContainer(CONTAINER_POSITIONS.MIDDLE_RIGHT)).toBe(liquidContainer);
    expect(haive.getContainer(CONTAINER_POSITIONS.MIDDLE_RIGHT).getPosition()).toBe(CONTAINER_POSITIONS.MIDDLE_RIGHT);
    haive.removeContainer(CONTAINER_POSITIONS.MIDDLE_RIGHT);
    expect(haive.getContainer(CONTAINER_POSITIONS.MIDDLE_RIGHT)).toBe(null);
    expect(liquidContainer.getPosition()).toBe(null);
});
test('Set and remove bottom left container', () => {
    let haive = new Haive(haiveInit);
    let liquidContainer = new LiquidContainer(liquidContainerInit);
    haive.setContainer(liquidContainer, CONTAINER_POSITIONS.BOTTOM_LEFT);
    expect(haive.getContainer(CONTAINER_POSITIONS.BOTTOM_LEFT)).toBe(liquidContainer);
    expect(haive.getContainer(CONTAINER_POSITIONS.BOTTOM_LEFT).getPosition()).toBe(CONTAINER_POSITIONS.BOTTOM_LEFT);
    haive.removeContainer(CONTAINER_POSITIONS.BOTTOM_LEFT);
    expect(haive.getContainer(CONTAINER_POSITIONS.BOTTOM_LEFT)).toBe(null);
    expect(liquidContainer.getPosition()).toBe(null);
});
test('Set and remove bottom right container', () => {
    let haive = new Haive(haiveInit);
    let liquidContainer = new LiquidContainer(liquidContainerInit);
    haive.setContainer(liquidContainer, CONTAINER_POSITIONS.BOTTOM_RIGHT);
    expect(haive.getContainer(CONTAINER_POSITIONS.BOTTOM_RIGHT)).toBe(liquidContainer);
    expect(haive.getContainer(CONTAINER_POSITIONS.BOTTOM_RIGHT).getPosition()).toBe(CONTAINER_POSITIONS.BOTTOM_RIGHT);
    haive.removeContainer(CONTAINER_POSITIONS.BOTTOM_RIGHT);
    expect(haive.getContainer(CONTAINER_POSITIONS.BOTTOM_RIGHT)).toBe(null);
    expect(liquidContainer.getPosition()).toBe(null);
});

//SET AND REMOVAL OF NEIGHBOURS
test('Set and remove top left neighbour', () => {
    let haive = new Haive(haiveInit);
    let haive2 = new Haive(haiveInit2);
    haive.setNeighbour(haive2, CONTAINER_POSITIONS.TOP_LEFT);
    expect(haive.getNeighbour(CONTAINER_POSITIONS.TOP_LEFT)).toBe(haive2);
    haive.setNeighbour(null, CONTAINER_POSITIONS.TOP_LEFT);
    expect(haive.getNeighbour(CONTAINER_POSITIONS.TOP_RIGHT)).toBe(null);
});
test('Set and remove top right neighbour', () => {
    let haive = new Haive(haiveInit);
    let haive2 = new Haive(haiveInit2);
    haive.setNeighbour(haive2, CONTAINER_POSITIONS.TOP_RIGHT);
    expect(haive.getNeighbour(CONTAINER_POSITIONS.TOP_RIGHT)).toBe(haive2);
    haive.setNeighbour(null, CONTAINER_POSITIONS.TOP_RIGHT);
    expect(haive.getNeighbour(CONTAINER_POSITIONS.TOP_RIGHT)).toBe(null);
});
test('Set and remove middle left neighbour', () => {
    let haive = new Haive(haiveInit);
    let haive2 = new Haive(haiveInit2);
    haive.setNeighbour(haive2, CONTAINER_POSITIONS.MIDDLE_LEFT);
    expect(haive.getNeighbour(CONTAINER_POSITIONS.MIDDLE_LEFT)).toBe(haive2);
    haive.setNeighbour(null, CONTAINER_POSITIONS.MIDDLE_LEFT);
    expect(haive.getNeighbour(CONTAINER_POSITIONS.MIDDLE_LEFT)).toBe(null);
});
test('Set and remove middle right neighbour', () => {
    let haive = new Haive(haiveInit);
    let haive2 = new Haive(haiveInit2);
    haive.setNeighbour(haive2, CONTAINER_POSITIONS.MIDDLE_RIGHT);
    expect(haive.getNeighbour(CONTAINER_POSITIONS.MIDDLE_RIGHT)).toBe(haive2);
    haive.setNeighbour(null, CONTAINER_POSITIONS.MIDDLE_RIGHT);
    expect(haive.getNeighbour(CONTAINER_POSITIONS.MIDDLE_RIGHT)).toBe(null);
});
test('Set and remove bottom left neighbour', () => {
    let haive = new Haive(haiveInit);
    let haive2 = new Haive(haiveInit2);
    haive.setNeighbour(haive2, CONTAINER_POSITIONS.BOTTOM_LEFT);
    expect(haive.getNeighbour(CONTAINER_POSITIONS.BOTTOM_LEFT)).toBe(haive2);
    haive.setNeighbour(null, CONTAINER_POSITIONS.BOTTOM_LEFT);
    expect(haive.getNeighbour(CONTAINER_POSITIONS.BOTTOM_LEFT)).toBe(null);
});
test('Set and remove bottom right neighbour', () => {
    let haive = new Haive(haiveInit);
    let haive2 = new Haive(haiveInit2);
    haive.setNeighbour(haive2, CONTAINER_POSITIONS.BOTTOM_RIGHT);
    expect(haive.getNeighbour(CONTAINER_POSITIONS.BOTTOM_RIGHT)).toBe(haive2);
    haive.setNeighbour(null, CONTAINER_POSITIONS.BOTTOM_RIGHT);
    expect(haive.getNeighbour(CONTAINER_POSITIONS.BOTTOM_RIGHT)).toBe(null);
});

//SWITCH CONTAINERS
test('Switching containers', () => {
    let haive = new Haive(haiveInit);

});