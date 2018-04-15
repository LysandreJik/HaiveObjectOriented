import Haive from "../../src/structure/Haive";
import {CONTAINER_POSITIONS, CONTAINER_SUBTYPES, HAIVE_TYPES} from "../../const/structure";
import LiquidContainer from "../../src/structure/Containers/LiquidContainer";
import PipetteTipContainer from "../../src/structure/Containers/PipetteTipContainer";

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
    let container1 = new PipetteTipContainer({subType: CONTAINER_SUBTYPES.P20_NORMAL_CHIP});
    let id1 = container1.getID();
    let container2 = new PipetteTipContainer({subType: CONTAINER_SUBTYPES.P20_NORMAL_CHIP});
    let id2 = container2.getID();

    haive.setContainer(container1, CONTAINER_POSITIONS.BOTTOM_RIGHT);
    haive.setContainer(container2, CONTAINER_POSITIONS.TOP_LEFT);
    haive.switchContainers(CONTAINER_POSITIONS.BOTTOM_RIGHT, CONTAINER_POSITIONS.TOP_LEFT);
    expect(haive.getContainer(CONTAINER_POSITIONS.BOTTOM_RIGHT).getID()).toBe(id2);
    expect(haive.getContainer(CONTAINER_POSITIONS.TOP_LEFT).getID()).toBe(id1);
});


//GET CLONE TEST
test("Clone creation", () => {
    let haive = new Haive(haiveInit);
    haive.setContainer(new PipetteTipContainer({position: CONTAINER_POSITIONS.TOP_LEFT,subType: CONTAINER_SUBTYPES.P20_NORMAL_CHIP}), CONTAINER_POSITIONS.TOP_LEFT);
    haive.setContainer(new PipetteTipContainer({position: CONTAINER_POSITIONS.TOP_RIGHT,subType: CONTAINER_SUBTYPES.P20_NORMAL_CHIP}), CONTAINER_POSITIONS.TOP_RIGHT);
    haive.setContainer(new PipetteTipContainer({position: CONTAINER_POSITIONS.MIDDLE_LEFT,subType: CONTAINER_SUBTYPES.P20_NORMAL_CHIP}), CONTAINER_POSITIONS.MIDDLE_LEFT);
    haive.setContainer(new PipetteTipContainer({position: CONTAINER_POSITIONS.MIDDLE_RIGHT,subType: CONTAINER_SUBTYPES.P20_NORMAL_CHIP}), CONTAINER_POSITIONS.MIDDLE_RIGHT);
    haive.setContainer(new PipetteTipContainer({position: CONTAINER_POSITIONS.BOTTOM_LEFT,subType: CONTAINER_SUBTYPES.P20_NORMAL_CHIP}), CONTAINER_POSITIONS.BOTTOM_LEFT);
    haive.setContainer(new PipetteTipContainer({position: CONTAINER_POSITIONS.BOTTOM_RIGHT,subType: CONTAINER_SUBTYPES.P20_NORMAL_CHIP}), CONTAINER_POSITIONS.BOTTOM_RIGHT);
    let haiveClone = haive.getClone();
    expect(haiveClone.getName()).toBe(haiveInit.name);
    expect(haiveClone.getType()).toBe(haiveInit.type);
    expect(haiveClone.getContainer(CONTAINER_POSITIONS.TOP_LEFT).getID()).toBe(haive.getContainer(CONTAINER_POSITIONS.TOP_LEFT).getID());
    expect(haiveClone.getContainer(CONTAINER_POSITIONS.TOP_RIGHT).getID()).toBe(haive.getContainer(CONTAINER_POSITIONS.TOP_RIGHT).getID());
    expect(haiveClone.getContainer(CONTAINER_POSITIONS.MIDDLE_LEFT).getID()).toBe(haive.getContainer(CONTAINER_POSITIONS.MIDDLE_LEFT).getID());
    expect(haiveClone.getContainer(CONTAINER_POSITIONS.MIDDLE_RIGHT).getID()).toBe(haive.getContainer(CONTAINER_POSITIONS.MIDDLE_RIGHT).getID());
    expect(haiveClone.getContainer(CONTAINER_POSITIONS.BOTTOM_LEFT).getID()).toBe(haive.getContainer(CONTAINER_POSITIONS.BOTTOM_LEFT).getID());
    expect(haiveClone.getContainer(CONTAINER_POSITIONS.BOTTOM_RIGHT).getID()).toBe(haive.getContainer(CONTAINER_POSITIONS.BOTTOM_RIGHT).getID());
});

//TODO TEST IMMUTABILITY OF HAIVE GET CLONE METHOD











