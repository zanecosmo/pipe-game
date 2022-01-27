// import game from "./utils/game-actions.js";
// console.log("REWRITE BRANCH");
// game.addEventListeners();
// game.start();

import render from "./render.js";
import pages from "./pages.js";
import handlers from "./handlers.js";

const onGameStart = () => {
    const canvas = document.getElementById("screen");
    populateAreas();
    canvas.addEventListener("mousemove", handlers.onMouseMove);
    canvas.addEventListener("click", handlers.onClick);
    render();
};

const populateAreas = () => {
    for (const pagename in pages) {
        const page = pages[pagename];
        for (let i = 0; i < page.areas.length; i++) {
            generateUnits(page.areas[i]);
        };
    };
};

const generateButton = (unitTemplate, unit, unitNumber) => {
    const button = {
        name: unitTemplate.name,
        bounds: {
            start: {
                x: unit.bounds.start.x + unit.padding,
                y: (unit.bounds.start.y + unit.padding)
            },
            width: unit.bounds.width - (unit.padding * 2),
            height: unit.bounds.height - (unit.padding * 2)
        },
        behavior: unitTemplate.behavior,
        clickable: unitTemplate.clickable
    };

    // TODO attach modal type to area, rather than unit, somehow
    // TODO render border around area (or not if it isn't a modal)
    // TODO render modal text

    if (unitTemplate.name === "play-level-button") {
        button.status = levels[unitNumber].status;
        button.text = {
            value: levels[unitNumber].number,
            x: unit.bounds.start.x + (unit.padding * 2),
            y: unit.bounds.start.y + (unit.padding * 2),
            style: unitTemplate.text.style,
        };
        if (button.status === "locked") button.clickable = false;
        return button;
    };

    if (unitTemplate.name === "new-game-modal-button" || unitTemplate.name === "modal-exit") {
        const pseudoStart = unit.bounds.width / 2;
        button.bounds.start.x = unit.bounds.start.x + pseudoStart;
        button.bounds.width = unit.bounds.width - pseudoStart - unit.padding;
    };

    button.text = {
        value: unitTemplate.text.value,
        x: button.bounds.start.x + (button.bounds.width / 2),
        y: button.bounds.start.y + (button.bounds.height / 2),
        style: unitTemplate.text.style,
    };

    return button;
};

const generateUnits = (area) => {
    const unitWidth = area.bounds.width / area.grid.columns;
    const unitHeight = area.bounds.height / area.grid.rows;

    for (let column = 0; column < area.grid.columns; column++) {
        for (let row = 0; row < area.grid.rows; row++) {
            const index = area.grid.columns * row + column;
            const unitTemplate = area.unitTemplates[index];
            
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
                
            // TODO console.log(unitTemplate); 3 "undefined"s in console BUG

            if (area.type === "buttons" || area.type === "modal-buttons") {
                unitObject.occupiedBy = generateButton(unitTemplate, unitObject, index)
            } else unitObject.occupiedBy = [];
            area.units.push(unitObject);
        };
    };
};

onGameStart();