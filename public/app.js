import game from "./utils/game-actions.js";
import render from "./graphics/render.js";
import pages from "./pages.js";
import handlers from "./event-handlers.js";
import state from "./storage/state.js"

const canvas = document.getElementById("screen");

const addCanvasListeners = () => {
    for (let i = 0; i < pages[state.page].events.length; i++) {
        const event = pages[state.page].events[i];
        canvas.addEventListener(event, handlers[state.page][event]);
        // console.log(`start-page: ${event}`);
    };
    if (state.page === "play-page") {
        document.addEventListener("keypress", handlers[state.page]["keypress"]);
    }
};

addCanvasListeners();

game.layoutGrids();
game.fillInventory(1);

render(pages[state.page].components);