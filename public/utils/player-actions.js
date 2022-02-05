import mouseUnit from "../storage/mouse-unit.js";
import areas from "../storage/areas.js";

const rotateItem = () => {
    mouseUnit.occupiedBy[0].rotationState += 90;

    const grabbedConns = mouseUnit.occupiedBy[0].connectable;
    let rotation = [];
    
    for (let i = 0; i < grabbedConns.length; i++) {
        const value = Object.values(grabbedConns[i])
        rotation.push(value[0]);
    };
    
    const connDirection = rotation.pop();
    rotation.unshift(connDirection);

    for (let i = 0; i < grabbedConns.length; i++) {
        for (const direction in grabbedConns[i]) {
            grabbedConns[i][direction] = rotation[i];
        };
    };
    
    console.log(grabbedConns);
};

const rotateValues = (item) => {
    const directions = item.connectable;
    let rotationValues = [];
    
    for (let i = 0; i < directions.length; i++) {
        const value = Object.values(directions[i])
        rotationValues.push(value[0]);
    };
    
    const rotationValue = rotationValues.pop();
    rotationValues.unshift(rotationValue);
    
    for (let i = 0; i < directions.length; i++) {
        for (const direction in directions[i]) {
            directions[i][direction] = rotationValues[i];
        };
    };
};

export default {
    rotateAlt: (item) => {
        if (item.rotationState === 4) item.rotationState = 0;
        for (let i = 0; i < item.rotationState; i++) rotateValues(item);
    },

    grabItem: function(slot) {
        const grabbedItem = slot.pop();
        mouseUnit.occupiedBy.push(grabbedItem);
    },

    placeItem: function(slot) {
        const grabbedItem = mouseUnit.occupiedBy.pop();
        slot.push(grabbedItem);
    },

    pressButton: function(unit) {
        // console.log(unit.occupiedBy);
    }
};