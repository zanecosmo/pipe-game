import mouseUnit from "../storage/mouse-unit.js";
import areas from "../storage/areas.js";

export default {
    rotateItem: function() {
        mouseUnit.occupiedBy[0].rotationState += 90;
        console.log(mouseUnit);
        console.log(areas[1].units);

        const grabbedConns = mouseUnit.occupiedBy[0].connectable;
        let rotation = [];
        
        for (let i = 0; i < grabbedConns.length; i++) {
            const value = Object.values(grabbedConns[i])
            rotation.push(value[0]);
        };
        
        const conndirection = rotation.pop();
        rotation.unshift(conndirection);
    
        for (let i = 0; i < grabbedConns.length; i++) {
            for (const direction in grabbedConns[i]) {
                grabbedConns[i][direction] = rotation[i];
            };
        };
        
        console.log(grabbedConns);
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