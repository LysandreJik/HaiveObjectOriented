import Haive from "../../src/structure/Haive";
import {CONTAINER_POSITIONS, CONTAINER_SUBTYPES, HAIVE_TYPES} from "../../const/structure";
import LiquidContainer from "../../src/structure/Containers/LiquidContainer";
import State from "../../src/structure/timeline/State";

let haiveInit = {name: "Haive 1", type: HAIVE_TYPES.DISPENSER};
let haiveInit2 = {name: "Haive 2", type: HAIVE_TYPES.FREEZER};

let liquidContainerInit = {
    subType: CONTAINER_SUBTYPES.FS6_FALCON_STAND,
};
let liquidContainerInit2 = {
    subType: CONTAINER_SUBTYPES.FS6_FALCON_STAND,
};

let haive = new Haive(haiveInit);
let haive2 = new Haive(haiveInit2);
let container1 = new LiquidContainer(liquidContainerInit);
let container2 = new LiquidContainer(liquidContainerInit2);

haive.setContainer(container1, CONTAINER_POSITIONS.TOP_LEFT);
haive2.setContainer(container2, CONTAINER_POSITIONS.MIDDLE_LEFT);

let haives = [haive, haive2];
let held = null;
let copied = null;

let initialState = new State({haives:haives, held:held, copied:copied});


test('Test init', () => {
    expect(initialState.getHaives()).toBe(haives);
    expect(initialState.getHeld()).toBe(held);
    expect(initialState.getCopied()).toBe(copied);
    expect(initialState.getID()).toBe(0);
});

test('Auto increment ID', () => {
    expect(initialState.getID()).toBe(0);
    let initialState2 = new State({haives:haives, held:held, copied:copied});
    expect(initialState2.getID()).toBe(1);
    let initialState3 = new State({haives:haives, held:held, copied:copied});
    expect(initialState3.getID()).toBe(2);
});