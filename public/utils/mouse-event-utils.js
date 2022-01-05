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
        else return false;
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
                // console.log(btn.bounds);
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

const findAreaRecursive = (mpx, mpy, areaInQuestion) => {
    const doesAreaSubdivide = (areaInQuestion) => {
        if (areaInQuestion.columns !== null) return true;
        else return false;
    };

    if (mpx > areaInQuestion.start.x && mpx < areaInQuestion.start.x + width &&
        mpy > areaInQuestion.start.y && mpy < areaInQuestion.start.y + height) {

        if (doesAreaSubdivide(areaInQuestion) === true) {
            const posX = mpx - areaInQuestion.start.x;
            const posY = mpy - areaInQuestion.start.y;
            
            unitsDeepX = Math.floor(posX/area.columnWidth);
            unitsDeepY = Math.floor(posY/area.rowHeight);
            
            const foundUnit = unitsDeepY*areaInQuestion.columns + unitsDeepX

            findAreaRecursive(mpx, mpy, buttonArea[foundUnit]);

        } else return areaInQuestion;

    } else {
        return areaInQuestion;
    };
};