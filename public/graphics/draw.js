const canvas = document.getElementById("screen");
const c = document.getElementById("screen").getContext("2d");
const screenColor = "rgb(190, 0, 190)";
const renderColor = "rgb(170, 255, 0)";
const hoverColor = "rgb(250, 60, 200)"

export default {
    screen: () => {
        c.fillStyle = screenColor;
        c.fillRect(0, 0, canvas.width, canvas.height);
    },

    clearScreen: () => c.clearRect(0, 0, canvas.width, canvas.height),

    menuOutline: () => {
        c.beginPath();
        c.lineWidth = 2;
        c.strokeStyle = renderColor;
        
        c.moveTo(0, 300);
        c.lineTo(canvas.width, 300);
    
        c.moveTo(300, 300);
        c.lineTo(300, 400);
        
        c.stroke();
    },

    hoverSquare: (x, y, width, height) => {
        c.globalAlpha = .5;
        c.fillStyle = hoverColor;
        c.fillRect(x,y,width,height);
        c.globalAlpha = 1;
    },

    unit: (x,y,width,height) => {
        c.lineWidth = .25;
        c.strokeStyle = "white";
        c.strokeRect(x,y,width,height);
    },

    itemPaths: {
        ["end-cap"]: function(width, X, Y, mod, padding) {
            c.moveTo(X + width - mod, Y + mod + padding);
            c.lineTo(X + mod + padding, Y + mod + padding);
            c.lineTo(X + mod + padding, Y + width - mod - padding);
            c.lineTo(X + width - mod, Y + width - mod - padding);
        },
        ["two-way"]: function(width, X, Y, mod, padding) {
            c.moveTo(X+mod, Y + padding + mod);
            c.lineTo(X-mod + width, Y + padding + mod);
            c.moveTo(X+mod, Y + width - padding - mod);
            c.lineTo(X-mod + width, Y + width - padding - mod);
        },
        ["three-way"]: function(width, X, Y, mod, padding) {
            c.moveTo(X + mod, Y + mod + padding);
            c.lineTo(X + width - mod, Y + mod + padding);
            c.moveTo(X + mod, Y + width - mod - padding);
            c.lineTo(X + mod + padding, Y + width - mod - padding);
            c.lineTo(X + mod + padding, Y + width - mod);
            c.moveTo(X + width - mod, Y + width - mod - padding);
            c.lineTo(X + width - mod - padding, Y + width - mod - padding);
            c.lineTo(X + width - mod - padding, Y + width - mod);
        },
        ["four-way"]: function(width, X, Y, mod, padding) {
            c.moveTo(X + mod, Y + mod + padding);
            c.lineTo(X + mod + padding, Y + mod + padding);
            c.lineTo(X + mod + padding, Y + mod);
            c.moveTo(X + width - mod, Y + mod + padding);
            c.lineTo(X + width - mod - padding, Y + mod + padding);
            c.lineTo(X + width - mod - padding, Y + mod);
            c.moveTo(X + mod, Y + width - mod - padding);
            c.lineTo(X + mod + padding, Y + width - mod - padding);
            c.lineTo(X + mod + padding, Y + width - mod);
            c.moveTo(X + width - mod, Y + width - mod - padding);
            c.lineTo(X + width - mod - padding, Y + width - mod - padding);
            c.lineTo(X + width - mod - padding, Y + width - mod);
        },
        ["elbow"]: function(width, X, Y, mod, padding) {
            c.moveTo(X+mod, Y + padding + mod);
            c.lineTo(X + width - padding - mod, Y + padding + mod);
            c.lineTo(X + width - padding - mod, Y + width - mod);
            c.moveTo(X + mod, Y + width - padding - mod);
            c.lineTo(X + mod + padding, Y + width - padding - mod);
            c.lineTo(X + mod + padding, Y + width - mod);
        },
        ["placeHolder"]: function() {console.log(this.name)},
        ["placeHolder"]: function() {console.log(this.name)},
        ["placeHolder"]: function() {console.log(this.name)},
        ["placeHolder"]: function() {console.log(this.name)},
        ["placeHolder"]: function() {console.log(this.name)},
        ["placeHolder"]: function() {console.log(this.name)},
        ["placeHolder"]: function() {console.log(this.name)},
    },

    item: function(unit, mod, kind) {
        const X = unit.start.x;
        const Y = unit.start.y;
        const padding = 10;
        
        c.strokeStyle = renderColor;
        c.lineWidth = 2;

        c.beginPath();
        this.itemPaths[kind](unit.width, X, Y, mod, padding);
        c.stroke();

        // c.translate()
        // c.rotate(90 * Math.PI/180);
    },

    stackQuantity: (quantity, x,y) => {
        if (quantity !== 0) {
            c.font = "12px sans-serif";
            c.fillStyle = renderColor;
            c.textBaseline = "hanging";
            c.fillText(quantity, x+2, y+3)
        };
    }
};

