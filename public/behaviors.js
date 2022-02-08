import render from "./render.js";
import {pageQueue, getCurrentPage} from "./state.js";
import {hoveredUnit, setHoveredUnit} from "./state.js";
import {
    pushPageToQueue,
    popPageFromQueue,
    grabItem,
    placeItem,
    extractState,
    addRotateListener,
    removeRotateListener,
    emptyMouseUnit,
    resetGamePageSlots
} from "./button-helpers.js";

const behaviors = {    
    ["level-select"]: (levelSelectMenu) => {
        pushPageToQueue(levelSelectMenu);
        render();
    },
    ["select-given-level"]: (gameplayPage, levelIndex) => {
        if (pageQueue[pageQueue.length -2] === gameplayPage) popPageFromQueue();
        else pushPageToQueue(gameplayPage);

        emptyMouseUnit();
        resetGamePageSlots();
        extractState(levelIndex);
        addRotateListener();
        render();
    },
    ["restart-level"]: () => console.log("RESTART BUTTON PRESSED"),
    ["field-action"]: () => {
        const hoveredSlot = hoveredUnit.occupiedBy.slot;
        // if (hoveredSlot[0])
        const mouseSlot = getCurrentPage().mouseUnit.occupiedBy.slot;

        if (hoveredSlot.length === 0) {
            if (mouseSlot.length === 0) return;
            else {
                placeItem();
                return render();
            };
        };

        if (hoveredSlot.length > 0) {
            if (mouseSlot.length === 0) grabItem();
            else return render();
        };
    },
    ["inventory-action"]: () => {
        const hoveredSlot = hoveredUnit.occupiedBy.slot;
        const mouseSlot = getCurrentPage().mouseUnit.occupiedBy.slot;

        if (hoveredSlot.length === 0) {
            if (mouseSlot.length === 0) return;
            else {
                placeItem();
                return render();
            };
        };

        if (hoveredSlot.length > 0) {
            if (mouseSlot.length === 0) grabItem("inventory");
            else if (mouseSlot[0].kind === hoveredSlot[0].kind) {
                placeItem("inventory");
                render();
            }
            else render();
        };
    },

    ["page-close-out"]: () => {
        if (getCurrentPage().title === null) removeRotateListener();
        popPageFromQueue();
        setHoveredUnit(null);
        render();
    }
};

export {behaviors};