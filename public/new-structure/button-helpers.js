import {hoveredUnit, pageQueue, getCurrentPage} from "./state.js";
import eventHandlers from "./event-handlers.js";
import gameInstance from "./game-instance.js";
import pieceRotations from "./piece-rotations.js";

const copy = (item) => JSON.parse(JSON.stringify(item));
const pushPageToQueue = (page) => pageQueue.push(page);
const popPageFromQueue = () => pageQueue.pop();
const emptyMouseUnit = () => getCurrentPage().mouseUnit.occupiedBy.slot = [];
const addRotateListener = () => document.addEventListener("keypress", eventHandlers.rotateKeypress);
const removeRotateListener = () => document.removeEventListener("keypress", eventHandlers.rotateKeypress);

const resetGamePageSlots = () => {
    const currentPage = getCurrentPage();
    for (let i = 0; i < currentPage.areas.length; i++) {
        const area = currentPage.areas[i];
        if (area.type !== "slots") continue;
        for (let j = 0; j < area.units.length; j++) area.units[j].occupiedBy.slot = [];
    };
};

const grabItem = () => {
    const grabbedItem = hoveredUnit.occupiedBy.slot.pop();
    getCurrentPage().mouseUnit.occupiedBy.slot.push(grabbedItem);
};

const placeItem = () => {
    const grabbedItem = getCurrentPage().mouseUnit.occupiedBy.slot.pop();
    hoveredUnit.occupiedBy.slot.push(grabbedItem);
};

const extractState = (levelIndex) => {
    const state = gameInstance[levelIndex].state;
    const gamePageAreas = getCurrentPage().areas;
    
    let areaIndex = 0;
    for (const area in state) {;
        
        if (state[area].length === 0)  {
            areaIndex++
            continue;
        };

        for (let pieceTemplate = 0; pieceTemplate < state[area].length; pieceTemplate++) {
            const piece = copy(state[area][pieceTemplate]);
            piece.connections = copy(pieceRotations[piece.type]);
            gamePageAreas[areaIndex].units[piece.position].occupiedBy.slot.push(piece);
        };

        areaIndex++;
    };
};

export {
    pushPageToQueue,
    popPageFromQueue,
    grabItem,
    placeItem,
    extractState,
    resetGamePageSlots,
    addRotateListener,
    removeRotateListener,
    emptyMouseUnit
};