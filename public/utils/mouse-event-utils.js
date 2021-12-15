import areas from "../storage/areas.js";
import mouseUnit from "../storage/mouse-unit.js";

import buttons from "../storage/buttons.js";


const canvas = document.getElementById("screen");

export default {
    isInBounds: function(position, bounds) {
        if (position.x < bounds.start.x + bounds.width
            && position.x >= bounds.start.x
            && position.y < bounds.start.y + bounds.height
            && position.y >= bounds.start.y
            ) {return true}
            else return false
    },

    getPosition: function(e) {
        const screen = canvas.getBoundingClientRect();
        const eventPosition = {
            x: e.clientX - screen.left,
            y: e.clientY - screen.top
        };
        return eventPosition;
    },

    whichArea: function(position) {
        for (let i = 0; i < areas.length; i++) {
            const area = areas[i];
            if (this.isInBounds(position, area.bounds) === true) {
                return area;
            };
        };
    },

    setButtonHover: function(position) {
        for (const button in buttons) {
            const btn = buttons[button];
            btn.hover = false;
            if (this.isInBounds(position, btn.bounds) === true) {
                btn.hover = true;
            };
        };
    },

    whichButton: function(position) {
        for (const button in buttons) {
            const btn = buttons[button];
            if (this.isInBounds(position, btn.bounds) === true) {
                return btn;
            };
        };
    },

    whichUnit: function(area, position) {
        const eventPositionX = position.x - area.bounds.start.x;
        const eventPositionY = position.y - area.bounds.start.y;
    
        const unitRule = area.grid.rule();
    
        const unitsDeepX = Math.floor(eventPositionX/unitRule);
        const unitsDeepY = Math.floor(eventPositionY/unitRule);
    
        const foundUnit = unitsDeepY*area.grid.columns+unitsDeepX;
    
        return area.units[foundUnit];
    },

    updateMouseUnit: function(mousePosition, area, unit) {
        if (area === null) {
            mouseUnit.start.x = 0
            mouseUnit.start.y = 0
            mouseUnit.width = 0
            mouseUnit.mod = 0;
            mouseUnit.area = area;
            mouseUnit.unit = unit;
        } else {
            mouseUnit.start.x = mousePosition.x - (area.grid.rule()/2);
            mouseUnit.start.y = mousePosition.y - (area.grid.rule()/2);
            mouseUnit.width = area.grid.rule()
            mouseUnit.mod = area.mod;
            mouseUnit.area = area;
            mouseUnit.unit = unit;
        };
    }
};