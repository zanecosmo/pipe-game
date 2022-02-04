import {hoveredUnit, setHoveredUnit} from "./state.js";
import gameInstance from "./game-instance.js";
import render from "./render.js";
import {generateUnits} from "./game-tools.js";
import pieces from "./piece-templates.js";

const canvas = document.getElementById("screen");

let pageQueue = ["start-menu"];

const copy = (item) => JSON.parse(JSON.stringify(item));
const currentPage = () => pages[pageQueue[pageQueue.length-1]];
const pushPageToQueue = (pagename) => pageQueue.push(pagename);
const popPageFromQueue = () => pageQueue.pop();
const deactivatePage = () => {
    for (let i = 0; i < currentPage().areas.length; i++) currentPage().areas[i].isActive = false;
};
const reactivatePage = () => {
    for (let i = 0; i < currentPage().areas.length - 1; i++) currentPage().areas[i].isActive = true;
};
const safelyRemoveModal = () => {
    reactivatePage();
    currentPage().areas.pop();
};

const buildModal = (modalName, text, modalBehavior) => {
    const modal = pages[modalName].areas[0];
    modal.units[0].occupiedBy.text.value = text;
    modal.units[0].occupiedBy.behavior = modalBehavior;
    return modal;
};

const generateSlotTemplates = (areaName) => {
    const fieldArea = pages["game-page"].areas[areaName === "field" ? 0 : 1];
    const totalUnits = fieldArea.grid.columns * fieldArea.grid.rows;
    for (let i = 0; i < totalUnits; i++) {
        const fieldSlotTemplate = {
            name: i,
            text: null,
            slot: [],
            behavior: buttonActions[`${areaName}-action`],
            clickable: true
        };
        fieldArea.unitTemplates.push(fieldSlotTemplate);
    };
};

const generateLevelButtonTemplates = () => {
    const levelSelectArea = pages["level-select-menu"].areas[0];
    for (const levelNumber in gameInstance.levels) {
        const levelTemplate = {
            name: `level-${levelNumber}-button`,
            text: {value: `${levelNumber}`, style: "20px sans-serif"},
            behavior: () => buttonActions["select-level"](levelNumber),
            clickable: gameInstance.levels[levelNumber].status === "locked"
                ? false
                : true
        };
        levelSelectArea.unitTemplates.push(levelTemplate);
    };
};

const callLevelSelectGroup = () => {
    if (pages["level-select-menu"].areas[0].units.length === 0) {
        generateLevelButtonTemplates();
        generateUnits(pages["level-select-menu"].areas[0])
    };
    pushPageToQueue("game-menu");
    render(currentPage());
};

const callNewModalGroup = (button, text) => {
    deactivatePage();
    setHoveredUnit(null);
    const modal = buildModal("new-game-warning-modal", text, modalButtonActions[button]);
    currentPage().areas.push(modal);
    render(currentPage());
};

const modalButtonActions = {
    ["new-game"]: () => {
        safelyRemoveModal();
        callLevelSelectGroup();
    },
    ["load-game"]: () => console.log("LOAD GAME BUTTON PRESSED"),
    ["close-modal"]: () => {
        safelyRemoveModal();
        setHoveredUnit(null);
        render(currentPage());
    }
};

