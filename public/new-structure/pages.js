import {setHoveredUnit} from "./state.js";
import defaultGameState from "./game-instance.js";
import render from "./render.js";

const canvas = document.getElementById("screen");

let pageQueue = ["start-menu"];

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

const modalButtonActions = {
    ["new-game"]: () => {
        safelyRemoveModal();
        pushPageToQueue("game-menu");
        render(currentPage());
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
        if (defaultGameState.levels[1].status === "unlocked") {
            console.log("LOAD GAME GREENLIGHT");
        } else {
            deactivatePage();
            setHoveredUnit(null);
            const modal = pages["new-game-modal"].areas[0];
            modal.units[0].occupiedBy.text.value = text;
            modal.units[0].occupiedBy.behavior = modalButtonActions[button];
            currentPage().areas.push(modal);
            render(currentPage());
        }
    },

    ["new-game"]: function(button, text) {
        if (defaultGameState.levels[1].status === "unlocked") {
            pushPageToQueue("game-menu");
            render(currentPage());
        } else {
            deactivatePage();
            setHoveredUnit(null);
            const modal = pages["new-game-modal"].areas[0];
            modal.units[0].occupiedBy.text.value = text;
            modal.units[0].occupiedBy.behavior = modalButtonActions[button];
            currentPage().areas.push(modal);
            render(currentPage());
        };
    },
    
    ["level-select"]: () => {
        pushPageToQueue("level-select-menu");
        render(currentPage());
    },
    ["select-level"]: (levelNumber) => console.log(`LEVEL ${levelNumber} SELECTED`),
    ["text-input"]: () => console.log("TEXT INPUT ACTIVATED"),
    ["async-load"]: () => console.log("ASYNC LOAD BUTTON PRESSED"),
    ["play-continue"]: () => console.log("PLAY BUTTON PRESSED"),
    ["save-progress"]: () => console.log("SAVE PROGRESS BUTTON PRESSED"),
    ["submit-password"]: () => console.log("SUBMiT PASSWORD PRESSED"),
    ["async-save"]: () => console.log("ASYNC SAVE BUTTON PRESSED"),
    
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
                            // TO-DO fix load buttonto match level[0] state
                            const buttonAction = buttonActions["new-game"].bind(buttonActions);
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
                grid: {rows: 2, columns: 4},
                padding: 10,
                isModal: false,
                isActive: true,
                units: [],
                unitTemplates: [
                    {
                        name: "level-1-button",
                        text: {value: "1", style: "20px sans-serif"},
                        behavior: () => buttonActions["select-level"]("1"),
                        // clickable: levels[0].status === "locked" ? false : true
                        clickable: true
                    },

                    {
                        name: "level-2-button",
                        text: {value: "2", style: "20px sans-serif"},
                        behavior: () => buttonActions["select-level"]("2"),
                        // clickable: levels[0].status === "locked" ? false : true
                        clickable: true
                    },

                    {
                        name: "level-3-button",
                        text: {value: "3", style: "20px sans-serif"},
                        behavior: () => buttonActions["select-level"]("3"),
                        // clickable: levels[0].status === "locked" ? false : true            
                        clickable: true
                    },

                    {
                        name: "level-4-button",
                        text: {value: "4", style: "20px sans-serif"},
                        behavior: () => buttonActions["select-level"]("4"),
                        // clickable: levels[0].status === "locked" ? false : true
                        clickable: true
                    },

                    {
                        name: "level-5-button",
                        text: {value: "5", style: "20px sans-serif"},
                        behavior: () => buttonActions["select-level"]("5"),
                        // clickable: levels[0].status === "locked" ? false : true            
                        clickable: true
                    },

                    {
                        name: "level-6-button",
                        text: {value: "6", style: "20px sans-serif"},
                        behavior: () => buttonActions["select-level"]("6"),
                        // clickable: levels[0].status === "locked" ? false : true
                        clickable: true
                    },

                    {
                        name: "level-7-button",
                        text: {value: "7", style: "20px sans-serif"},
                        behavior: () => buttonActions["select-level"]("7"),
                        // clickable: levels[0].status === "locked" ? false : true
                        clickable: true
                        
                    },

                    {
                        name: "level-8-button",
                        text: {value: "8", style: "20px sans-serif"},
                        behavior: () => buttonActions["select-level"]("8"),
                        // clickable: levels[0].status === "locked" ? false : true
                        clickable: true
                    }
                ]
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

    ["game-page"]: {
        title: null,
        areas: [
            {
                name: "field",
                type: "slots",
                bounds: {
                    start: {x: 0, y: 0},
                    width: canvas.width,
                    height: canvas.height*(.75),
                },
                grid: {
                    rows: 3,
                    columns: 5,
                    rule: function() {return (canvas.width/this.columns)}
                },
                padding: 0,
                isModal: false,
                isActive: true,
                units: [],
                unitTemplates: []
            },

            {
                name: "inventory",
                type: "slots",
                bounds: {
                    start: {x: 0, y: 300},
                    width: canvas.width*(.6),
                    height: canvas.height*(.25),
                },
                grid: {
                    rows: 2,
                    columns: 6,
                    rule: function() {return (canvas.width*(.6)/this.columns)}
                },
                padding: 0,
                isModal: false,
                isActive: true,
                units: [],
                unitTemplates: []
            },
            
            {
                name: "menu",
                type: "buttons",
                bounds: {
                    start: {x: 0, y: 250},
                    width: 100,
                    height: 250,
                },
                grid: {
                    rows: 5,
                    columns: 1,
                    rule: function() {return (canvas.width*(.6)/this.columns)}
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
                        name: "save-progressibuttn",
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
            }
        ],
    },

    ["new-game-modal"]: {
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
    }
};

export { pages, currentPage };