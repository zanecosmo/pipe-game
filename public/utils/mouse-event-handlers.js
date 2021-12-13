import areas from "../storage/areas.js";
import mouseUnit from "../storage/mouse-unit.js";
import game from "./game-actions.js";
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
            const butt = buttons[button];
            butt.hover = false;
            if (isInBounds(position, butt.bounds) === true) {
                // console.log(butt);
                butt.hover = true;
            };
        };
    },

    // playPressCheck: function(position) { //////////////////////////////////////////////////////////
    //     if (
    //         position.x < playButton.start.x + playButton.width
    //         && position.x >= playButton.start.x
    //         && position.y < playButton.start.y + playButton.height
    //         && position.y >= playButton.start.y
    //         ) {
    //             game.startGame() ////////////////////////////////////////////////////////////
    //     }
    // },

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