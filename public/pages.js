export default {
    ["start-page"]: {
        components: ["title", "play-button", "levels-button"],
        events: ["mousemove", "click"],
        buttons: ["play-button", "levels-button"]
    },
    
    ["play-page"]: {
        components: ["hover-square" ,"menu-outline", "stack-numbers", "inventory-pipes", "field-pipes", "grabbed"],
        events: ["mousemove", "click"]
    }
};