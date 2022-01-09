// import game from "./utils/game-actions.js";

// console.log("REWRITE BRANCH");
// game.addEventListeners();
// game.start();

////////////////////////////////////////////////////////////////////////////////////////////////////

const unitTypeRenderers = {
    ["buttons"]: (unit) => draw.button(unit),
    ["slots"]: (unit) => {
        if (unit.occupiedBy.length > 0) {
            draw.item(unit);
            if (unit.area === "inventory") {
                draw.stackQuantity(unit.occupiedBy.length, unit.start.x, unit.start.y);
            };
        };
    },
    ["text-input"]: () => console.log("TEXT INPUT")
};

const renderUnits = (area) => {
    for (let i = 0; i < area.units.length; i++) {
        unitTypeRenderers[area.type](area.units[i])
    };
};

const render = () => {
    const currentPage = pages[pageQueue[pageQueue.length-1]];
    draw.clearScreen();
    draw.screen();
    if (currentPage.title !== null) draw.title(currentPage.title); 
    for (let i = 0; i < currentPage.areas.length; i++) renderUnits(currentPage.areas[i]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////

const canvas = document.getElementById("screen");
const c = document.getElementById("screen").getContext("2d");
const screenColor = "rgb(190, 0, 190)";
const renderColor = "rgb(170, 255, 0)";
const hoverColor = "rgb(250, 60, 200)";

const draw = {
    screen: () => {
        c.fillStyle = screenColor;
        c.fillRect(0, 0, canvas.width, canvas.height);
    },
    clearScreen: () => {
        c.clearRect(0, 0, canvas.width, canvas.height);
    },
    title: function(title) {
        c.beginPath();
        c.fillStyle = renderColor;
        c.font = "20px sans-serif";
        c.textBaseline = "middle",
        c.textAlign = "center",
        c.fillText(title.text, title.x, title.y);
    },
    status: function(color, buttonBounds, status) {
        c.beginPath();
        c.fillStyle = color;
        c.textAlign = "right";
        c.fillText(
            status,
            buttonBounds.start.x + buttonBounds.width - 4,
            buttonBounds.start.y + (buttonBounds.height / 2)
        );
        c.closePath();
    },
    button: function(unit) {
        let borderColor = renderColor;
        let boxColor = screenColor;
        let textColor = renderColor;
        const button = unit.occupiedBy;
        const buttonBounds = button.bounds;
        const start = buttonBounds.start;
    
        if (unit.occupiedBy.clickable === false) c.globalAlpha = .5;
        else if (unit === hoveredUnit) {
            boxColor = renderColor;
            textColor = screenColor;
        };
        
        

        
        c.beginPath();
        c.fillStyle = boxColor;
        c.fillRect(start.x, start.y, buttonBounds.width, buttonBounds.height);
        c.closePath();
    
        c.beginPath();
        c.strokeStyle = borderColor;
        c.lineWidth = 2;
        c.strokeRect(start.x, start.y, buttonBounds.width, buttonBounds.height);
        c.closePath();
    
        c.beginPath();
        c.fillStyle = textColor;
        c.lineWidth = 2;
        c.textBaseline =  "middle";
        c.textAlign = unit.name === "select-level-button" ? "left" : "center";
        c.font = button.text.style;
        c.fillText(button.text.value, button.text.x, button.text.y + 2);
        c.closePath();
    
        c.textAlign = "left";
        c.globalAlpha = 1;
    
        if (unit.name === "select-level-button") {
            this.status(textColor, buttonBounds, button.status);
        };
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////

let hoveredUnit = null;
let pageQueue = ["start-menu"];
let password = null;

const onGameStart = () => {
    const canvas = document.getElementById("screen");
    populateAreas();
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("click", onClick);
    render(pageQueue[pageQueue.length-1]);
};

const pushPageToQueue = (pagename) => pageQueue.push(pagename);
const popPageFromQueue = () => pageQueue.pop(pageQueue[pageQueue.length-1]);

const buttonActions = {
    ["new-game"]: () => {
        pushPageToQueue("game-menu");
        render(pages[pageQueue.length-1]);  
    },
    ["load-game"]: () => console.log("LOAD GAME BUTTON PRESSED"),
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
        hoveredUnit = null;
        render(pages[pageQueue.length-1]);
    },
};

const onClick = () => {
    if (hoveredUnit === null) return
    if (hoveredUnit.occupiedBy.clickable) hoveredUnit.occupiedBy.behavior();
};

const isInBounds =  (position, bounds) => {
    if (position.x < bounds.start.x + bounds.width && position.x >= bounds.start.x
        && position.y < bounds.start.y + bounds.height && position.y >= bounds.start.y)
        return true;
    return false;
};

const getPosition = (e) => {
    const screen = canvas.getBoundingClientRect();
    const eventPosition = {x: (e.clientX - screen.left), y: (e.clientY - screen.top)};
    return eventPosition;
};

const whichUnit = (area, position) => {
    const unitWidth = area.bounds.width / area.grid.columns;
    const unitHeight = area.bounds.height / area.grid.rows;

    const eventPositionX = position.x - area.bounds.start.x;
    const eventPositionY = position.y - area.bounds.start.y;

    const unitsDeepX = Math.floor(eventPositionX/unitWidth);
    const unitsDeepY = Math.floor(eventPositionY/unitHeight);

    const foundUnit = unitsDeepY*area.grid.columns+unitsDeepX;

    return area.units[foundUnit];
};

const populateAreas = () => {
    for (const pagename in pages) {
        const page = pages[pagename];
        for (let i = 0; i < page.areas.length; i++) {
            generateUnits(page.areas[i]);
        };
    };
};

const levels = [
    {number: 1, state: null, status: "unlocked"},
    {number: 2, state: null, status: "locked"}
];

const generateButton = (unitTemplate, unit, unitNumber) => {
    const button = {
        name: unitTemplate.name,
        bounds: {
            start: {
                x: (unit.bounds.start.x + unit.padding),
                y: (unit.bounds.start.y + unit.padding)
            },
            width: unit.bounds.width - (unit.padding * 2),
            height: unit.bounds.height - (unit.padding * 2)
        },
        behavior: unitTemplate.behavior,
        clickable: unitTemplate.clickable
    };

    if (unitTemplate.name !== "play-level-button") {
        button.text = {
            value: unitTemplate.text.value,
            x: unit.bounds.start.x + (unit.bounds.width / 2),
            y: unit.bounds.start.y + (unit.bounds.height / 2),
            style: unitTemplate.text.style,
        };
        return button;
    };

    if (levels[unitNumber] !== undefined) {
        button.status = levels[unitNumber].status;
        button.text = {
            value: levels[unitNumber].number,
            x: unit.bounds.start.x + (unit.padding * 2),
            y: unit.bounds.start.y + (unit.padding * 2),
            style: unitTemplate.text.style,
        };
    };
};

const generateUnits = (area) => {
    const unitWidth = area.bounds.width / area.grid.columns;
    const unitHeight = area.bounds.height / area.grid.rows;

    for (let column = 0; column < area.grid.columns; column++) {
        for (let row = 0; row < area.grid.rows; row++) {
            const unitTemplate = area.unitTemplates[area.grid.columns * row + column];
            
            const unitObject = {
                areaType: area.type,
                bounds: {
                    start: {
                        x: (area.bounds.start.x + (column * unitWidth)),
                        y: (area.bounds.start.y + (row * unitHeight))
                    },
                    width: unitWidth,
                    height: unitHeight,
                },
                padding: area.padding
            };
                
            if (area.type === "buttons") {
                unitObject.occupiedBy = generateButton(unitTemplate, unitObject, (area.grid.columns * row + column))
            } else unitObject.occupiedBy = [];

            area.units.push(unitObject);
        };
    };
};

const resetHoveredUnit = () => {
    if (hoveredUnit === null) return;
    hoveredUnit = null;
};

const getUnitFromArea = (mousePosition, page) => {
    for (let i = 0; i < page.areas.length; i++) {
        if (isInBounds(mousePosition, page.areas[i].bounds) === true) {
            return whichUnit(page.areas[i], mousePosition);
        };
    };
};

const copyObject = (object) => JSON.parse(JSON.stringify(object));

const areaHoverActions = {
    ["buttons"]: (mousePosition, unit) => {
        if (isInBounds(mousePosition, unit.occupiedBy.bounds)) hoveredUnit = unit;
        else resetHoveredUnit();
    },
    ["slot"]: (mousePosition, unit) => console.log("SLOT ACTION"),
    ["text-input"]: () => console.log("TEXT INPUT ACTION")
};

const onMouseMove = (e) => {
    const mousePosition = getPosition(e);
    const unit = getUnitFromArea(mousePosition, pages[pageQueue[pageQueue.length-1]]);
    if (unit === undefined) resetHoveredUnit();
    else areaHoverActions[unit.areaType](mousePosition, unit);
    render();
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
                        behavior: buttonActions["new-game"],
                        clickable: true
                    },
                    
                    {
                        name: "load-game-button",
                        text: {value: "LOAD GAME", style: "20px sans-serif"},
                        behavior: () => {
                            // document.addEventListener("keypress", passwordInput);
                            buttonActions["load-game"]();
                        },
                        clickable: true
                    }
                ]
            }
        ],
        componentsToRender: []
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
        componentsToRender: []
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
                units: [],
                unitTemplates: [
                    {
                        name: "play-continue-button",
                        text: {value: password !== null ? "CONTINUE" : "PLAY", style: "20px sans-serif"},
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
        componentsToRender: []
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
        componentsToRender: []
    }
}

onGameStart();