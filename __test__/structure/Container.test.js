import Container from "../../src/structure/Containers/Container";
import {CONTAINER_POSITIONS, CONTAINER_SUBTYPES, CONTAINER_TYPES} from "../../const/structure";
import LiquidContainer from "../../src/structure/Containers/LiquidContainer";
import PipetteTipContainer from "../../src/structure/Containers/PipetteTipContainer";

let liquidContainerInit = {
    position: CONTAINER_POSITIONS.TOP_LEFT,
    subType: CONTAINER_SUBTYPES.FS6_FALCON_STAND
};

let pipetteContainerInit = {
    position: CONTAINER_POSITIONS.TOP_LEFT,
    subType: CONTAINER_SUBTYPES.P20_NORMAL_CHIP
};

let liquidContainer = new LiquidContainer(liquidContainerInit);

test('LiquidContainer initialization', () => {
    expect(liquidContainer.getContainerType()).toBe(CONTAINER_TYPES.TEST_TUBE_CONTAINER);
    expect(liquidContainer.getContainerSubType()).toBe(CONTAINER_SUBTYPES.FS6_FALCON_STAND);
});

let tipContainer = new PipetteTipContainer(pipetteContainerInit);

test('PipetteTipContainer initialization', () => {
    expect(tipContainer.getContainerType()).toBe(CONTAINER_TYPES.PIPETTE_TIP_CONTAINER);
    expect(tipContainer.getContainerSubType()).toBe(CONTAINER_SUBTYPES.P20_NORMAL_CHIP);
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

