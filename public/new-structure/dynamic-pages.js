import gameInstance from "./game-instance.js";

const buttonActions = {
    ["select-level"]: (levelNumber) => {
        // goes into "gameInstance" and genertes level based on that data

        gameInstance.levels[levelNumber]
    },
    ["save-progress"]: () => console.log("SAVE PROGRESS BUTTON PRESSED"),
    ["submit-password"]: () => console.log("SUBMiT PASSWORD PRESSED"),
    ["async-save"]: () => console.log("ASYNC SAVE BUTTON PRESSED"),
    ["close-out"]: () => {
        popPageFromQueue();
        // remove event listener
        setHoveredUnit(null);
        render(currentPage());
    }
};


export default {
    
};

// {
//     name: "level-1-button",
//     text: {value: "1", style: "20px sans-serif"},
//     behavior: () => buttonActions["select-level"](1),
//     // clickable: levels[0].status === "locked" ? false : true
//     clickable: true
// },

// {
//     name: "level-2-button",
//     text: {value: "2", style: "20px sans-serif"},
//     behavior: () => buttonActions["select-level"](2),
//     // clickable: levels[0].status === "locked" ? false : true
//     clickable: true
// },

// {
//     name: "level-3-button",
//     text: {value: "3", style: "20px sans-serif"},
//     behavior: () => buttonActions["select-level"](3),
//     // clickable: levels[0].status === "locked" ? false : true            
//     clickable: true
// },

// {
//     name: "level-4-button",
//     text: {value: "4", style: "20px sans-serif"},
//     behavior: () => buttonActions["select-level"](4),
//     // clickable: levels[0].status === "locked" ? false : true
//     clickable: true
// },

// {
//     name: "level-5-button",
//     text: {value: "5", style: "20px sans-serif"},
//     behavior: () => buttonActions["select-level"](5),
//     // clickable: levels[0].status === "locked" ? false : true            
//     clickable: true
// },

// {
//     name: "level-6-button",
//     text: {value: "6", style: "20px sans-serif"},
//     behavior: () => buttonActions["select-level"](6),
//     // clickable: levels[0].status === "locked" ? false : true
//     clickable: true
// },

// {
//     name: "level-7-button",
//     text: {value: "7", style: "20px sans-serif"},
//     behavior: () => buttonActions["select-level"](7),
//     // clickable: levels[0].status === "locked" ? false : true
//     clickable: true
    
// },

// {
//     name: "level-8-button",
//     text: {value: "8", style: "20px sans-serif"},
//     behavior: () => buttonActions["select-level"](8),
//     // clickable: levels[0].status === "locked" ? false : true
//     clickable: true
// }