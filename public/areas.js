import {
    canvas,
    c,
    screenColor,
    renderColor,
    hoverColor
} from "./utils.js";

export default [
    {
        name: "field",
        start: {x: 0, y: 0},
        width: canvas.width,
        height: canvas.height*(.75),
        grid: {
            rows: 6,
            columns: 10,
            rule: function() {return (canvas.width/this.columns)}
        },
        mod: 0,
        units: []
    }, {
        name: "inventory",
        start: {x: 0, y: 300},
        width: canvas.width*(.6),
        height: canvas.height*(.25),
        grid: {
            rows: 2,
            columns: 6,
            rule: function() {return (canvas.width*(.6)/this.columns)}
        },
        mod: 10,
        units: []
    }, {
        name: "menu",
        start: {x: 300, y: 300},
        width: canvas.width*(.4),
        height: canvas.height*(.25),
        grid: {
            rows: 2,
            columns: 4,
            rule: function() {return (canvas.width*(.4)/this.columns)}
        },
        mod: 0,
        units: []
    }
];