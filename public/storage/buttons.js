import game from "../utils/game-actions.JS";
import state from "./state.js"
import render from "../graphics/render.js";
import pages from "../pages.js";

const startLevelOne = () => {
    game.removeEventListeners();
    state.page = "play-page";
    state.level = 1;
    game.addEventListeners();
    game.startFirstLevel();

    render(pages[state.page].components);
};

const openLevelSelection = () => { ///////////////////////////////////////
    game.removeEventListeners();
    state.page = "levels-page";
    game.addEventListeners();

    render(pages[state.page].components);
};

export default {
    ["play-button"]: {
        bounds: {
            start: {x: 200, y: 200},
            width: 100,
            height: 28
        },
        text: {
            start: {x: 230, y: 220},
            value: "play",
            style: "20px sans-serif"
        },
        hover: false,
        clickAction: startLevelOne
    },

    ["levels-button"]: {
        bounds: {
            start: {x: 200, y: 240},
            width: 100,
            height: 28
        },
        text: {
            start: {x: 224, y: 261},
            value: "levels",
            style: "20px sans-serif"
        },
        hover: false,
        clickAction: openLevelSelection
    },

    ["back-button"]: {
        bounds: {
            start: {x: 200, y: 200},
            width: 100,
            height: 28
        },
        text: {
            start: {x: 224, y: 261},
            value: "back",
            style: "20px sans-serif"
        },
        hover: false,
        // clickAction: openLevelSelection
    }
};