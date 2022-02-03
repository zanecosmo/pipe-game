export default {
    password: null,
    levels: {
        [1]: {
            status: "complete",
            state: {
                field: [],
                inventory: [
                    {kind: "end-cap", rotationState: 0, position: 0},
                    {kind: "end-cap", rotationState: 0, position: 0},
                    {kind: "two-way", rotationState: 0, position: 1},
                    {kind: "two-way", rotationState: 0, position: 1},
                    {kind: "three-way", rotationState: 0, position: 2},
                    {kind: "three-way", rotationState: 0, position: 2},
                    {kind: "four-way", rotationState: 0, position: 3},
                    {kind: "four-way", rotationState: 0, position: 3},
                    {kind: "elbow", rotationState: 0, position: 4},
                    {kind: "elbow", rotationState: 0, position: 4},
                ]
            }
        },

        [2]: {
            status: "in-progress",
            state: {
                field: [],
                inventory: [
                    {kind: "end-cap", rotationState: 0, position: 0},
                    {kind: "two-way", rotationState: 0, position: 1},
                    {kind: "three-way", rotationState: 0, position: 2},
                    {kind: "four-way", rotationState: 0, position: 3},
                    {kind: "elbow", rotationState: 0, position: 4},
                ]
            }
        },

        [3]: {
            status: "locked",
            state: {
                field: [],
                inventory: [
                    {kind: "end-cap", rotationState: 0, position: 0},
                    {kind: "two-way", rotationState: 0, position: 1},
                    {kind: "two-way", rotationState: 0, position: 1},
                    {kind: "two-way", rotationState: 0, position: 1},
                    {kind: "three-way", rotationState: 0, position: 2},
                    {kind: "four-way", rotationState: 0, position: 3},
                    {kind: "elbow", rotationState: 0, position: 4},
                    {kind: "elbow", rotationState: 0, position: 4},
                    {kind: "elbow", rotationState: 0, position: 4},
                ]
            }
        },
    }
};



[
    {number: 1, state: null, status: "locked"},
    {number: 2, state: null, status: "locked"}
];