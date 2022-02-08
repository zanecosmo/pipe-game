let pageQueue = [];
let getCurrentPage = () => pageQueue[pageQueue.length - 1];

let hoveredUnit = null;
const setHoveredUnit = (newUnit) => hoveredUnit = newUnit;

let password = null;

export {hoveredUnit, setHoveredUnit, pageQueue, getCurrentPage};