const canvas = document.getElementById("screen");

export default {
    name: "level-selection",
    bounds: {
        start: {x: 20, y: 70},
        width: canvas.width - 80,
        height: canvas.height*(.75) - 60,
    },
    grid: {
        rows: 3,
        columns: 5,
        rule: function() {return ((canvas.width - 80)/this.columns)}
    },
    mod: 0,
    units: []
}