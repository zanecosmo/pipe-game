import mouseUnit from "./storage/mouse-unit.js";
import player from "./utils/player-actions.js";
import mouseEvent from "./utils/mouse-event-handlers.js";
import render from "./graphics/render.js";
import pages from "./pages.js";
import state from "./storage/state.js"
import buttons from "./storage/buttons.js"

export default {
    ["start-page"]: {
        ["mousemove"]: function(e) {
            for (let i = 0; i < pages[state.page].buttons.length; i++) {
                buttons[pages[state.page].buttons[i]].hover = false;
            };
            const mousePosition = mouseEvent.getPosition(e);
            mouseEvent.setButtonHover(mousePosition);

            render(pages[state.page].components);
        },

        ["click"]: function(e) {
            console.log("mouse clicked");
        }
    },

    ["play-page"]: {
        ["mousemove"]: function(e) {
            const mousePosition = mouseEvent.getPosition(e);
            if (mousePosition.x > 0 && mousePosition.y > 0) {
                const area = mouseEvent.whichArea(mousePosition);
                const unit = mouseEvent.whichUnit(area, mousePosition);
        
                mouseEvent.updateMouseUnit(mousePosition, area, unit);
            };
            render(pages[state.page].components);
        },

        ["click"]: function(e) {
            const mousePosition = mouseEvent.getPosition(e);
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
            console.log("made it here");
            if (e.key === " " && mouseUnit.occupiedBy.length === 1) {
                player.rotateItem();
                render(pages[state.page].components);
            };
        },
    }
}