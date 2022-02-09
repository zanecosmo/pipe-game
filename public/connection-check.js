import { hoveredUnit, setHoveredUnit, getCurrentPage } from "./state.js";

let connectedUnits = []; // start-permanent unit(s) get pushed here from button-helpers: extractState

const checkAdjacentUnit = {
    top: (unitIndex, queueIndex) => {
        const adjacentIndex = unitIndex - 8;
        const adjacentUnit = getCurrentPage().areas[0].units[adjacentIndex];
        const adjacentSlot = adjacentUnit.occupiedBy.slot;
        const queueLength = connectedUnits.length;

        if (adjacentUnit === undefined) return;
        if (adjacentSlot.length === 0) return connectedUnits.splice(queueIndex + 1, queueLength - queueIndex);
        if (adjacentSlot[0].connections[2].bottom !== true) return;
        if (!connectedUnits.includes(adjacentUnit)) connectedUnits.push(adjacentUnit);
    },
    right: (unitIndex, queueIndex) => {
        const adjacentIndex = unitIndex + 1;
        const adjacentUnit = getCurrentPage().areas[0].units[adjacentIndex];
        const adjacentSlot = adjacentUnit.occupiedBy.slot;
        const queueLength = connectedUnits.length;

        if (adjacentUnit === undefined || adjacentIndex % 8 === 0) return;
        if (adjacentSlot.length === 0) return connectedUnits.splice(queueIndex + 1, queueLength - queueIndex);
        if (adjacentSlot[0].connections[3].left !== true) return;
        if (!connectedUnits.includes(adjacentUnit)) connectedUnits.push(adjacentUnit);
    },
    bottom: (unitIndex, queueIndex) => {
        const adjacentIndex = unitIndex + 8;
        const adjacentUnit = getCurrentPage().areas[0].units[adjacentIndex];
        const adjacentSlot = adjacentUnit.occupiedBy.slot;
        const queueLength = connectedUnits.length;

        if (adjacentUnit === undefined) return;
        if (adjacentSlot.length === 0) return connectedUnits.splice(queueIndex + 1, queueLength - queueIndex);
        if (adjacentSlot[0].connections[0].top !== true) return;
        if (!connectedUnits.includes(adjacentUnit)) connectedUnits.push(adjacentUnit);
    },
    left: (unitIndex, queueIndex) => {
        const adjacentIndex = unitIndex - 1;
        const adjacentUnit = getCurrentPage().areas[0].units[adjacentIndex];
        const adjacentSlot = adjacentUnit.occupiedBy.slot;
        const queueLength = connectedUnits.length;

        if (adjacentUnit === undefined || unitIndex % 8 === 0) return;
        if (adjacentSlot.length === 0) return connectedUnits.splice(queueIndex + 1, queueLength - queueIndex);
        if (adjacentSlot[0].connections[1].right !== true) return;
        if (!connectedUnits.includes(adjacentUnit)) connectedUnits.push(adjacentUnit);
    }
};

const checkConnections = () => {
    for (let i = 0; i < connectedUnits.length; i++) {
        const connections = connectedUnits[i].occupiedBy.slot[0].connections;
        for (let j = 0; j < connections.length; j++) {
            for (const direction in connections[j]) {
                if (connections[j][direction] === true)  {
                    checkAdjacentUnit[direction](connectedUnits[i].occupiedBy.name, i);
                };
            };
        };
    };
    
    if (connectedUnits[connectedUnits.length - 1].occupiedBy.slot[0].type === "end-permanent") {
        console.log("LEVEL-COMPLETE");
    };
};

export { checkConnections, connectedUnits };