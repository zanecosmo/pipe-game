import mouseUnit from "../storage/mouse-unit.js";

export default {
    rotateItem: function() {
        const grabbedConns = mouseUnit.grabbed[0].connectable;
        let rotation = [];
        
        console.log(grabbedConns);
        
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
        mouseUnit.grabbed.push(grabbedItem);
    },

    placeItem: function(slot) {
        const grabbedItem = mouseUnit.grabbed.pop();
        slot.push(grabbedItem);
    },

    pressButton: function(unit) {
        // console.log(unit.occupiedBy);
    }
};