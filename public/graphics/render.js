import mouseUnit from "../storage/mouse-unit.js";
import areas from "../storage/areas.js";
import draw from "./draw.js";

const inventoryArea = areas[1];
const fieldArea = areas[0];

const renderFieldPipes = () => {
    for (let i = 0; i < fieldArea.units.length; i++) {
        const unit = fieldArea.units[i];
        if (unit.occupiedBy.length > 0) {
            draw.item(unit, fieldArea.mod, unit.occupiedBy[0].kind);
        };
    };
};

const renderInventoryPipes = () => {
    for (let i = 0; i < inventoryArea.units.length; i++) {
        const unit = inventoryArea.units[i];
        if (unit.occupiedBy.length > 0) {
            draw.item(unit, inventoryArea.mod, unit.occupiedBy[0].kind);
        };
    };
};

const renderStackNumbers = () => {
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
};

const renderGrabbed = () => {
    if (mouseUnit.grabbed.length !== 0) {
        draw.item(mouseUnit, mouseUnit.mod, mouseUnit.grabbed[0].kind);
    };
};

export default function render() {
    draw.clearScreen();
    draw.screen();
    draw.menuOutline();
    if (mouseUnit.width !== 0) {
        draw.hoverSquare(
            mouseUnit.unit.start.x + 2,
            mouseUnit.unit.start.y + 2,
            mouseUnit.area.grid.rule() - 4,
            mouseUnit.area.grid.rule() - 4
        );
    };
    renderStackNumbers();
    renderInventoryPipes();
    renderFieldPipes();
    renderGrabbed();
    
};