export default {
    ["start-page"]: {
        components: ["game-title", "play-button", "levels-button"],
        events: ["mousemove", "click"],
        buttons: ["play-button", "levels-button"]
    },
    
    ["play-page"]: {
        components: ["hover-square" ,"menu-outline", "stack-numbers", "inventory-pipes", "field-pipes", "grabbed"],
        events: ["mousemove", "click"]
    },

    ["levels-page"]: {
        components: ["levels-title", "back-button", "level-numbers"],
        events: ["mousemove", "click"],
        buttons: ["back-button"],
        areas: ["level-selection"]
    }
};