// TODO
/*
1. refactor this bad boy, i can't tell whats going on
2. render rotation
3. enable pipe-connections
4. figure out how to handle open pipe connections
5. figure out how to "fill" all connectd pipes
6. render "filling" of the pipes
*/

import {canvas, c} from "./utils.js";
import draw from "./render.js";
import areas from "./areas.js";

const layoutGrids = () => {
    const createGrid = (area) => {
        let totalUnits = 0;
        for (let row = 0; row < area.grid.rows; row++) {
            for (let i = 0; i < area.grid.columns; i++) {

                area.units.push({ // defines LOGICAL unit
                    area: area.name,
                    start: {
                        x: (area.start.x + (i*area.grid.rule())),
                        y: (area.start.y + (row*area.grid.rule()))
                    },
                    width: area.grid.rule(),
                    height: area.grid.rule(),
                    occupiedBy: []
                });

                totalUnits++;
            };
        };
    };
    for (let i = 0; i < areas.length; i++) createGrid(areas[i]);
};

const inventoryArea = areas[1];

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

const renderInventoryPipes = () => {
    for (let i = 0; i < inventoryArea.units.length; i++) {
        const unit = inventoryArea.units[i];
        if (unit.occupiedBy.length > 0) draw.item(unit, inventoryArea.mod, unit.occupiedBy[0].kind);
    };
};

const items = [
    {number: 2, kind: "end-cap", position: 0},
    {number: 2, kind: "two-way", position: 1},
    {number: 2, kind: "three-way", position: 2},
    {number: 2, kind: "four-way", position: 3},
    {number: 2, kind: "elbow", position: 4},
];

const peices = {
    ["end-cap"]: {
        kind: "end-cap",
        connectable: [
            {top: null},
            {right: false},
            {bottom: null},
            {left: null}
        ]
    },
    ["two-way"]: {
        kind: "two-way",
        connectable: [
            {top: null},
            {right: false},
            {bottom: null},
            {left: false}
        ]
    },
    ["three-way"]: {
        kind: "three-way",
        connectable: [
            {top: null},
            {right: false},
            {bottom: false},
            {left: false}
        ]
    },
    ["four-way"]: {
        kind: "four-way",
        connectable: [
            {top: false},
            {right: false},
            {bottom: false},
            {left: false}
        ]
    },
    ["elbow"]: {
        kind: "elbow",
        connectable: [
            {top: null},
            {right: null},
            {bottom: false},
            {left: false}
        ]
    },
}

const createItem = (item) => {
    inventoryArea.units[item.position].occupiedBy.push(peices[item.kind]);
};

const fillInventory = () => {
    for (let i = 0; i < items.length; i++) {
        for (let j = 0; j < items[i].number; j++) createItem(items[i]);
    };
    render();
};

const renderFieldPipes = () => {
    for (let i = 0; i < areas[0].units.length; i++) {
        const unit = areas[0].units[i];
        if (unit.occupiedBy.length > 0) draw.item(unit, areas[0].mod, unit.occupiedBy[0].kind);
    };
};

const mouseUnit = {
    start: {x: 0, y: 0},
    width: 0,
    area: null,
    unit: null,
    mod: 0
};

const render = () => {
    c.clearRect(0, 0, canvas.width, canvas.height);
    draw.screen();
    draw.menuOutline();
    if (mouseUnit.area !== null) {
        // console.log(mouseUnit);
        draw.hoverSquare( ///////////////////////////////
            mouseUnit.unit.start.x + 2,
            mouseUnit.unit.start.y + 2,
            mouseUnit.area.grid.rule() - 4,
            mouseUnit.area.grid.rule() - 4
        );
    };
    renderStackNumbers();
    renderInventoryPipes();
    renderFieldPipes();
};

const getEventPosition = (e) => {
    const screen = canvas.getBoundingClientRect();
    const mousePosition = {
        x: e.clientX - screen.left,
        y: e.clientY - screen.top
    };
    return mousePosition;
};

const whichArea = (position) => {
    for (let i = 0; i < areas.length; i++) {
        const area = areas[i];
        if (
            position.x < area.start.x + area.width
            && position.x > area.start.x
            && position.y < area.start.y + area.height
            && position.y > area.start.y
            ) {
            return area;
        }
    };
};

const whichUnit = (area, position) => {
    for (let i = 0; i < area.units.length; i++) {
        const unit = area.units[i];
        if (
            position.x < unit.start.x +unit.width
            && position.x > unit.start.x
            && position.y < unit.start.y + unit.height
            && position.y > unit.start.y
            ) {
            return unit;
        };
    };
};

canvas.addEventListener("mousemove", (e) => {

    const mousePosition = getEventPosition(e); // gets MOUSE POSITION (X,Y) in relation to the canvas
    if (mousePosition.x > 0 && mousePosition.y > 0) {
        const area = whichArea(mousePosition); // tests MOUSE POSITION (X,Y) against all AREAS and UNITS
        const unit = whichUnit(area, mousePosition);
        
        mouseUnit.start.x = mousePosition.x - (area.grid.rule()/2);
        mouseUnit.start.y = mousePosition.y - (area.grid.rule()/2);
        mouseUnit.width = area.grid.rule()
        mouseUnit.mod = area.mod;
        mouseUnit.area = area;
        mouseUnit.unit = unit;
    };
    
    render();

    if (grabbed.length !== 0) draw.item(mouseUnit, mouseUnit.mod, grabbed[0].kind);
});

const rotateItem = () => {
    const grabbedConns = grabbed[0].connectable;
    let rotation = [];
    
    console.log(grabbedConns);
    
    for (let i = 0; i < grabbedConns.length; i++) {
        const value = Object.values(grabbedConns[i])
        rotation.push(value[0]);
    };
    
    const conndirection = rotation.pop();
    rotation.unshift(conndirection);    

    for (let i = 0; i < grabbedConns.length; i++) {
        for (const direction in grabbedConns[i]) {
            grabbedConns[i][direction] = rotation[i];
        };
    };
    
    console.log(grabbedConns);
};

document.addEventListener("keypress", (e) => {
    if (e.key === " " && grabbed.length === 1) rotateItem()
});

let grabbed = [];

const grabItem = (slot) => {
    const grabbedItem = slot.pop();
    grabbed.push(grabbedItem);
    render();
};

const placeItem = (slot) => {
    const grabbedItem = grabbed.pop();
    slot.push(grabbedItem);
};

const pressButton = (unit) => {
    // console.log(unit.occupiedBy);
};

canvas.addEventListener("click", (e) => {
    const mousePosition = getEventPosition(e);
    const area = whichArea(mousePosition);
    const unit = whichUnit(area, mousePosition);

    if (area.name === "inventory") {
        if (grabbed.length === 0) {
            if (unit.occupiedBy.length > 0) grabItem(unit.occupiedBy);
        } else {
            if (unit.occupiedBy.length > 0 && unit.occupiedBy[0].kind === grabbed[0].kind) {
                placeItem(unit.occupiedBy);
            } else if (unit.occupiedBy.length === 0) placeItem(unit.occupiedBy);
        }

    } else if (area.name === "field") {
        if (grabbed.length === 0) {
            if (unit.occupiedBy.length > 0) grabItem(unit.occupiedBy);
        } else if (unit.occupiedBy.length === 0) placeItem(unit.occupiedBy);
    
    } else if (grabbed.length === 0) {
        pressButton(unit);
    };

    render();

    // rotate grabbed item
});

draw.screen();
draw.menuOutline();

layoutGrids();
fillInventory();