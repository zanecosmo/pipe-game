const pieces = {
    ["end-cap"]: {
        kind: "end-cap",
        rotationState: 0,
        connectable: [
            {top: null},
            {right: false},
            {bottom: null},
            {left: null}
        ]
    },
    ["two-way"]: {
        kind: "two-way",
        rotationState: 0,
        connectable: [
            {top: null},
            {right: false},
            {bottom: null},
            {left: false}
        ]
    },
    ["three-way"]: {
        kind: "three-way",
        rotationState: 0,
        connectable: [
            {top: null},
            {right: false},
            {bottom: false},
            {left: false}
        ]
    },
    ["four-way"]: {
        kind: "four-way",
        rotationState: 0,
        connectable: [
            {top: false},
            {right: false},
            {bottom: false},
            {left: false}
        ]
    },
    ["elbow"]: {
        kind: "elbow",
        rotationState: 0,
        connectable: [
            {top: null},
            {right: null},
            {bottom: false},
            {left: false}
        ]
    },
};

export default {
    ["end-cap"]: [false, true, false, false],
    ["two-way"]: [false, true, false, true],
    ["three-way"]: [false, true, true, true],
    ["four-way"]: [true, true, true, true],
    ["elbow"]: [false, false, true ,true]
};