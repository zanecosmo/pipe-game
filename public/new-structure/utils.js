import { pageQueue } from "./state.js";
import pages from "./pages.js";

const pushPageToQueue = (pagename) => pageQueue.push(pagename);
const popPageFromQueue = () => pageQueue.pop(lastIn(pageQueue));
const lastIn = (array) => array[array.length-1];
const copyObject = (object) => JSON.parse(JSON.stringify(object));
const currentPage = () => pages[lastIn(pageQueue)];
const deactivatePage = () => {
    for (let i = 0; i < currentPage().areas.length; i++) currentPage().areas[i].isActive = false;
};
const reactivatePage = () => {
    for (let i = 0; i < currentPage().areas.length - 1; i++) currentPage().areas[i].isActive = true;
};
const safelyRemoveModal = () => {
    reactivatePage();
    currentPage().areas.pop();
};

export {
    pushPageToQueue,
    popPageFromQueue,
    lastIn,
    copyObject,
    currentPage,
    deactivatePage,
    reactivatePage,
    safelyRemoveModal
};