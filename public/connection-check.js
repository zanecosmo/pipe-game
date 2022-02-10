import { hoveredUnit, setHoveredUnit, getCurrentPage } from "./state.js";

let connectedUnits = []; // start-permanent unit(s) get pushed here from button-helpers: extractState

const getNonStartIndex = (queueIndex) => {
    const indexToCheck = queueIndex + 1;
    const nextInQueue = connectedUnits[indexToCheck];
    if (nextInQueue === undefined) return 0;
    
    const slot = nextInQueue.occupiedBy.slot;
    if (slot.length === 0) return indexToCheck;
    if (slot[0].type === "start-permanent") return getNonStartIndex(indexToCheck);
    else return indexToCheck;
};

const cullDisconnected = (queueIndex) => {
    const index = getNonStartIndex(queueIndex);
    if (index === 0) return;
    
    const queueLength = connectedUnits.length;
    connectedUnits.splice(index, queueLength - index);
};

const pushAdjacentIfSo = (fieldUnitIndex, direction, queueIndex) => {
    const adjacentIndex = openings[direction].adjacentIndex(fieldUnitIndex);
    const adjacentUnit = getCurrentPage().areas[0].units[adjacentIndex];
    
    if (openings[direction].hasNoAdjacent(adjacentIndex)) return;
    if (adjacentUnit.occupiedBy.slot.length === 0) return cullDisconnected(queueIndex);

    const adjacentDirections = adjacentUnit.occupiedBy.slot[0].connections;
    if (openings[direction].adjacentDirectionIsOpen(adjacentDirections)) return;

    if (!connectedUnits.includes(adjacentUnit)) connectedUnits.push(adjacentUnit);
};

const openings = { // "adj-" = "adjacent"
    top: {
        adjacentIndex: (unitIndex) => unitIndex - 8,
        hasNoAdjacent: (adjUnit, _adjIndex) => adjUnit === undefined,
        adjacentDirectionIsOpen: (connections) => connections[2].bottom !== true,
    },
    right: {
        adjacentIndex: (unitIndex) => unitIndex + 1,
        hasNoAdjacent: (adjUnit, adjIndex) => adjUnit === undefined || adjIndex % 8 === 0,
        adjacentDirectionIsOpen: (connections) => connections[3].left !== true
    },
    bottom: {
        adjacentIndex: (unitIndex) => unitIndex + 8,
        hasNoAdjacent: (adjUnit, _adjIndex) => adjUnit === undefined,
        adjacentDirectionIsOpen: (connections) => connections[0].top !== true,
    },
    left: {
        adjacentIndex: (unitIndex) => unitIndex - 1,
        hasNoAdjacent: (adjUnit, adjIndex) => adjUnit === undefined || (adjIndex + 1) % 8 === 0,
        adjacentDirectionIsOpen: (connections) => connections[1].right !== true,
    }
};

const checkConnections = () => {
    for (let i = 0; i < connectedUnits.length; i++) {
        const currentUnit = connectedUnits[i];
        if (connectedUnits[i].occupiedBy.slot[0] === undefined) break;

        const connections = connectedUnits[i].occupiedBy.slot[0].connections;
        for (let j = 0; j < connections.length; j++) {

            for (const direction in connections[j]) {
                if (connections[j][direction]) pushAdjacentIfSo(currentUnit.occupiedBy.name, direction, i);
            };
        };
    };
    
    if (connectedUnits[connectedUnits.length - 1].occupiedBy.slot[0].type === "end-permanent") {
        console.log("LEVEL-COMPLETE");
    };
};

export { checkConnections, connectedUnits };