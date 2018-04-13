import Container from "../../src/structure/Containers/Container";
import {CONTAINER_POSITIONS, CONTAINER_SUBTYPES, CONTAINER_TYPES, TIP_TYPES} from "../../const/structure";
import LiquidContainer from "../../src/structure/Containers/LiquidContainer";
import PipetteTipContainer from "../../src/structure/Containers/PipetteTipContainer";
import TestTube from "../../src/structure/Tips/TestTube";
import PipetteTip from "../../src/structure/Tips/PipetteTip";

let liquidContainerInit = {
    position: CONTAINER_POSITIONS.TOP_LEFT,
    subType: CONTAINER_SUBTYPES.FS6_FALCON_STAND,
};

let pipetteContainerInit = {
    position: CONTAINER_POSITIONS.TOP_LEFT,
    subType: CONTAINER_SUBTYPES.P20_NORMAL_CHIP
};

let liquidContainer = new LiquidContainer(liquidContainerInit);

test('LiquidContainer initialization', () => {
    expect(liquidContainer.getContainerType()).toBe(CONTAINER_TYPES.TEST_TUBE_CONTAINER);
    expect(liquidContainer.getContainerSubType()).toBe(CONTAINER_SUBTYPES.FS6_FALCON_STAND);
    expect(liquidContainer.getWidth()).toBe(CONTAINER_SUBTYPES.FS6_FALCON_STAND.width);
    expect(liquidContainer.getHeight()).toBe(CONTAINER_SUBTYPES.FS6_FALCON_STAND.height);
});

test('Tip initialization for the LiquidContainer', () => {
    expect(liquidContainer.getTips().length).toBe(CONTAINER_SUBTYPES.FS6_FALCON_STAND.width);
    expect(liquidContainer.getTips()[0].length).toBe(CONTAINER_SUBTYPES.FS6_FALCON_STAND.height);
    expect(liquidContainer.getTips()[0][0].getTipType()).toBe(TIP_TYPES.TEST_TUBE);
});

let tipContainer = new PipetteTipContainer(pipetteContainerInit);

test('PipetteTipContainer initialization', () => {
    expect(tipContainer.getContainerType()).toBe(CONTAINER_TYPES.PIPETTE_TIP_CONTAINER);
    expect(tipContainer.getContainerSubType()).toBe(CONTAINER_SUBTYPES.P20_NORMAL_CHIP);
    expect(tipContainer.getWidth()).toBe(CONTAINER_SUBTYPES.P20_NORMAL_CHIP.width);
    expect(tipContainer.getHeight()).toBe(CONTAINER_SUBTYPES.P20_NORMAL_CHIP.height);
});

test('Tip initialization for the PipetteTipContainer', () => {
    expect(tipContainer.getTips().length).toBe(CONTAINER_SUBTYPES.P20_NORMAL_CHIP.width);
    expect(tipContainer.getTips()[0].length).toBe(CONTAINER_SUBTYPES.P20_NORMAL_CHIP.height);
    expect(tipContainer.getTips()[0][0].getTipType()).toBe(TIP_TYPES.PIPETTE_TIP);
});

test('LiquidContainer wrong initialization', () => {
    expect(() => {
        new LiquidContainer(pipetteContainerInit);
    }).toThrow();
});

test('PipetteTipContainer wrong initialization', () => {
    expect(() => {
        new PipetteTipContainer(liquidContainerInit);
    }).toThrow();
});

test('Expect id of the first container to be 0.', () => {
    expect(liquidContainer.getID()).toBe(0);
});

test('Expect id of the second container to be 1.', () => {
    expect(tipContainer.getID()).toBe(1);
});

test('Expect id of the created containers to be incremented', () => {
    let id = new PipetteTipContainer(pipetteContainerInit).getID();
    expect(new PipetteTipContainer(pipetteContainerInit).getID()).toBe(id+1);
    expect(new LiquidContainer(liquidContainerInit).getID()).toBe(id+2);
    expect(new PipetteTipContainer(pipetteContainerInit).getID()).toBe(id+3);
    expect(new LiquidContainer(liquidContainerInit).getID()).toBe(id+4);
});

test('Available tips returns correct sized array at initialization.', () => {
    expect(liquidContainer.getAvailableTips().every(function(tip){return tip instanceof TestTube})).toBe(true);
    expect(tipContainer.getAvailableTips().every(function(tip){return tip instanceof PipetteTip})).toBe(true);
    expect(liquidContainer.getAvailableTips().length).toBe(liquidContainer.getWidth()*liquidContainer.getHeight());
    expect(tipContainer.getAvailableTips().length).toBe(tipContainer.getWidth()*tipContainer.getHeight());
});

test('Booking a tip from the containers', () => {
    let liquidTip = liquidContainer.bookTip();
    let pipetteTip = tipContainer.bookTip();
    expect(liquidContainer.getAvailableTips().length).toBe(liquidContainer.getWidth()*liquidContainer.getHeight()-1);
    expect(tipContainer.getAvailableTips().length).toBe(tipContainer.getWidth()*tipContainer.getHeight()-1);
    expect(liquidTip.isAvailable()).toBe(false);
    expect(pipetteTip.isAvailable()).toBe(false);
    liquidTip.unbook();
    pipetteTip.unbook();
    expect(liquidContainer.getAvailableTips().length).toBe(liquidContainer.getWidth()*liquidContainer.getHeight());
    expect(tipContainer.getAvailableTips().length).toBe(tipContainer.getWidth()*tipContainer.getHeight());
    expect(liquidTip.isAvailable()).toBe(true);
    expect(pipetteTip.isAvailable()).toBe(true);
});