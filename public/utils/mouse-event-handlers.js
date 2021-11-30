import areas from "../storage/areas.js";
import mouseUnit from "../storage/mouse-unit.js";

const canvas = document.getElementById("screen");

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
            if (
                position.x < area.start.x + area.width
                && position.x >= area.start.x
                && position.y < area.start.y + area.height
                && position.y >= area.start.y
                ) {
                return area;
            }
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