
export default {
    ["end-cap"]: [
        {top: null},
        {right: false},
        {bottom: null},
        {left: null}
    ],

    ["two-way"]: [
        {top: null},
        {right: false},
        {bottom: null},
        {left: false}
    ],

    ["three-way"]: [
        {top: null},
        {right: false},
        {bottom: false},
        {left: false}
    ],

    ["four-way"]: [
        {top: false},
        {right: false},
        {bottom: false},
        {left: false}
    ],

    ["elbow"]: [
        {top: null},
        {right: null},
        {bottom: false},
        {left: false}
    ],

    ["start-permanent"]: [
        {top: null},
        {right: false},
        {bottom: null},
        {left: null}
    ],

    ["end-permanent"]: [
        {top: null},
        {right: false},
        {bottom: null},
        {left: null}
    ]
};

const pieces = {
    ["end-cap"]: [false, true, false, false],
    ["two-way"]: [false, true, false, true],
    ["four-way"]: [true, true, true, true],
    ["three-way"]: [false, true, true, true],
    ["elbow"]: [false, false, true ,true]
};