const buttonActions = {
    ["load-game"]: function(button, text) {
        if (gameInstance.levels[1].status === "unlocked") console.log("LOAD GAME GREENLIGHT");
        else callNewModalGroup(button, text);
    },

    ["new-game"]: function(button, text) {
        if (gameInstance.levels[1].status === "unlocked") {
            // async get default level data from server
            // put returned data into "gameInstance"
            callLevelSelectGroup();
        } else callNewModalGroup(button, text);
    },
    
    ["level-select"]: () => {
        pushPageToQueue("level-select-menu");
        render(currentPage());
    },
    ["select-level"]: (levelNumber) => {
        // go find level data for that level from "game-instance"
        // populate the game-page units with the appropriate items (based on the level data)
        const level = gameInstance.levels[levelNumber];

        let areaIndex = 0;
        for (const area in level.state) {
            const levelArea = level.state[area]

            for (let i = 0; i < levelArea.length; i++) {
                if (levelArea.length === 0) break;
                const unitItem = levelArea[i];
                const piece = copy(pieces[unitItem.kind]);
                piece.rotationState = unitItem.rotationState;
                pages["game-page"].areas[areaIndex].units[unitItem.position].occupiedBy.slot.push(piece);
            };
            areaIndex++;
        };

        console.log(pages["game-page"].areas);
        
        pushPageToQueue("game-page");
        render(currentPage());

        // push gameplay page to pageQueue
        // render the gameplay page
    },
    ["text-input"]: () => console.log("TEXT INPUT ACTIVATED"),
    ["async-load"]: () => console.log("ASYNC LOAD BUTTON PRESSED"),
    ["play-continue"]: () => {
        console.log("PLAY BUTTON PRESSED");
        console.log(pages["game-page"]);
    },
    ["save-progress"]: () => console.log("SAVE PROGRESS BUTTON PRESSED"),
    ["submit-password"]: () => console.log("SUBMiT PASSWORD PRESSED"),
    ["async-save"]: () => console.log("ASYNC SAVE BUTTON PRESSED"),
    ["field-action"]: () => console.log(hoveredUnit),
    ["inventory-action"]: () => console.log(hoveredUnit),
    ["close-out"]: () => {
        popPageFromQueue();
        // remove event listener
        setHoveredUnit(null);
        render(currentPage());
    }
};

