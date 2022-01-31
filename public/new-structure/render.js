import draw from "./draw.js";
import { hoveredUnit } from "./state.js";

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

const renderAreas = (currentPage) => {
    for (let i = 0; i < currentPage.areas.length; i++) {
        // console.log(currentPage.areas[i].isModal);
        if (currentPage.areas[i].isModal) draw.modal(currentPage.areas[i]);
        renderUnits(currentPage.areas[i]);
    };
};

export default (currentPage) => {
    draw.clearScreen();
    draw.screen();
    if (currentPage.title !== null) draw.title(currentPage.title);
    renderAreas(currentPage);
};