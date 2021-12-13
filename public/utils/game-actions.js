import areas from "../storage/areas.js";
import pieces from "../storage/piece-templates.js";
import items from "../storage/items.js"
import pages from "../pages.js";
import state from "../storage/state.js"
import handlers from "../event-handlers.js";
import render from "../graphics/render.js";

const canvas = document.getElementById("screen");

const inventoryArea = areas[1];

export default {
    createGrid: function(area) {
        for (let row = 0; row < area.grid.rows; row++) {
            for (let i = 0; i < area.grid.columns; i++) {
                
                const unitObject = {
                    area: area.name,
                    start: {
                        x: (area.start.x + (i*area.grid.rule())),
                        y: (area.start.y + (row*area.grid.rule()))
                    },
                    width: area.grid.rule(),
                    occupiedBy: []
                };
                area.units.push(unitObject);
            };
        };
    },

    layoutGrids: function() {for (let i = 0; i < areas.length; i++) this.createGrid(areas[i])},

    createItem: function(item) {
        const newPiece = JSON.parse(JSON.stringify(pieces[item.kind]))
        inventoryArea.units[item.position].occupiedBy.push(newPiece);
    },

    fillInventory: function(level) {
        for (let i = 0; i < items[level].length; i++) {
            for (let j = 0; j < items[level][i].number; j++) this.createItem(items[level][i]);
        };
    },

    addEventListeners: () => {
        for (let i = 0; i < pages[state.page].events.length; i++) {
            const event = pages[state.page].events[i];
            canvas.addEventListener(event, handlers[state.page][event]);
            // console.log(`start-page: ${event}`);
        };
        if (state.page === "play-page") {
            document.addEventListener("keypress", handlers[state.page]["keypress"]);
        };

        render(pages[state.page].components);
    },

    removeEventListeners: function() {
        for (let i = 0; i < pages[state.page].events.length; i++) {
            const event = pages[state.page].events[i];
            canvas.removeEventListener(event, handlers[state.page][event])
        };

        if (state.page === "play-page") {
            document.removeEventListener("keypress", handlers[state.page]["keypress"]);
        };
    },

    // checkSystem: function() { ///////////////////////////////////////////////////////////////////////////
    //     if (system.connected.every((connected) => connected === true)) {
    //         endLevel();
    //     };
    // }
};