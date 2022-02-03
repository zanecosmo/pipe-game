import {populateAreas} from "./game-tools.js";
import eventHandlers from "./event-handlers.js";
import render from "./render.js";
import { pages, currentPage } from "./static-pages.js";

const canvas = document.getElementById("screen");
populateAreas(pages);
canvas.addEventListener("mousemove", eventHandlers.onMouseMove);
canvas.addEventListener("click", eventHandlers.onClick);
render(currentPage());
