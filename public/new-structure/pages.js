import {safelyRemoveModal, pushPageToQueue, deactivatePage, popPageFromQueue} from "./utils.js";
import {setHoveredUnit, pageQueue} from "./state.js";
import levels from "./levels.js";
import render from "./render.js";
import {lastIn} from "./utils.js";

const modalButtons = {
    ["new-game"]: () => {
        safelyRemoveModal();
        pushPageToQueue("game-menu");
        render();
    },
    ["load-game"]: () => console.log("LOAD GAME BUTTON PRESSED"),
    ["close-modal"]: () => {
        safelyRemoveModal();
        setHoveredUnit(null);
        render();
    }
};

const buttonActions = {
    ["new-game-modal"]: function(button, text) {
        deactivatePage();
        setHoveredUnit(null);
        if (levels[0].status === "unlocked") modalButtons[button]();
        else {
            const modal = pages["new-game-modal"].areas[0];
            modal.units[0].occupiedBy.text.value = text;
            modal.units[0].occupiedBy.behavior = modalButtons[button];
            pages[lastIn(pageQueue)].areas.push(modal);
            render();
        };
    },
    ["select-level"]: () => console.log("SELECT-LEVEL PRESSED"),
    ["text-input"]: () => console.log("TEXT INPUT ACTIVATED"),
    ["async-load"]: () => console.log("ASYNC LOAD BUTTON PRESSED"),
    ["play-continue"]: () => console.log("PLAY BUTTON PRESSED"),
    ["save-progress"]: () => console.log("SAVE PROGRESS BUTTON PRESSED"),
    ["submit-password"]: () => console.log("SUBMiT PASSWORD PRESSED"),
    ["async-save"]: () => console.log("ASYNC SAVE BUTTON PRESSED"),
    ["close-out"]: () => {
        popPageFromQueue();
        // if (pageQueue.length-1 !== "play-page") {
        //     document.removeEventListener("keypress", whateverItIs)
        // };
        setHoveredUnit(null);
        render();
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
                            const buttonAction = buttonActions["new-game-modal"].bind(buttonActions);
                            buttonAction("new-game", this.text.value);
                        },
                        clickable: true
                    },
                    
                    {
                        name: "load-game-button",
                        text: {value: "LOAD GAME", style: "20px sans-serif"},
                        behavior: function() {
                            const buttonAction = buttonActions["new-game-modal"].bind(buttonActions);
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
                        behavior: buttonActions["select-level"],
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
                grid: {rows: 4, columns: 1},
                padding: 10,
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

    ["new-game-modal"]: {
        title: null,
        areas: [
            {
                name: "new-game-modal",
                type: "buttons",
                modalText: {
                    value:
                    `Creating a new game will overwrite any unsaved progress.
                    Are you sure you would like to continue?`,
                },
                
                bounds: {
                    start: {x: 100, y: 175},
                    width: 300,
                    height: 75
                },
                grid: {rows: 2, columns: 1},
                padding: 5,
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
                        behavior: modalButtons["close-modal"],
                        clickable: true
                    }
                ]
            }
        ]
    }
};

export {pages as default};