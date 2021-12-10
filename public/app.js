import mouseUnit from "./storage/mouse-unit.js";
import game from "./utils/game-actions.js";
import player from "./utils/player-actions.js";
import mouseEvent from "./utils/mouse-event-handlers.js";
import render from "./graphics/render.js";
import pages from "./pages.js";

const canvas = document.getElementById("screen");
let pageView = "play-page";

canvas.addEventListener("mousemove", (e) => {
    const mousePosition = mouseEvent.getPosition(e);
    if (mousePosition.x > 0 && mousePosition.y > 0) {
        const area = mouseEvent.whichArea(mousePosition);
        const unit = mouseEvent.whichUnit(area, mousePosition);

        mouseEvent.updateMouseUnit(mousePosition, area, unit);
    };
    render(pages[pageView]);
});

canvas.addEventListener("click", (e) => {
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

    render(pages[pageView]);
});

document.addEventListener("keypress", (e) => {
    if (e.key === " " && mouseUnit.occupiedBy.length === 1) {
        player.rotateItem();
        render(pages[pageView]);
    };
});

game.layoutGrids();
game.fillInventory();

render(pages[pageView]);