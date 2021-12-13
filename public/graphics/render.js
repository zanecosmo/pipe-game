import mouseUnit from "../storage/mouse-unit.js";
import areas from "../storage/areas.js";
import buttons from "../storage/buttons.js";

import draw from "./draw.js";

const inventoryArea = areas[1];
const fieldArea = areas[0];

const renders = {
    ["field-pipes"]: () => {
        for (let i = 0; i < fieldArea.units.length; i++) {
            const unit = fieldArea.units[i];
            if (unit.occupiedBy.length > 0) {
                draw.item(unit, fieldArea.mod, unit.occupiedBy[0].kind);
            };
        };
    },

    ["inventory-pipes"]: () => {
        for (let i = 0; i < inventoryArea.units.length; i++) {
            const unit = inventoryArea.units[i];
            if (unit.occupiedBy.length > 0) {
                draw.item(unit, inventoryArea.mod, unit.occupiedBy[0].kind);
            };
        };
    },

    ["stack-numbers"]: () => {
        for (let i = 0; i < inventoryArea.units.length; i++) {
            if (inventoryArea.units[i].occupiedBy.length !== 0) {
                const unit = inventoryArea.units[i];
                draw.stackQuantity(
                    unit.occupiedBy.length,
                    unit.start.x,
                    unit.start.y
                );
            };
        };
    },

    ["grabbed"]: () => {
        if (mouseUnit.occupiedBy.length !== 0) {
            draw.item(mouseUnit, mouseUnit.mod, mouseUnit.occupiedBy[0].kind);
        };
    },

    ["menu-outline"]: () => draw.menuOutline(),

    ["hover-square"]: () => {
        if (mouseUnit.width !== 0) {
            draw.hoverSquare(
                mouseUnit.unit.start.x + 2,
                mouseUnit.unit.start.y + 2,
                mouseUnit.area.grid.rule() - 4,
                mouseUnit.area.grid.rule() - 4
            );
        };
    },

    ["title"]: () => {
        draw.gameTitle();
    },

    ["play-button"]: () => {
        // console.log(buttons["play-button"].bounds);
        draw.button(buttons["play-button"]);
    },

    ["levels-button"]: () => {
        // console.log("levels-button DRAWN");
        draw.button(buttons["levels-button"]);
    }
};

export default function render(pageComponents) {
    draw.clearScreen();
    draw.screen();
    for (let i = 0; i < pageComponents.length; i++) {
        renders[pageComponents[i]]();
    };
};