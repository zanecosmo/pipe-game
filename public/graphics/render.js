import mouseUnit from "../storage/mouse-unit.js";
import areas from "../storage/areas.js";
import buttons from "../storage/buttons.js";
import levelsArea from "../storage/levels-area.js";
import draw from "./draw.js";

const inventoryArea = areas[1];
const fieldArea = areas[0];
const levelArea = levelsArea[0];

const renders = {
    ["field-pipes"]: () => {
        for (let i = 0; i < fieldArea.units.length; i++) {
            const unit = fieldArea.units[i];
            if (unit.occupiedBy.length > 0) {
                draw.item(unit, fieldArea.mod, unit.occupiedBy[0].kind);
            };
        };
    },

    ["inventory"]: () => {
        for (let i = 0; i < inventoryArea.units.length; i++) {
            const unit = inventoryArea.units[i];
            if (unit.occupiedBy.length > 0) {
                draw.item(unit, inventoryArea.mod, unit.occupiedBy[0].kind);
                draw.stackQuantity(unit.occupiedBy.length, unit.start.x, unit.start.y);
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
        }
    },

    ["game-title"]: () => {
        draw.gameTitle();
    },

    ["play-button"]: () => {
        draw.button(buttons["play-button"]);
    },

    ["back-button"]: () => {
        draw.button(buttons["back-button"]);
    },

    ["exit-button"]: () => {
        draw.button(buttons["exit-button"]);
    },

    ["levels-button"]: () => {
        draw.button(buttons["levels-button"]);
    },

    ["level-numbers"]: () => { ////////////////////////////////////////////////
        for (let i = 0; i < levelsArea.units.length; i++) {
            const unit = levelsArea.units[i];

            if (unit === mouseUnit.unit) {
                draw.levelNumber((i+1), unit, true)
            } else {
                draw.levelNumber((i+1), unit, false);
            };
        };
    },

    ["levels-title"]: () => {
        draw.levelsTitle();
    }
};

export default function render(pageComponents) {
    // console.log(buttons["back-button"]);
    draw.clearScreen();
    draw.screen();
    for (let i = 0; i < pageComponents.length; i++) {
        renders[pageComponents[i]]();
    };
};

