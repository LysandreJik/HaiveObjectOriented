import TestTube from "../../src/structure/tips/TestTube";
import PipetteTip from "../../src/structure/tips/PipetteTip";
import {TIP_TYPES, LIQUID_MAGNITUDES} from "../../const/structure";
import PipetteTipContainer from "../../src/structure/containers/PipetteTipContainer";

let tipInit = {
    x: 0,
    y: 1,
    container: "NONE"
};

let testTube = new TestTube(tipInit);
let pipetteTip = new PipetteTip(tipInit);

//INITIALIZATION
test('TestTube initialization', () => {
    expect(testTube.getX()).toBe(tipInit.x);
    expect(testTube.getY()).toBe(tipInit.y);
    expect(testTube.getContainer()).toBe(tipInit.container);
});
test('TestTube type.', () => {
    expect(testTube.getTipType()).toBe(TIP_TYPES.TEST_TUBE);
});
test('TestTube is empty at init.', () => {
    expect(testTube.getContents().liquid).toBe("NONE");
    expect(testTube.getContents().quantity).toBe(0);
    expect(testTube.getContents().magnitude).toBe(LIQUID_MAGNITUDES.uL);
});
test('PipetteTip initialization.', () => {
    expect(pipetteTip.getX()).toBe(tipInit.x);
    expect(pipetteTip.getY()).toBe(tipInit.y);
    expect(pipetteTip.getContainer()).toBe(tipInit.container);
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

//HELD TIPS
test('PipetteTip is held when the hold() method is called.', () => {
    pipetteTip.book();
    pipetteTip.hold();
    expect(pipetteTip.isHeld()).toBe(true);
    pipetteTip.unbook();
});
test('Held PipetteTip is empty at init.', () => {
    pipetteTip.book();
    expect(pipetteTip.getContents().liquid).toBe("NONE");
    expect(pipetteTip.getContents().quantity).toBe(0);
    expect(pipetteTip.getContents().magnitude).toBe(LIQUID_MAGNITUDES.uL);
    pipetteTip.unbook();
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

//TIP AVAILABILITY
test('Availability of tip at initialization.', () => {
    expect(pipetteTip.isAvailable()).toBe(true);
    expect(testTube.isAvailable()).toBe(true);
});
test('Unavailability of tip after booking it.', () => {
    pipetteTip.book();
    testTube.book();
    expect(pipetteTip.isAvailable()).toBe(false);
    expect(testTube.isAvailable()).toBe(false);
});
test('Availability of tip after unbooking it.', () => {
    pipetteTip.unbook();
    testTube.unbook();
    expect(pipetteTip.isAvailable()).toBe(true);
    expect(testTube.isAvailable()).toBe(true);
});

//ADDING LIQUIDS
test('Adding liquid to empty tip but available tip throws error: the tip needs to be booked.', () => {
    expect(() => {
        pipetteTip.addLiquid({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    }).toThrow();
    expect(() => {
        pipetteTip.addLiquid({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    }).toThrow();
});
test('Adding liquid to empty, dirty and booked tip throws error: should be clean.', () => {
    pipetteTip.book();
    testTube.book();
    pipetteTip.dirty();
    testTube.dirty();
    expect(() => {
        pipetteTip.addLiquid({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    }).toThrow();
    expect(() => {
        testTube.addLiquid({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    }).toThrow();
    pipetteTip.clean()
    testTube.clean();
    pipetteTip.unbook();
    testTube.unbook();

});
test('Adding liquid to empty, clean and booked tip', () => {
    pipetteTip.book();
    testTube.book();
    pipetteTip.hold();
    pipetteTip.addLiquid({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    testTube.addLiquid({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    expect(pipetteTip.getContents().liquid).toBe("DNA sample");
    expect(pipetteTip.getContents().quantity).toBe(2);
    expect(pipetteTip.getContents().magnitude).toBe(LIQUID_MAGNITUDES.uL);
    expect(testTube.getContents().liquid).toBe("DNA sample");
    expect(testTube.getContents().quantity).toBe(2);
    expect(testTube.getContents().magnitude).toBe(LIQUID_MAGNITUDES.uL);
});
test('Adding liquid to tip already containing liquid throws error', () => {
    expect(() => {
        pipetteTip.addLiquid({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    }).toThrow();
    expect(() => {
        testTube.addLiquid({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    }).toThrow();

});
test("Adding liquid to a pipetteTip while the tip is not held throws an error", () => {
    let pipetteTip = new PipetteTip(tipInit);
    pipetteTip.book();
    expect(() => {
        pipetteTip.addLiquid({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    }).toThrow();
});

//MERGING LIQUIDS
test("Merging liquid when there isn't any liquid and the tip is clean throws an error", () => {
    let testTube = new TestTube(tipInit);
    let pipetteTip = new PipetteTip(tipInit);
    expect(() => {
        pipetteTip.mergeLiquidInTip({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    }).toThrow();
    expect(() => {
        testTube.mergeLiquidInTip({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    }).toThrow();
});
test("Merging liquid when there isn't any liquid but the tip is dirty accepts the liquid", () => {
    let testTube = new TestTube(tipInit);
    let pipetteTip = new PipetteTip(tipInit);
    testTube.dirty();
    pipetteTip.dirty();
    testTube.book();
    pipetteTip.book();
    pipetteTip.hold();
    pipetteTip.mergeLiquidInTip({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    expect(pipetteTip.getContents().liquid).toBe("DNA sample");
    expect(pipetteTip.getContents().quantity).toBe(2);
    expect(pipetteTip.getContents().magnitude).toBe(LIQUID_MAGNITUDES.uL);
    testTube.mergeLiquidInTip({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    expect(testTube.getContents().liquid).toBe("DNA sample");
    expect(testTube.getContents().quantity).toBe(2);
    expect(testTube.getContents().magnitude).toBe(LIQUID_MAGNITUDES.uL);
});
test("Merging liquid when the tip is available throws an error.", () => {
    let testTube = new TestTube(tipInit);
    let pipetteTip = new PipetteTip(tipInit);
    testTube.dirty();
    pipetteTip.dirty();
    expect(() => {
        pipetteTip.mergeLiquidInTip({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    }).toThrow();
    expect(() => {
        testTube.mergeLiquidInTip({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    }).toThrow();
});
test("Merging liquid with new liquid adds to the quantity. No name is specified so the initial name is kept.", () => {
    let testTube = new TestTube(tipInit);
    let pipetteTip = new PipetteTip(tipInit);
    pipetteTip.book();
    pipetteTip.hold();
    testTube.book();
    pipetteTip.addLiquid({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    testTube.addLiquid({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    pipetteTip.mergeLiquidInTip({liquid: "DNA sample2", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    expect(pipetteTip.getContents().liquid).toBe("DNA sample2");
    testTube.mergeLiquidInTip({liquid: "DNA sample2", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    expect(testTube.getContents().liquid).toBe("DNA sample2");
});
test("Merging liquid with new liquid adds to the quantity. A name is specified so the liquid takes the name.", () => {
    let testTube = new TestTube(tipInit);
    let pipetteTip = new PipetteTip(tipInit);
    pipetteTip.book();
    pipetteTip.hold();
    testTube.book();
    pipetteTip.addLiquid({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    testTube.addLiquid({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    pipetteTip.mergeLiquidInTip({liquid: "DNA sample2", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL}, "liquid name");
    expect(pipetteTip.getContents().liquid).toBe("liquid name");
    testTube.mergeLiquidInTip({liquid: "DNA sample2", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL}, "liquid name2");
    expect(testTube.getContents().liquid).toBe("liquid name2");
});
test("Liquid merge with initial liquid in uL and added liquid in uL", () => {
    let testTube = new TestTube(tipInit);
    let pipetteTip = new PipetteTip(tipInit);
    pipetteTip.book();
    pipetteTip.hold();
    testTube.book();
    pipetteTip.addLiquid({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    testTube.addLiquid({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    pipetteTip.mergeLiquidInTip({liquid: "DNA sample2", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL}, "liquid name");
    testTube.mergeLiquidInTip({liquid: "DNA sample2", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL}, "liquid name2");

    expect(testTube.getContents().quantity).toBe(4);
    expect(testTube.getContents().magnitude).toBe(LIQUID_MAGNITUDES.uL);
    expect(testTube.getContents().quantity).toBe(4);
    expect(testTube.getContents().magnitude).toBe(LIQUID_MAGNITUDES.uL);
});
test("Liquid merge with initial liquid in uL and added liquid in mL", () => {
    let testTube = new TestTube(tipInit);
    let pipetteTip = new PipetteTip(tipInit);
    pipetteTip.book();
    pipetteTip.hold();
    testTube.book();
    pipetteTip.addLiquid({liquid: "DNA sample", quantity: 3, magnitude: LIQUID_MAGNITUDES.uL});
    testTube.addLiquid({liquid: "DNA sample", quantity: 3, magnitude: LIQUID_MAGNITUDES.uL});
    pipetteTip.mergeLiquidInTip({liquid: "DNA sample2", quantity: 2, magnitude: LIQUID_MAGNITUDES.mL}, "liquid name");
    testTube.mergeLiquidInTip({liquid: "DNA sample2", quantity: 2, magnitude: LIQUID_MAGNITUDES.mL}, "liquid name2");

    expect(testTube.getContents().quantity).toBe(2003);
    expect(testTube.getContents().magnitude).toBe(LIQUID_MAGNITUDES.uL);
    expect(testTube.getContents().quantity).toBe(2003);
    expect(testTube.getContents().magnitude).toBe(LIQUID_MAGNITUDES.uL);
});
test("Liquid merge with initial liquid in mL and added liquid in uL", () => {
    let testTube = new TestTube(tipInit);
    let pipetteTip = new PipetteTip(tipInit);
    pipetteTip.book();
    pipetteTip.hold();
    testTube.book();
    pipetteTip.addLiquid({liquid: "DNA sample", quantity: 3, magnitude: LIQUID_MAGNITUDES.mL});
    testTube.addLiquid({liquid: "DNA sample", quantity: 3, magnitude: LIQUID_MAGNITUDES.mL});
    pipetteTip.mergeLiquidInTip({liquid: "DNA sample2", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL}, "liquid name");
    testTube.mergeLiquidInTip({liquid: "DNA sample2", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL}, "liquid name2");

    expect(testTube.getContents().quantity).toBe(3002);
    expect(testTube.getContents().magnitude).toBe(LIQUID_MAGNITUDES.uL);
    expect(testTube.getContents().quantity).toBe(3002);
    expect(testTube.getContents().magnitude).toBe(LIQUID_MAGNITUDES.uL);
});
test("Liquid merge with initial liquid in mL and added liquid in mL", () => {
    let testTube = new TestTube(tipInit);
    let pipetteTip = new PipetteTip(tipInit);
    pipetteTip.book();
    pipetteTip.hold();
    testTube.book();
    pipetteTip.addLiquid({liquid: "DNA sample", quantity: 3, magnitude: LIQUID_MAGNITUDES.mL});
    testTube.addLiquid({liquid: "DNA sample", quantity: 3, magnitude: LIQUID_MAGNITUDES.mL});
    pipetteTip.mergeLiquidInTip({liquid: "DNA sample2", quantity: 2, magnitude: LIQUID_MAGNITUDES.mL}, "liquid name");
    testTube.mergeLiquidInTip({liquid: "DNA sample2", quantity: 2, magnitude: LIQUID_MAGNITUDES.mL}, "liquid name2");

    expect(testTube.getContents().quantity).toBe(5000);
    expect(testTube.getContents().magnitude).toBe(LIQUID_MAGNITUDES.uL);
    expect(testTube.getContents().quantity).toBe(5000);
    expect(testTube.getContents().magnitude).toBe(LIQUID_MAGNITUDES.uL);
});
test("Merging liquid with a pipetteTip while the tip is not held throws an error", () => {
    let pipetteTip = new PipetteTip(tipInit);
    pipetteTip.book();
    pipetteTip.hold();
    pipetteTip.addLiquid({liquid: "DNA sample", quantity: 3, magnitude: LIQUID_MAGNITUDES.mL});
    expect(() => {
        pipetteTip.release();
        pipetteTip.mergeLiquidInTip({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    }).toThrow();
});

//REMOVING LIQUIDS
test("Trying to remove liquid from an unheld pipette tip throws an error", () => {
    let pipetteTip = new PipetteTip(tipInit);
    pipetteTip.book();
    expect(() => {
        pipetteTip.removeLiquid({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    }).toThrow();
});
test("Trying to remove liquid if there is no liquid throws an error.", () => {
    let testTube = new TestTube(tipInit);
    let pipetteTip = new PipetteTip(tipInit);
    pipetteTip.book();
    testTube.book();
    pipetteTip.hold();
    expect(() => {
        pipetteTip.removeLiquid({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    }).toThrow();
    expect(() => {
        testTube.removeLiquid({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    }).toThrow();
});
test("Trying to remove liquid from an available tip throws an error.", () => {
    let testTube = new TestTube(tipInit);
    let pipetteTip = new PipetteTip(tipInit);
    testTube.book();
    pipetteTip.book();
    pipetteTip.hold();
    pipetteTip.addLiquid({liquid: "DNA sample", quantity: 3, magnitude: LIQUID_MAGNITUDES.mL});
    testTube.addLiquid({liquid: "DNA sample", quantity: 3, magnitude: LIQUID_MAGNITUDES.mL});
    testTube.unbook();
    pipetteTip.unbook();
    expect(() => {
        pipetteTip.removeLiquid({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    }).toThrow();
    expect(() => {
        testTube.removeLiquid({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.uL});
    }).toThrow();
});
test("Trying to remove too much uL from uL", () => {
    let testTube = new TestTube(tipInit);
    let pipetteTip = new PipetteTip(tipInit);
    testTube.book();
    pipetteTip.book();
    pipetteTip.hold();
    pipetteTip.addLiquid({liquid: "DNA sample", quantity: 3, magnitude: LIQUID_MAGNITUDES.uL});
    testTube.addLiquid({liquid: "DNA sample", quantity: 3, magnitude: LIQUID_MAGNITUDES.uL});
    expect(() => {
        pipetteTip.removeLiquid({liquid: "DNA sample", quantity: 5, magnitude: LIQUID_MAGNITUDES.uL});
    }).toThrow();
    expect(() => {
        testTube.removeLiquid({liquid: "DNA sample", quantity: 10, magnitude: LIQUID_MAGNITUDES.uL});
    }).toThrow();
});
test("Trying to remove too much uL from mL", () => {
    let testTube = new TestTube(tipInit);
    let pipetteTip = new PipetteTip(tipInit);
    testTube.book();
    pipetteTip.book();
    pipetteTip.hold();
    pipetteTip.addLiquid({liquid: "DNA sample", quantity: 3, magnitude: LIQUID_MAGNITUDES.mL});
    testTube.addLiquid({liquid: "DNA sample", quantity: 3, magnitude: LIQUID_MAGNITUDES.mL});
    expect(() => {
        pipetteTip.removeLiquid({liquid: "DNA sample", quantity: 3500, magnitude: LIQUID_MAGNITUDES.uL});
    }).toThrow();
    expect(() => {
        testTube.removeLiquid({liquid: "DNA sample", quantity: 3200, magnitude: LIQUID_MAGNITUDES.uL});
    }).toThrow();
});
test("Trying to remove too much mL from uL", () => {
    let testTube = new TestTube(tipInit);
    let pipetteTip = new PipetteTip(tipInit);
    testTube.book();
    pipetteTip.book();
    pipetteTip.hold();
    pipetteTip.addLiquid({liquid: "DNA sample", quantity: 1, magnitude: LIQUID_MAGNITUDES.uL});
    testTube.addLiquid({liquid: "DNA sample", quantity: 3, magnitude: LIQUID_MAGNITUDES.uL});
    expect(() => {
        pipetteTip.removeLiquid({liquid: "DNA sample", quantity: 2, magnitude: LIQUID_MAGNITUDES.mL});
    }).toThrow();
    expect(() => {
        testTube.removeLiquid({liquid: "DNA sample", quantity: 4, magnitude: LIQUID_MAGNITUDES.mL});
    }).toThrow();
});
test("Trying to remove too much mL from mL", () => {
    let testTube = new TestTube(tipInit);
    let pipetteTip = new PipetteTip(tipInit);
    testTube.book();
    pipetteTip.book();
    pipetteTip.hold();
    pipetteTip.addLiquid({liquid: "DNA sample", quantity: 3, magnitude: LIQUID_MAGNITUDES.mL});
    testTube.addLiquid({liquid: "DNA sample", quantity: 3, magnitude: LIQUID_MAGNITUDES.mL});
    expect(() => {
        pipetteTip.removeLiquid({liquid: "DNA sample", quantity: 5, magnitude: LIQUID_MAGNITUDES.mL});
    }).toThrow();
    expect(() => {
        testTube.removeLiquid({liquid: "DNA sample", quantity: 5, magnitude: LIQUID_MAGNITUDES.mL});
    }).toThrow();
});

//GET CLONE METHOD
test("Clone creation", () => {
    let pipetteTip = new PipetteTip(tipInit).getClone();
    expect(pipetteTip.getX()).toBe(tipInit.x);
    expect(pipetteTip.getY()).toBe(tipInit.y);
    expect(pipetteTip.getContainer()).toBe(tipInit.container);
    expect(pipetteTip.isDirty()).toBe(false);
    expect(pipetteTip.isAvailable()).toBe(true);
    pipetteTip.book();
    pipetteTip.hold();
    expect(pipetteTip.getContents().liquid).toBe("NONE");
    expect(pipetteTip.getContents().quantity).toBe(0);
    expect(pipetteTip.getContents().magnitude).toBe(LIQUID_MAGNITUDES.uL);
});
test("Immutability", () => {
    let pipetteTip = new PipetteTip(tipInit);
    let pipetteTipClone = pipetteTip.getClone();

    pipetteTipClone._x = 5;
    expect(pipetteTip.getX()).toBe(tipInit.x);
    expect(pipetteTipClone.getX()).toBe(5);

    pipetteTipClone._y = 8;
    expect(pipetteTip.getY()).toBe(tipInit.y);
    expect(pipetteTipClone.getY()).toBe(8);

    pipetteTipClone._container = "RANDOM CONTAINER";
    expect(pipetteTip.getContainer()).toBe(tipInit.container);
    expect(pipetteTipClone.getContainer()).toBe("RANDOM CONTAINER");

    pipetteTipClone._dirty = true;
    expect(pipetteTip.isDirty()).toBe(false);
    expect(pipetteTipClone.isDirty()).toBe(true);

    pipetteTipClone.book();
    expect(pipetteTip.isAvailable()).toBe(true);
    expect(pipetteTipClone.isAvailable()).toBe(false);

    pipetteTipClone._contents = {liquid: "NO LIQUID YET", quantity: 5, magnitude: LIQUID_MAGNITUDES.mL};
    pipetteTip.book();
    pipetteTip.hold();
    pipetteTipClone.hold();
    expect(pipetteTip.getContents().liquid).toBe("NONE");
    expect(pipetteTip.getContents().quantity).toBe(0);
    expect(pipetteTip.getContents().magnitude).toBe(LIQUID_MAGNITUDES.uL);
    expect(pipetteTipClone.getContents().liquid).toBe("NO LIQUID YET");
    expect(pipetteTipClone.getContents().quantity).toBe(5);
    expect(pipetteTipClone.getContents().magnitude).toBe(LIQUID_MAGNITUDES.mL);
});



