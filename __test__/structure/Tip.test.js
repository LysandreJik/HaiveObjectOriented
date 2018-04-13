import TestTube from "../../src/structure/Tips/TestTube";
import PipetteTip from "../../src/structure/Tips/PipetteTip";
import {TIP_TYPES, LIQUID_MAGNITUDES} from "../../const/structure";
import PipetteTipContainer from "../../src/structure/Containers/PipetteTipContainer";

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

test('TestTube type.', () => {
    expect(testTube.getTipType()).toBe(TIP_TYPES.TEST_TUBE);
});

test('TestTube is empty at init.', () => {
    expect(testTube.getContents().liquid).toBe("NONE");
    expect(testTube.getContents().quantity).toBe(0);
    expect(testTube.getContents().magnitude).toBe(LIQUID_MAGNITUDES.uL);
});





let pipetteTip = new PipetteTip(tipInit);

test('PipetteTip initialization.', () => {
    expect(pipetteTip.getX()).toBe(tipInit.x);
    expect(pipetteTip.getY()).toBe(tipInit.y);
    expect(pipetteTip.getContainer()).toBe(tipInit.container);
    expect(pipetteTip.getTipSubType()).toBe(tipInit.subType);
});

test('PipetteTip type.', () => {
    expect(pipetteTip.getTipType()).toBe(TIP_TYPES.PIPETTE_TIP);
});

test('PipetteTip is not held at init.', () => {
    expect(pipetteTip.isHeld()).toBe(false);
});

test('PipetteTip throws error when it does not contain anything and getContents() is called.', () => {
    expect(() => {
        pipetteTip.getContents()
    }).toThrow();
});


test('PipetteTip is held when the hold() method is called.', () => {
    pipetteTip.hold();
    expect(pipetteTip.isHeld()).toBe(true);
});

test('Held PipetteTip is empty at init.', () => {
    expect(pipetteTip.getContents().liquid).toBe("NONE");
    expect(pipetteTip.getContents().quantity).toBe(0);
    expect(pipetteTip.getContents().magnitude).toBe(LIQUID_MAGNITUDES.uL);
});



test('PipetteTip is not held when the release() method is called.', () => {
    pipetteTip.release();
    expect(pipetteTip.isHeld()).toBe(false);
});

test('PipetteTip throws error when the release() method has been called and the getContents() method is called.', () => {
    expect(() => {
        pipetteTip.getContents()
    }).toThrow();
});