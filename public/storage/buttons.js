import game from "../utils/game-actions.JS";
import state from "./state.js"
import render from "../graphics/render.js";
import pages from "../pages.js";

const startLevelOne = () => {
    game.removeEventListeners();
    state.page = "play-page";
    state.level = 1;
    game.addEventListeners();
    game.startLevel();

    render(pages[state.page].components);
};

const openLevelSelection = () => { ///////////////////////////////////////
    game.removeEventListeners();
    state.page = "levels-page";
    game.addEventListeners();

    render(pages[state.page].components);
};

const backToStart = () => {
    game.removeEventListeners();
    state.page = "start-page";
    state.level = 0;
    game.addEventListeners();
    console.log(pages);

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
            start: {x: 226, y: 222},
            value: "PLAY",
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
            start: {x: 213, y: 262},
            value: "LEVELS",
            style: "20px sans-serif"
        },
        hover: false,
        clickAction: openLevelSelection
    },

    ["back-button"]: {
        bounds: {
            start: {x: 20, y: 340},
            width: 100,
            height: 28
        },
        text: {
            start: {x: 43, y: 362},
            value: "BACK",
            style: "20px sans-serif"
        },
        hover: false,
        clickAction: backToStart
    },

    ["exit-button"]: {
        bounds: {
            start: {x: 310, y: 310},
            width: 100,
            height: 28
        },
        text: {
            start: {x: 338, y: 332},
            value: "EXIT",
            style: "20px sans-serif"
        },
        hover: false,
        clickAction: backToStart
    }
};