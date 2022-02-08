import { hoveredUnit, setHoveredUnit, getCurrentPage } from "./state.js";

let connectedUnits = []; // start-permanent unit(s) get pushed here from button-helpers: extractState

const directionChecks = {
    top: () => console.log("checking top"),
    right: () => console.log("checking right"),
    bottom: () => console.log("checking top"),
    left: () => console.log("checking top")
};

const checkConnections = () => {
    console.log(connectedUnits);
    for (let unit = 0; unit < connectedUnits.length; unit++) {
        const connections = connectedUnits[unit].occupiedBy.slot[0].connections;
        for (let i = 0; i < connections.length; i++) {
            for (const direction in connections[i]) {
                directionChecks[direction]();
            };
        };
    };
};

export { checkConnections, connectedUnits };