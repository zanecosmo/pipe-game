const canvas = document.getElementById("screen");
const c = document.getElementById("screen").getContext("2d");
const screenColor = "rgb(190, 0, 190)";
const renderColor = "rgb(170, 255, 0)";
const hoverColor = "rgb(250, 60, 200)";

export default {
    screen: () => {
        c.fillStyle = screenColor;
        c.fillRect(0, 0, canvas.width, canvas.height);
    },
    clearScreen: () => {
        c.clearRect(0, 0, canvas.width, canvas.height);
    },
    title: function(title) {
        c.beginPath();
        c.fillStyle = renderColor;
        c.font = "20px sans-serif";
        c.textBaseline = "middle",
        c.textAlign = "center",
        c.fillText(title.text, title.x, title.y);
    },
    status: function(color, buttonBounds, status) {
        c.beginPath();
        c.fillStyle = color;
        c.textAlign = "right";
        c.fillText(
            status,
            buttonBounds.start.x + buttonBounds.width - 4,
            buttonBounds.start.y + (buttonBounds.height / 2)
        );
        c.closePath();
    },
    button: function(unit, hoveredUnit) {
        let borderColor = renderColor;
        let boxColor = screenColor;
        let textColor = renderColor;
        const button = unit.occupiedBy;
        const buttonBounds = button.bounds;
        const start = buttonBounds.start;
    
        if (unit.occupiedBy.clickable === false) c.globalAlpha = .6;
        else if (unit === hoveredUnit) {
            boxColor = renderColor;
            textColor = screenColor;
        };
        
        c.beginPath();
        c.fillStyle = boxColor;
        c.fillRect(start.x, start.y, buttonBounds.width, buttonBounds.height);
        c.closePath();
    
        c.beginPath();
        c.strokeStyle = borderColor;
        c.lineWidth = 2;
        c.strokeRect(start.x, start.y, buttonBounds.width, buttonBounds.height);
        c.closePath();
    
        c.beginPath();
        c.fillStyle = textColor;
        c.lineWidth = 2;
        c.textBaseline =  "middle";
        c.textAlign = unit.name === "select-level-button" ? "left" : "center";
        c.font = button.text.style;
        c.fillText(button.text.value, button.text.x, button.text.y + 2);
        c.closePath();
    
        c.textAlign = "left";
        c.globalAlpha = 1;
    
        if (unit.name === "select-level-button") {
            this.status(textColor, buttonBounds, button.status);
        };
    }
};