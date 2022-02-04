import {populateAreas} from "./game-tools.js";
import eventHandlers from "./event-handlers.js";
import render from "./render.js";
import { pages, currentPage , generateSlotTemplates} from "./static-pages.js";

const canvas = document.getElementById("screen");
generateSlotTemplates("field");
generateSlotTemplates("inventory");
populateAreas(pages);
canvas.addEventListener("mousemove", eventHandlers.onMouseMove);
canvas.addEventListener("click", eventHandlers.onClick);
render(currentPage());
console.log(pages["game-page"].areas);
