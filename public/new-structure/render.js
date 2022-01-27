import draw from "./draw.js";
import { hoveredUnit } from "./state.js";
import { currentPage } from "./utils.js";

const unitTypeRenderers = {
    ["buttons"]: (unit, hoveredUnit) => draw.button(unit, hoveredUnit),
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
    for (let i = 0; i < area.units.length; i++) unitTypeRenderers[area.type](area.units[i], hoveredUnit);
};

export default () => {
    // const currentPage = pages[lastIn(pageQueue)];
    draw.clearScreen();
    draw.screen();
    if (currentPage().title !== null) draw.title(currentPage().title); 
    for (let i = 0; i < currentPage().areas.length; i++) renderUnits(currentPage().areas[i]);
};