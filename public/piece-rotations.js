
export default {
    ["end-cap"]: [
        {top: false},
        {right: true},
        {bottom: false},
        {left: false}
    ],

    ["two-way"]: [
        {top: false},
        {right: true},
        {bottom: false},
        {left: true}
    ],

    ["three-way"]: [
        {top: false},
        {right: true},
        {bottom: true},
        {left: true}
    ],

    ["four-way"]: [
        {top: true},
        {right: true},
        {bottom: true},
        {left: true}
    ],

    ["elbow"]: [
        {top: false},
        {right: false},
        {bottom: true},
        {left: true}
    ],

    ["start-permanent"]: [
        {top: false},
        {right: true},
        {bottom: false},
        {left: false}
    ],

    ["end-permanent"]: [
        {top: false},
        {right: true},
        {bottom: false},
        {left: false}
    ]
};

const pieces = {
    ["end-cap"]: [false, true, false, false],
    ["two-way"]: [false, true, false, true],
    ["four-way"]: [true, true, true, true],
    ["three-way"]: [false, true, true, true],
    ["elbow"]: [false, false, true ,true]
};