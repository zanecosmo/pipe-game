import areas from "../storage/areas.js";
import pieces from "../storage/piece-templates.js";
import items from "../storage/items.js"
import pages from "../pages.js";
import state from "../storage/state.js"
import handlers from "../event-handlers.js";
import render from "../graphics/render.js";
import levelsArea from "../storage/levels-area.js";

const canvas = document.getElementById("screen");

const inventoryArea = areas[1];

export default {
    createGrid: function(area) {
        for (let row = 0; row < area.grid.rows; row++) {
            for (let i = 0; i < area.grid.columns; i++) {

                const unitObject = {
                    area: area.name,
                    start: {
                        x: (area.bounds.start.x + (i*area.grid.rule())),
                        y: (area.bounds.start.y + (row*area.grid.rule()))
                    },
                    width: area.grid.rule(),
                    mod: area.mod,
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

    startFirstLevel: function() {
        this.fillInventory(state.level);
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

    start: function() {
        this.layoutGrids();
        this.createGrid(levelsArea);
    }
};