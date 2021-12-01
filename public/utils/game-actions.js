import areas from "../storage/areas.js";
import pieces from "../storage/piece-templates.js";
import items from "../storage/items.js"

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

    fillInventory: function() {
        for (let i = 0; i < items.length; i++) {
            for (let j = 0; j < items[i].number; j++) this.createItem(items[i]);
        };
    }
};