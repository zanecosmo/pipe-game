import { copy } from "./utils.js";
import {mouseUnit} from "./static-pages.js";

const canvas = document.getElementById("screen");
const c = document.getElementById("screen").getContext("2d");
const screenColor = "rgb(190, 0, 190)";
const renderColor = "rgb(170, 255, 0)";
const hoverColor = "rgb(250, 60, 200)";

const wrapText = (modalText, boxWidth, lineHeight, x, y) => {
    const wordArray = modalText.split(" ");
    
    let lineNumber = 0;
    let givenLine = "";
    
    const testLineWidth = (word) => {
        let givenLineCopy = copy(givenLine);
        let testLine = givenLineCopy += (word + " ");
        const lineWidth = c.measureText(testLine).width;

        if (lineWidth < boxWidth) givenLine += (word + " ")
        else {
            drawLine(givenLine);
            givenLine = word + " ";
            lineNumber++;
        };
    };
    
    const drawLine = (line) => c.fillText(line, x, y + (lineHeight * lineNumber));

    for (let i = 0; i < wordArray.length; i++) testLineWidth(wordArray[i]);
    
    drawLine(givenLine);
};

const rotateUnit = (unit) => {
    const bounds = unit.bounds;
    c.translate(bounds.start.x + bounds.width / 2, bounds.start.y + bounds.width / 2);
    c.rotate((unit.occupiedBy.slot[0].rotationState * 90) * Math.PI/180);
    c.translate(-1*(bounds.start.x + bounds.width / 2), -1*(bounds.start.y + bounds.width / 2));
};

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
    modal: function(area) {
        const lineHeight = area.modalText.style[0] + area.modalText.style[1];

        c.beginPath;
        c.fillStyle = screenColor;
        c.fillRect(
            area.bounds.start.x,
            area.bounds.start.y,
            area.bounds.width,
            area.bounds.height
            );
            
        c.textBaseline =  "top";
        c.fillStyle = renderColor;
        c.font = area.modalText.style;

        wrapText(
            area.modalText.value,
            210,
            lineHeight,
            area.bounds.start.x + 6,
            area.bounds.start.y + 6
        );

        c.strokeStyle = renderColor;
        c.strokeRect(
            area.bounds.start.x,
            area.bounds.start.y,
            area.bounds.width,
            area.bounds.height
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
    },

    itemPaths: {
        ["end-cap"]: function(width, X, Y, padding, depth) {
            c.moveTo(X + width - padding, Y + padding + depth);
            c.lineTo(X + padding + depth, Y + padding + depth);
            c.lineTo(X + padding + depth, Y + width - padding - depth);
            c.lineTo(X + width - padding, Y + width - padding - depth);
        },
        ["two-way"]: function(width, X, Y, padding, depth) {
            c.moveTo(X + padding, Y + depth + padding);
            c.lineTo(X - padding + width, Y + depth + padding);
            c.moveTo(X + padding, Y + width - depth - padding);
            c.lineTo(X - padding + width, Y + width - depth - padding);
        },
        ["three-way"]: function(width, X, Y, padding, depth) {
            c.moveTo(X + padding, Y + padding + depth);
            c.lineTo(X + width - padding, Y + padding + depth);
            c.moveTo(X + padding, Y + width - padding - depth);
            c.lineTo(X + padding + depth, Y + width - padding - depth);
            c.lineTo(X + padding + depth, Y + width - padding);
            c.moveTo(X + width - padding, Y + width - padding - depth);
            c.lineTo(X + width - padding - depth, Y + width - padding - depth);
            c.lineTo(X + width - padding - depth, Y + width - padding);
        },
        ["four-way"]: function(width, X, Y, padding, depth) {
            c.moveTo(X + padding, Y + padding + depth);
            c.lineTo(X + padding + depth, Y + padding + depth);
            c.lineTo(X + padding + depth, Y + padding);
            c.moveTo(X + width - padding, Y + padding + depth);
            c.lineTo(X + width - padding - depth, Y + padding + depth);
            c.lineTo(X + width - padding - depth, Y + padding);
            c.moveTo(X + padding, Y + width - padding - depth);
            c.lineTo(X + padding + depth, Y + width - padding - depth);
            c.lineTo(X + padding + depth, Y + width - padding);
            c.moveTo(X + width - padding, Y + width - padding - depth);
            c.lineTo(X + width - padding - depth, Y + width - padding - depth);
            c.lineTo(X + width - padding - depth, Y + width - padding);
        },
        ["elbow"]: function(width, X, Y, padding, depth) {
            c.moveTo(X + padding, Y + depth + padding);
            c.lineTo(X + width - depth - padding, Y + depth + padding);
            c.lineTo(X + width - depth - padding, Y + width - padding);
            c.moveTo(X + padding, Y + width - depth - padding);
            c.lineTo(X + padding + depth, Y + width - depth - padding);
            c.lineTo(X + padding + depth, Y + width - padding);
        },
        ["placeHolder"]: function() {console.log(this.name)}
    },

    stackQuantity: (quantity, x,y) => {
        c.font = "12px sans-serif";
        c.fillStyle = renderColor;
        c.fillText(quantity, x + 3, y + 13)
    },

    item: function(unit) {
        const X = unit.bounds.start.x;
        const Y = unit.bounds.start.y;
        const padding = unit.padding;
        const depth = (unit.bounds.width - (padding *2)) / 6;
        const unitKind = unit.occupiedBy.slot[0].kind;
        
        c.strokeStyle = renderColor;
        c.lineWidth = 2;

        c.save()
        c.beginPath();
        rotateUnit(unit);
        this.itemPaths[unitKind](unit.bounds.width, X, Y, padding, depth);
        c.stroke();
        c.restore();
    },
};