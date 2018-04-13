import TestTube from "../../src/structure/Tips/TestTube";
import PipetteTip from "../../src/structure/Tips/PipetteTip";
import {TIP_TYPES, LIQUID_MAGNITUDES} from "../../const/structure";

let tipInit = {
    x: 0,
    y: 1,
    container: "NONE",
    subType: "NONE"
};

let testTube = new TestTube(tipInit);

test('TestTube initialization', () => {
    expect(testTube.getX()).toBe(tipInit.x);
    expect(testTube.getY()).toBe(tipInit.y);
    expect(testTube.getContainer()).toBe(tipInit.container);
    expect(testTube.getTipSubType()).toBe(tipInit.subType);
});

test('TestTube type', () => {
    expect(testTube.getTipType()).toBe(TIP_TYPES.TEST_TUBE);
});

let pipetteTip = new PipetteTip(tipInit);

test('PipetteTip initialization', () => {
    expect(pipetteTip.getX()).toBe(tipInit.x);
    expect(pipetteTip.getY()).toBe(tipInit.y);
    expect(pipetteTip.getContainer()).toBe(tipInit.container);
    expect(pipetteTip.getTipSubType()).toBe(tipInit.subType);
});

test('PipetteTip type', () => {
    expect(pipetteTip.getTipType()).toBe(TIP_TYPES.PIPETTE_TIP);
});

