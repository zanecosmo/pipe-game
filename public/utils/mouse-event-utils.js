import areas from "../storage/areas.js";
import mouseUnit from "../storage/mouse-unit.js";

import buttons from "../storage/buttons.js";


const canvas = document.getElementById("screen");

const isInBounds = (position, bounds) => {
    if (position.x < bounds.start.x + bounds.width
        && position.x >= bounds.start.x
        && position.y < bounds.start.y + bounds.height
        && position.y >= bounds.start.y
        ) {return true}
        else return false
};

export default {
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
            if (isInBounds(position, area) === true) {
                return area;
            }
        };
    },

    setButtonHover: function(position) {
        for (const button in buttons) {
            const btn = buttons[button];
            btn.hover = false;
            if (isInBounds(position, btn.bounds) === true) {
                // console.log(butt);
                btn.hover = true;
            };
        };
    },

    whichButton: function(position) {
        for (const button in buttons) {
            const btn = buttons[button];
            if (isInBounds(position, btn.bounds) === true) {
                return btn;
            };
        };
    },

    whichUnit: function(area, position) {
        const eventPositionX = position.x - area.start.x;
        const eventPositionY = position.y - area.start.y;
    
        const unitRule = area.grid.rule();
    
        const unitsDeepX = Math.floor(eventPositionX/unitRule);
        const unitsDeepY = Math.floor(eventPositionY/unitRule);
    
        const foundUnit = unitsDeepY*area.grid.columns+unitsDeepX;
    
        return area.units[foundUnit];
    },

    updateMouseUnit: function(mousePosition, area, unit) {
        mouseUnit.start.x = mousePosition.x - (area.grid.rule()/2);
        mouseUnit.start.y = mousePosition.y - (area.grid.rule()/2);
        mouseUnit.width = area.grid.rule()
        mouseUnit.mod = area.mod;
        mouseUnit.area = area;
        mouseUnit.unit = unit;
    }
};