import draw from "./draw.js";
import { hoveredUnit } from "./state.js";
import {pages, mouseUnit} from "./static-pages.js";

const unitTypeRenderers = {
    ["buttons"]: (unit, hoveredUnit) => draw.button(unit, hoveredUnit),
    ["slots"]: (unit, hoveredUnit) => {
        if (unit.occupiedBy.slot.length > 0) {
            draw.item(unit);
            // console.log(unit.areaType);
        };
    },
    ["text-input"]: () => console.log("TEXT INPUT")
};

const renderUnits = (area) => {
    for (let i = 0; i < area.units.length; i++) {
        const unit = area.units[i];
        // console.log(unit);
        const start = unit.bounds.start;
        if (area.name === "inventory") draw.stackQuantity(unit.occupiedBy.slot.length, start.x, start.y)
        unitTypeRenderers[area.type](area.units[i], hoveredUnit);
    }
};

const renderAreas = (currentPage) => {
    for (let i = 0; i < currentPage.areas.length; i++) {
        if (currentPage.areas[i].isModal) draw.modal(currentPage.areas[i]);
        renderUnits(currentPage.areas[i]);
    };
};

export default (currentPage) => {
    draw.clearScreen();
    draw.screen();
    renderAreas(currentPage);
    if (currentPage.title !== null) draw.title(currentPage.title);
    if (mouseUnit.occupiedBy.slot.length > 0) draw.item(mouseUnit);
};