const pages = {
    ["start-menu"]: {
        title: {
            text: "PIPE-CONNECT",
            x: 250,
            y: 130
        },
        areas: [
            {
                name: "start-menu-buttons",
                type: "buttons",
                bounds: {
                    start: {x: 150, y: 150},
                    width: 200,
                    height: 150
                },
                grid: {rows: 3, columns: 1},
                padding: 5,
                isModal: false,
                isActive: true,
                units: [],
                unitTemplates: [
                    {
                        name: "continue-game-button",
                        text: {value: "CONTINUE", style: "20px sans-serif"},
                        behavior: buttonActions["continue-game"],
                        clickable: false
                    },

                    {
                        name: "new-game-button",
                        text: {value: "NEW GAME", style: "20px sans-serif"},
                        behavior: function() {
                            const buttonAction = buttonActions["new-game"].bind(buttonActions);
                            buttonAction("new-game", this.text.value);
                        },
                        clickable: true
                    },
                    
                    {
                        name: "load-game-button",
                        text: {value: "LOAD GAME", style: "20px sans-serif"},
                        behavior: function() {
                            // TO-DO fix load button to match level[0] state
                            const buttonAction = buttonActions["load-game"].bind(buttonActions);
                            buttonAction("load-game", this.text.value);
                        },
                        clickable: true
                    }
                ]
            }
        ],
    },

    ["load-menu"]: {
        title: {
            text: "LOAD SAVED GAME",
            x: 20,
            y: 80
        },
        areas: [
            {
                name: "load-menu-input",
                type: "text-input",
                bounds: {
                    start: {x: 150, y: 200},
                    width: 300,
                    height: 60
                },
                grid: {rows: 1, columns: 1},
                padding: 5,
                isModal: false,
                isActive: true,
                units: [],
                unitTemplates: [
                    {
                        name: "enter-password",
                        text: {value: "", style: "20px sans-serif"},
                        behavior: buttonActions["text-input"],
                        clickable: false
                    }
                ]
            },

            {
                name: "load-menu-buttons",
                type: "buttons",
                bounds: {
                    start: {x: 150, y: 300},
                    width: 300,
                    height: 120,
                },
                grid: {rows: 2, columns: 1},
                padding: 5,
                isModal: false,
                isActive: true,
                units: [],
                unitTemplates: [
                    {
                        name: "async-load-button",
                        text: {value: "LOAD GAME", style: "20px sans-serif"},
                        behavior: buttonActions["async-load"],
                        clickable: false
                    },

                    {
                        name: "back-button",
                        text: {value: "BACK", style: "20px sans-serif"},
                        behavior: () => {
                            // document.removeListener("keypress", whateverItIs);
                            buttonActions["close-out"]();
                        },
                        clickable: true
                    }
                ]
            }
        ],
    },

    ["level-select-menu"]: {
        title: {
            text: "LEVEL SELECT",
            x: 100,
            y: 100
        },
        areas: [
            {
                name: "level-select-buttons",
                type: "buttons",
                bounds: {
                    start: {x: 50, y: 150},
                    width: 400,
                    height: 200
                },
                grid: {rows: 1, columns: 3},
                padding: 10,
                isModal: false,
                isActive: true,
                units: [],
                unitTemplates: []
            },

            {
                name: "level-select-back-button",
                type: "buttons",
                bounds: {
                    start: {x: 50, y: 350},
                    width: 100,
                    height: 50
                },
                grid: {rows: 1, columns: 1},
                padding: 5,
                isModal: false,
                isActive: true,
                units: [],
                unitTemplates: [
                    {
                        name: "level-select-back-button",
                        text: {value: "BACK", style: "20px sans-serif"},
                        behavior: buttonActions["close-out"],
                        clickable: true
                    }
                ]
            }
        ]
    },

    ["game-menu"]: {
        title: {
            text: "PIPE-CONNECT",
            x: 250,
            y: 100
        },
        areas: [
            {
                name: "game-menu-buttons",
                type: "buttons",
                bounds: {
                    start: {x: 100, y: 120},
                    width: 300,
                    height: 200,
                },
                grid: {rows: 4, columns: 1},
                padding: 5,
                isModal: false,
                isActive: true,
                units: [],
                unitTemplates: [
                    {
                        name: "play-continue-button",
                        text: {value: "CONTINUE", style: "20px sans-serif"},
                        behavior: buttonActions["play-continue"],
                        clickable: true
                    },

                    {
                        name: "select-level-button",
                        text: {value: "LEVELS", style: "20x sans-serif"},
                        behavior: buttonActions["level-select"],
                        clickable: true
                    },

                    {
                        name: "save-progress-button",
                        text: {value: "SAVE PROGRESS", style: "20px sans-serif"},
                        behavior: buttonActions["save-progress"],
                        clickable: true
                    },

                    {
                        name: "game-menu-back-button",
                        text: {value: "BACK", style: "20px sans-serif"},
                        behavior: buttonActions["close-out"],
                        clickable: true
                    }
                ]
            }
        ],
    },

    ["new-password-menu"]: {
        title: {
            text: "CREATE NEW PASSWORD",
            x: 40,
            y: 180
        },
        areas: [
            {
                name: "new-password-input",
                type: "text-input",
                bounds: {
                    start: {x: 150, y: 200},
                    width: 300,
                    height: 60,
                },
                grid: {rows: 1, columns: 1},
                padding: 10,
                isModal: false,
                isActive: true,
                units: [],
                unitTemplates: [
                    {
                        name: "new-password-input",
                        text: {value: "", style: "20px sans-serif"},
                        behavior: buttonActions["text-input"],
                        clickable: false
                    },
                ]
            },

            {
                name: "new-password-buttons",
                type: "buttons",
                bounds: {
                    start: {x: 150, y: 220},
                    width: 300,
                    height: 180,
                },
                grid: {rows: 3, columns: 1},
                padding: 10,
                isModal: false,
                isActive: true,
                units: [],
                unitTemplates: [
                    {
                        name: "submit-password-button",
                        text: {value: "SUBMIT", style: "20px sans-serif"},
                        behavior: buttonActions["submit-password"],
                        clickable: true
                    },

                    {
                        name: "save-password-button",
                        text: {value: "SAVE", style: "20px sans-serif"},
                        behavior: buttonActions["async-save"],
                        clickable: false
                    },

                    {
                        name: "new-password-back-button",
                        text: {value: "BACK", style: "20px sans-serif"},
                        behavior: buttonActions["close-out"],
                        clickable: true
                    }
                ]
            }
        ],
    },

    ["new-game-warning-modal"]: {
        title: null,
        areas: [
            {
                name: "new-game-modal",
                type: "buttons",
                modalText: {
                    style: "20px sans-serif",
                    value: "Creating a new game will overwrite any unsaved progress. Are you sure you would like to continue?",
                },
                
                bounds: {
                    start: {x: 50, y: 160},
                    width: 400,
                    height: 130
                },
                grid: {rows: 2, columns: 1},
                padding: 12,
                isModal: true,
                isActive: true,
                units: [],
                unitTemplates: [
                    {
                        name: "new-game-modal-button",
                        text: {value: "fart", style: "20px sans-serif"},
                        behavior: null,
                        clickable: true
                    },
        
                    {
                        name: "modal-exit",
                        text: {value: "BACK", style: "20px sans-serif"},
                        behavior: modalButtonActions["close-modal"],
                        clickable: true
                    }
                ]
            }
        ]
    },

    ["game-page"]: {
        title: null,
        areas: [
            {
                name: "field",
                type: "slots",
                bounds: {
                    start: {x: 100, y: 0},
                    width: 400,
                    height: 400,
                },
                grid: {
                    rows: 8,
                    columns: 8,
                    rule: function() {return (400/this.columns)}
                },
                padding: 0,
                isModal: false,
                isActive: true,
                units: [],
                unitTemplates: [],
            },

            {
                name: "inventory",
                type: "slots",
                bounds: {
                    start: {x: 0, y: 0},
                    width: 100,
                    height: 200
                },
                grid: {
                    rows: 4,
                    columns: 2,
                    rule: function() {return (100/this.columns)}
                },
                padding: 5,
                isModal: false,
                isActive: true,
                units: [],
                unitTemplates: []
            },
            
            {
                name: "menu",
                type: "buttons",
                bounds: {
                    start: {x: 0, y: 200},
                    width: 100,
                    height: 200,
                },
                grid: {
                    rows: 5,
                    columns: 1,
                    rule: function() {return (100/this.columns)}
                },
                padding: 5,
                isModal: false,
                isActive: true,
                units: [],
                unitTemplates: [
                    {
                        name: "restart-button",
                        text: {value: "RESTART", style: "10px sans-serif"},
                        behavior: buttonActions["restart-level"],
                        clickable: true
                    },

                    {
                        name: "save-progressbutton",
                        text: {value: "SAVE", style: "10px sans-serif"},
                        behavior: buttonActions["save-progress"],
                        clickable: true
                    },

                    {
                        name: "level-select-button",
                        text: {value: "LEVELS", style: "10px sans-serif"},
                        behavior: buttonActions["select-level"],
                        clickable: true
                    },

                    {
                        name: "exit-to-menu",
                        text: {value: "EXIT", style: "10px sans-serif"},
                        behavior: buttonActions["close-out"],
                        clickable: true
                    },

                    {
                        name: "next-level-button",
                        text: {value: "NEXT", style: "10px sans-serif"},
                        behavior: buttonActions["next-level"],
                        clickable: false
                    },
                ]
            },

            {
                name: "mouse-area",
                type: "slots",
                bounds: {
                    start: {x: 0, y: 0},
                    height: 50,
                    width: 50
                },
                grid: {
                    rows: 1,
                    cilumns: 1
                },
                padding: 0,
                isModal: false,
                isActive: false,
                units: [],
                unitTemplates: [
                    {
                        name: "mouse-unit",
                        text: null,
                        behavior: null,
                        clickable: false
                    }
                ]
            }
        ],
    },
};

export { pages, currentPage , generateSlotTemplates};