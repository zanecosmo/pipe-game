import draw from "./draw.js";
import { hoveredUnit } from "./state.js";
import {pages, mouseUnit} from "./static-pages.js";

const unitTypeRenderers = {
    ["buttons"]: (unit, hoveredUnit) => draw.button(unit, hoveredUnit),
    ["slots"]: (unit, hoveredUnit) => {
        if (hoveredUnit !== null && mouseUnit.occupiedBy.slot .length > 0) {
            draw.itemShadow(mouseUnit, hoveredUnit);
        };
        if (unit.occupiedBy.slot.length > 0) draw.item(unit)
    },
    ["text-input"]: () => console.log("TEXT INPUT")
};

const renderUnits = (area) => {
    for (let i = 0; i < area.units.length; i++) {
        const unit = area.units[i];
        const start = unit.bounds.start;
        if (area.name === "inventory" && unit.occupiedBy.slot.length > 1) {
            draw.stackQuantity(unit.occupiedBy.slot.length, start.x, start.y);
        };
        unitTypeRenderers[area.type](unit, hoveredUnit);
    };
};

const renderAreas = (currentPage) => {
    for (let i = 0; i < currentPage.areas.length; i++) {
        if (currentPage.areas[i].isModal) draw.modal(currentPage.areas[i]);
        if (currentPage.areas[0].name === "field") draw.menuBox();
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