export default {
    ["start-page"]: {
        components: ["game-title", "play-button", "levels-button"],
        events: ["mousemove", "click"],
        buttons: ["play-button", "levels-button"]
    },
    
    ["play-page"]: {
        components: ["hover-square" ,"menu-outline", "stack-numbers", "inventory-pipes", "field-pipes", "grabbed", "exit-button"],
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

// let pageQueue = ["start-menu"];

// const addPageToQueue = (pagename) => pageQueue.push(pagename);
// const closeOut = () => pageQueue.pop(pageQueue[pageQueue.length-1]);

// const openGameMenu = () => addPageToQueue("game-menu");

// const buttons = {
//     ["new-game"]: {
//         text: {
//             value: "NEW GAME",
//             x: 226,
//             y: 222,
//             style: "20px sans-serif",
//         },
//         borderBounds: {
//             x: 200,
//             y: 200,
//             width: 100,
//             height: 28
//         },
//         inactive: false,
//         hover: false,
//         onClick: openGameMenu
//     },
//     ["load-game"]: {
//         text: {
//             value: "LOAD SAVED GAME",
//             x: 226,
//             y: 262,
//             style: "20px sans-serif",
//         },
//         borderBounds: {
//             x: 200,
//             y: 240,
//             width: 100,
//             height: 28
//         },
//         inactive: false,
//         hover: false,
//         onClick: openGameMenu
//     },
//     ["play-button"]: {
//         bounds: {
//             start: {x: 200, y: 200},
//             width: 100,
//             height: 28
//         },
//         text: {
//             start: {x: 226, y: 222},
//             value: "PLAY",
//             style: "20px sans-serif"
//         },
//         hover: false,
//         clickAction: startLevelOne
//     },
// };

// const onClick = () => {
//     // if it is on a button:

// }

// screen.addEventListener("click", onClick);

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

// const discernUnit = (area, position) => {
//     const eventPositionX = position.x - area.bounds.start.x;
//     const eventPositionY = position.y - area.bounds.start.y;

//     const unitWidth = area.grid.unitWidth();
//     const unitHeight = area.grid.unitHeight();

//     const unitsDeepX = Math.floor(eventPositionX/unitWidth);
//     const unitsDeepY = Math.floor(eventPositionY/unitHeight);

//     const pageUnit =  {
//         type: area.type,
//         areas: [{
//             bounds: {
//                 start: {
//                     x: unitsDeepX*unitWidth,
//                     y: unitsDeepY*unitHeight
//                 },
//                 width: unitWidth,
//                 height: unitHeight
//             }
//         }]
        
//     };
    
    
//     // unitsDeepY*area.grid.columns+unitsDeepX;

//     return pageUnit;
// };

// const onMouseMove = (page) => {
//     return function curriedMouseMove(e) {
//         const mousePosition = getPosition(e)
//         for (let i = 0; i < page.areas.length; i++) {
//             if (isInBounds(mousePosition, page.areas[i].bounds)) {
//                 discernUnit(page.areas[i], mousePosition);

//             }
//         }
//     }
// }

// /*
// on mouse move:
//     see if mouse position falls within an area bounds
//         if it does not:
//             if hovered state is not null: set to null
//             if hovered state is null: do nothing
//         if it does: find out which unit it is in

//             if given unit type is button: find out if mouse falls within that unit's button bounds
//                 if it does not: 
//                     if hovered state is not null: set to null
//                     if hovered state is null: do nothing
//                 if it does: 
//                     turn that buttons hover state to true
//                     and set hovered state to that button
//             if unit type is slot: update mouse unit
//     rerender()
// */

// const findArea = (mousePosition, page) => {
//     for (let i = 0; i < page.areas.length; i++) {
//         if (isInBounds(mousePosition, page.areas[i].bounds)) {
//             return discernUnit(page, mousePosition);
//         } else {
//             if (hoveredState === !null) hoveredState = null
//             else return;
//         };
//     };
// };

// const onMouseMove = (e) => {
//     const mousePosition = getPosition(e);
//     const page = pageQueue[pageQueue.length-1];

//     const findArea
    
    
    
    
    
//     const mousePosition = getPosition(e);
//     let recursed = false;
//     const discernArea = (page) => {
//         for (let i = 0; i < page.areas.length; i++) {
//             if (isInBounds(mousePosition, page.areas[i].bounds)) {
//                 if (recursed) {
//                     const pageUnit = discernUnit(page.areas[i], mousePosition);
//                     discernArea(pageUnit);
//                     recursion++;
//                 } else {return }
//             }
//         }
//     }
//     discernArea(pageQueue[pageQueue.length-1]);
// }

// screen.addEventListener("mousemove", onMouseMove(pageQueue[pageQueue.length-1]));

// const buttonClick = (button) => button.onClick();

// const buttonAreaWidth = 300;
// const buttonAreaHeight = 120;

// const pages = {
//     ["start-menu"]: {
//         title: {
//             text: "PIPE-CONNECT",
//             x: 40,
//             y: 180
//         },
//         areas: [{
//             name: "start-menu-buttons",
//             type: "buttons",
//             bounds: {
//                 start: {x: 150, y: 200},
//                 width: buttonAreaWidth,
//                 height: buttonAreaHeight
//             },
//             grid: {
//                 rows: 3,
//                 columns: 1,
//                 unitWidth: function() {return buttonAreaWidth/this.columns},
//                 unitHeight: function() {return buttonAreaHeight/this.rows}
//             },
//             behavior: buttonClick,
//             ["buttons"]: [
//                 buttons["new-game"],
//                 buttons["load-game"]
//             ]
//         }],
//         eventListeners: [
//             () => {

//             }
//         ]
//     }
// }