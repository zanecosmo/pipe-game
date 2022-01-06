import game from "../utils/game-actions.JS";
import state from "./state.js"
import render from "../graphics/render.js";
import pages from "../pages.js";

const changePage = (pageName) => {
    game.removeEventListeners();
    state.page = pageName;
    game.addEventListeners();
};

const startLevelOne = () => {
    game.removeEventListeners();
    state.page = "play-page";
    state.level = 1;
    game.addEventListeners();
    game.startLevel();
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
        clickAction: startLevelOne,
        link: "play-page"
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
        clickAction: changePage,
        link: "levels-page"
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
        clickAction: changePage,
        link: "start-page"
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
        clickAction: changePage,
        link: "start-page"
    }
};