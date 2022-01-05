const gameInstance = {
    password: null,
    levels: {

        [1]: {
            status: "unlocked",
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
            status: "locked",
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


export default {
    [1]: [
        {number: 2, kind: "end-cap", position: 0},
        {number: 2, kind: "two-way", position: 1},
        {number: 2, kind: "three-way", position: 2},
        {number: 2, kind: "four-way", position: 3},
        {number: 2, kind: "elbow", position: 4},
    ]
}