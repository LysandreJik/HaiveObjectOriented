export const TIP_TYPES = {
    PIPETTE_TIP: 0,
    TEST_TUBE: 1
};

export const LIQUID_MAGNITUDES = {
    uL: 0,
    mL: 1
};

export const CONTAINER_POSITIONS = {
    TOP_LEFT: 0,
    MIDDLE_LEFT: 1,
    BOTTOM_LEFT: 2,
    TOP_RIGHT: 3,
    MIDDLE_RIGHT: 4,
    BOTTOM_RIGHT: 5
};

export const CONTAINER_TYPES = {
    PIPETTE_TIP_CONTAINER: 0,
    TEST_TUBE_CONTAINER: 1
};

export const CONTAINER_SUBTYPES = {
    P1000_NORMAL_CHIP: {name: "P1000 normal chip", containerType: CONTAINER_TYPES.PIPETTE_TIP_CONTAINER, width: 8, height: 12},
    P1000_LONG_CHIP: {name: "P1000 long chip", containerType: CONTAINER_TYPES.PIPETTE_TIP_CONTAINER, width: 8, height: 12},
    P20_NORMAL_CHIP: {name: "P20 normal chip", containerType: CONTAINER_TYPES.PIPETTE_TIP_CONTAINER, width: 8, height: 12},
    P200_NORMAL_CHIP: {name: "P200 normal chip", containerType: CONTAINER_TYPES.PIPETTE_TIP_CONTAINER, width: 8, height: 12},

    ST15_SCREW_TUBES: {name: "15 screw tubes", containerType: CONTAINER_TYPES.TEST_TUBE_CONTAINER, width: 3, height: 5},
    FS6_FALCON_STAND: {name: "6 falcon stand", containerType: CONTAINER_TYPES.TEST_TUBE_CONTAINER, width: 2, height: 3},
    MB_20_MAGNETIC_BEADS: {name: "20 magnetic beads", containerType: CONTAINER_TYPES.TEST_TUBE_CONTAINER, width: 4, height: 5},
    MP96_MICRO_PLATE: {name: "96 micro plate", containerType: CONTAINER_TYPES.TEST_TUBE_CONTAINER, width: 8, height: 12},
    MP24_MICRO_PLATE: {name: "24 micro plate", containerType: CONTAINER_TYPES.TEST_TUBE_CONTAINER, width: 4, height: 6}
};

export const HAIVE_TYPES = {
    DISPENSER: "Dispenser",
    FREEZER: "Freezer",
    CENTRIFUGE: "Centrifuge"
};