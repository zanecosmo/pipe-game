import populateAreas from "./game-tools.js";
import eventHandlers from "./event-handlers.js";
import render from "./render.js";
import { currentPage } from "./pages.js";

const canvas = document.getElementById("screen");
populateAreas();
canvas.addEventListener("mousemove", eventHandlers.onMouseMove);
canvas.addEventListener("click", eventHandlers.onClick);
render(currentPage());