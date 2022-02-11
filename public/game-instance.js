var gameInstance = [
    {
        isUnlocked: true,
        state: {
            ["field"]: [
                {type: "start-permanent", position: 8, rotation: 0},
                {type: "start-permanent", position: 16, rotation: 0},
                {type: "end-permanent", position: 23, rotation: 2},
            ],
            ["inventory"]: [
                {type: "two-way", position: 1, rotation: 0},
                {type: "two-way", position: 1, rotation: 0},
                {type: "two-way", position: 1, rotation: 0},
                {type: "two-way", position: 1, rotation: 0},
                {type: "two-way", position: 1, rotation: 0},
                {type: "two-way", position: 1, rotation: 0},
                {type: "three-way", position: 2, rotation: 0},
                {type: "elbow", position: 0, rotation: 0},
            ]
        }
    },

    {
        isUnlocked: false,
        state: {
            ["field"]: [
                {type: "start-permanent", position: 0, rotation: 0},
                {type: "end-permanent", position: 5, rotation: 1},
                {type: "block-permanent", position: 4, rotation:0},
                {type: "block-permanent", position: 12, rotation:0},
                {type: "block-permanent", position: 20, rotation:0},
                {type: "block-permanent", position: 28, rotation:0},
            ],
            ["inventory"]: [
                {type: "two-way", position: 1, rotation: 0},
                {type: "two-way", position: 1, rotation: 0},
                {type: "two-way", position: 1, rotation: 0},
                {type: "two-way", position: 1, rotation: 0},
                {type: "two-way", position: 1, rotation: 0},
                {type: "two-way", position: 1, rotation: 0},
                {type: "two-way", position: 1, rotation: 0},
                {type: "two-way", position: 1, rotation: 0},
                {type: "two-way", position: 1, rotation: 0},
                {type: "elbow", position: 2, rotation: 0},
                {type: "elbow", position: 2, rotation: 0},
                {type: "elbow", position: 2, rotation: 0}
            ]
        }
    },

    {
        isUnlocked: false,
        state: {
            ["field"]: [],
            ["inventory"]: [
                {type: "end-cap", position: 0, rotation: 0},
                {type: "end-cap", position: 0, rotation: 0},
                {type: "end-cap", position: 0, rotation: 0},
                {type: "end-cap", position: 0, rotation: 0},
                {type: "two-way", position: 1, rotation: 0},
                {type: "two-way", position: 1, rotation: 0},
                {type: "two-way", position: 1, rotation: 0},
                {type: "two-way", position: 1, rotation: 0},
                {type: "three-way", position: 2, rotation: 0},
                {type: "three-way", position: 2, rotation: 0},
                {type: "three-way", position: 2, rotation: 0},
                {type: "three-way", position: 2, rotation: 0},
                {type: "four-way", position: 3, rotation: 0},
                {type: "four-way", position: 3, rotation: 0},
                {type: "four-way", position: 3, rotation: 0},
                {type: "four-way", position: 3, rotation: 0}
            ]
        }
    },

    {
        isUnlocked: false,
        state: {
            ["field"]: [],
            ["inventory"]: [
                {
                    "type": "start-permanent",
                    "position": 8,
                    "rotation": 0
                },
                {
                    "type": "elbow",
                    "position": 0,
                    "rotation": 0
                },
                {
                    "type": "start-permanent",
                    "position": 16,
                    "rotation": 0
                },
                {
                    "type": "three-way",
                    "position": 2,
                    "rotation": 2
                },
                {
                    "type": "end-cap",
                    "position": 3,
                    "rotation": 2
                },
                {
                    "type": "end-permanent",
                    "position": 23,
                    "rotation": 2
                }
            ]
        }
    }
];

window.gameInstance = gameInstance;

export default gameInstance;