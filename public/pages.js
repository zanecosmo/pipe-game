// import state from "./storage/state";

export default {
    ["start-page"]: {
        components: ["game-title", "play-button", "levels-button"],
        events: ["mousemove", "click"],
        buttons: ["play-button", "levels-button"]
    },
    
    ["play-page"]: {
        components: ["hover-square" ,"menu-outline", "inventory", "field-pipes", "grabbed", "exit-button"],
        events: ["mousemove", "click"],
        buttons: ["exit-button"]
    },

    ["levels-page"]: {
        components: ["back-button", "level-numbers", "levels-title"],
        events: ["mousemove", "click"],
        buttons: ["back-button"],
        areas: ["level-selection"]
    }
};

// const onGameStart = () => {
//     const canvas = document.getElementById("screen");
//     populateAreas();
//     canvas.addEventListener("mousemove", onMouseMove);
//     canvas.addEventListener("click", onClick);
//     render(pageQueue[pageQueue.length-1]);
// };

// const hovered = {
    
//     behavior
// }

// let hoveredUnit = null;

// let pageQueue = ["start-menu"];

// const pushPageToQueue = (pagename) => pageQueue.push(pagename);
// const popPageFromQueue = () => pageQueue.pop(pageQueue[pageQueue.length-1]);

// const buttons = {
//     ["new-game"]: () => {
//         pushPageToQueue("game-menu");
//         render(pages[pageQueue.length-1]);  
//     },
//     ["load-game"]: () => console.log("LOAD GAME BUTTON PRESSED"),
//     ["async-load"]: () => console.log("ASYNC LOAD BUTTON PRESSED"),
//     ["play-continue"]: () => console.log("PLAY BUTTON PRESSED"),
//     ["save-progress"]: () => console.log("SAVE PROGRESS BUTTON PRESSED"),
//     ["async-save"]: () => console.log("ASYNC SAVE BUTTON PRESSED"),
//     ["close-out"]: () => {
//         popPageFromQueue();
//         if (pageQueue.length-1 !== "play-page") {
//             document.removeEventListener("keypress", whateverItIs)
//         };
//         render(pages[pageQueue.length-1]);
//     }
// };

// const onClick = () => {if (hoveredUnit !== null) hoveredUnit.behavior()};

// const isInBounds =  (position, bounds) => {
//     if (position.x < bounds.start.x + bounds.width
//         && position.x >= bounds.start.x
//         && position.y < bounds.start.y + bounds.height
//         && position.y >= bounds.start.y
//         ) {return true}
//     else return false;
// };

// const getPosition = (e) => {
//     const screen = canvas.getBoundingClientRect();
//     const eventPosition = {
//         x: e.clientX - screen.left,
//         y: e.clientY - screen.top
//     };
//     return eventPosition;
// };

// const whichUnit = (area, position) => {
//     const eventPositionX = position.x - area.bounds.start.x;
//     const eventPositionY = position.y - area.bounds.start.y;

//     const unitWidth = area.grid.unitWidth();
//     const unitHeight = area.grid.unitHeight();

//     const unitsDeepX = Math.floor(eventPositionX/unitWidth);
//     const unitsDeepY = Math.floor(eventPositionY/unitHeight);

//     const foundUnit = unitsDeepY*area.grid.columns+unitsDeepX;

//     return area.units[foundUnit];
// };

// const populateAreas = () => {
//     for (pagename in pages) {
//         const page = pages[pagename];
//         for (let i = 0; i < page.areas.length; i++) {
//             generateUnits(areas[i]);
//         };
//     };
// };

// const generateUnits = (area) => {
//     for (let column = 0; column < area.grid.columns; column++) {
//         for (let row = 0; row < area.grid.rows; row++) {
//             const unitObject = {
//                 area: area.name,
//                 name: area[area.type][area.grid.columns * row + column].name,
//                 type: area.type,
//                 bounds: {
//                     start: {
//                         x: (area.bounds.start.x + (column * area.grid.unitWidth())),
//                         y: (area.bounds.start.y + (row * area.grid.unitHeight()))
//                     },
//                     width: area.grid.unitWidth(),
//                     height: area.grid.unitHeight(),
//                 },
//                 padding: area.padding,
//                 behavior: area[area.type][area.grid.columns * row + column].behavior,
//                 occupiedBy: area.type === "buttons" ? null : []
//             };
//             area.units.push(unitObject);
//         };
//     };
// };

// const resetHoveredUnit = () => {
//     if (hoveredUnit !== null) hoveredUnit = null;
//     else return;
// }

// const getUnitFromArea = (mousePosition, page) => {
//     for (let i = 0; i < page.areas.length; i++) {
//         if (isInBounds(mousePosition, page.areas[i].bounds)) {
//             return whichUnit(page, mousePosition);
//         };
//     };
// };

// const copyObject = (object) => JSON.parse(JSON.stringify(object));

// const areaTypes = {
//     ["buttons"]: {
//         action: (mousePosition, unit) => {
//             const innerUnit = copyObject(unit);

//             innerUnit.bounds.start.x = unit.bounds.start.x + unit.padding;
//             innerUnit.bounds.start.y = unit.bounds.start.y + unit.padding;
//             innerUnit.bounds.height = unit.bounds.height - unit.padding / 2;
//             innerUnit.bounds.width = unit.bounds.width - unit.padding / 2;

//             if (isInBounds(mousePosition, innerUnit.bounds)) {
//                 hoveredUnit = unit;
//             } else resetHoveredUnit()
//         }
//     },
//     ["slot"]: {
//         action: () => {

//         }
//     }
// }

// const onMouseMove = (e) => {
//     const mousePosition = getPosition(e);
//     const page = pageQueue[pageQueue.length-1];
//     const unit = getUnitFromArea(mousePosition, page);
    
//     if (unit !== undefined) {
//         areaType[unit.type].action(mousePosition, unit);
//     } else resetHoveredUnit();
// }

// screen.addEventListener("mousemove", onMouseMove(pageQueue[pageQueue.length-1]));

// const buttonAreaWidth = 300;
// const buttonAreaHeight = 120;

// const pages = {
//     ["start-menu"]: {
//         title: {
//             text: "PIPE-CONNECT",
//             x: 40,
//             y: 180
//         },
//         areas: [
//             {
//                 name: "start-menu-buttons",
//                 type: "buttons",
//                 bounds: {
//                     start: {x: 150, y: 200},
//                     width: buttonAreaWidth,
//                     height: buttonAreaHeight
//                 },
//                 grid: {
//                     rows: 2,
//                     columns: 1,
//                     unitWidth: function() {return buttonAreaWidth/this.columns},
//                     unitHeight: function() {return buttonAreaHeight/this.rows}
//                 },
//                 padding: 10,
//                 units: [],
//                 ["buttons"]: [
//                     {
//                         name: "new-game-button",
//                         text: {
//                             value: "NEW GAME",
//                             x: 226,
//                             y: 222,
//                             style: "20px sans-serif",
//                         },
//                         bounds: {
//                             start: {x: 200, y: 200},
//                             width: 100,
//                             height: 28
//                         },
//                         behavior: buttons["new-game"],
//                     },

//                     {
//                         name: "load-game-button",
//                         text: {
//                             value: "LOAD GAME",
//                             style: "20px sans-serif"
//                         }
//                     }
//                 ]
//             }
//         ],
//         componentsToRender: [
//             this
//         ]
//     },
// }