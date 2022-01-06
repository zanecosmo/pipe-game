import mouseUnit from "./storage/mouse-unit.js";
import player from "./utils/player-actions.js";
import mouseEvent from "./utils/mouse-event-utils.js";
import render from "./graphics/render.js";
import pages from "./pages.js";
import state from "./storage/state.js"
import levelsArea from "./storage/levels-area.js"

export default {
    ["start-page"]: {
        ["mousemove"]: function(e) {
            const mousePosition = mouseEvent.getPosition(e);
            mouseEvent.setButtonHover(mousePosition);

            render(pages[state.page].components);
        },

        ["click"]: function(e) {
            const mousePosition = mouseEvent.getPosition(e);
            const button = mouseEvent.whichButton(mousePosition);
            if (button !== undefined){
                button.clickAction(button.link);
                mouseEvent.setButtonHover(mousePosition);
            };
            render(pages[state.page].components)
        }
    },

    ["play-page"]: {
        ["mousemove"]: function(e) {
            const mousePosition = mouseEvent.getPosition(e);
            mouseEvent.setButtonHover(mousePosition);
            if (mousePosition.x > 0 && mousePosition.y > 0) {
                const area = mouseEvent.whichArea(mousePosition);
                if (area !== undefined) {
                    const unit = mouseEvent.whichUnit(area, mousePosition);
                    mouseEvent.updateMouseUnit(mousePosition, area, unit);
                };
            };
            render(pages[state.page].components);
        },

        ["click"]: function(e) {
            const mousePosition = mouseEvent.getPosition(e);

            const button = mouseEvent.whichButton(mousePosition);
            if (button !== undefined){
                button.clickAction(button.link);
                mouseEvent.setButtonHover(mousePosition);
                render(pages[state.page].components);
                return
            };

            const area = mouseEvent.whichArea(mousePosition);
            const unit = mouseEvent.whichUnit(area, mousePosition);
        
            if (area.name === "inventory") {
                if (mouseUnit.occupiedBy.length === 0) {
                    if (unit.occupiedBy.length > 0) player.grabItem(unit.occupiedBy);
                } else {
                    if (unit.occupiedBy.length > 0 && unit.occupiedBy[0].kind === mouseUnit.occupiedBy[0].kind) {
                        player.placeItem(unit.occupiedBy);
                    } else if (unit.occupiedBy.length === 0) {
                        player.placeItem(unit.occupiedBy);
                    };
                };
        
            } else if (area.name === "field") {
                if (mouseUnit.occupiedBy.length === 0) {
                    if (unit.occupiedBy.length > 0) player.grabItem(unit.occupiedBy);
                } else if (unit.occupiedBy.length === 0) {
                    player.placeItem(unit.occupiedBy);
                    // game.checkSystem(); ///////////////////////////////////////////////////////////////
                }
            
            } else if (mouseUnit.occupiedBy.length === 0) player.pressButton(unit);
        
            render(pages[state.page].components);
        },

        ["keypress"]: function(e) {
            if (e.key === " " && mouseUnit.occupiedBy.length === 1) {
                mouseUnit.occupiedBy[0].rotationState++;
                player.rotateAlt(mouseUnit.occupiedBy[0]);
                render(pages[state.page].components);
            };
        },
    },

    ["levels-page"]: { ////////////////////////////////////////////////
        ["mousemove"]: function(e) {
            const mousePosition = mouseEvent.getPosition(e);
            if (mousePosition.x > 0 && mousePosition.y > 0) {
                if (mouseEvent.isInBounds(mousePosition, levelsArea.bounds) === true) {
                    const unit = mouseEvent.whichUnit(levelsArea, mousePosition);
                    mouseEvent.updateMouseUnit(mousePosition, levelsArea, unit);
                } else {
                    mouseEvent.updateMouseUnit(mousePosition, null, null);
                    mouseEvent.setButtonHover(mousePosition);
                };
            };
            render(pages[state.page].components);
        },

        ["click"]: function(e) {
            const mousePosition = mouseEvent.getPosition(e);
            if (mousePosition.x > 0 && mousePosition.y > 0) {
                if (mouseEvent.isInBounds(mousePosition, levelsArea.bounds) === true) {
                    const unit = mouseEvent.whichUnit(levelsArea, mousePosition);
                    mouseEvent.updateMouseUnit(mousePosition, levelsArea, unit);

                } else {
                    mouseEvent.updateMouseUnit(mousePosition, null, null);
                    const button = mouseEvent.whichButton(mousePosition);
                    if (button !== undefined) {
                        button.clickAction(button.link);
                        mouseEvent.setButtonHover(mousePosition);
                     };
                };
            };
            render(pages[state.page].components)
        }
    }
};