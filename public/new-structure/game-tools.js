// import gameInstance from "./game-instance.js";

const generateButton = (unitTemplate, unit, unitNumber) => {
    const button = {
        name: unitTemplate.name,
        bounds: {
            start: {
                x: unit.bounds.start.x + unit.padding,
                y: (unit.bounds.start.y + unit.padding)
            },
            width: unit.bounds.width - (unit.padding * 2),
            height: unit.bounds.height - (unit.padding * 2)
        },
        behavior: unitTemplate.behavior,
        clickable: unitTemplate.clickable
    };

    if (unitTemplate.name === "play-level-button") {
        button.status = levels[unitNumber].status;
        button.text = {
            value: levels[unitNumber].number,
            x: unit.bounds.start.x + (unit.padding * 2),
            y: unit.bounds.start.y + (unit.padding * 2),
            style: unitTemplate.text.style,
        };
        if (button.status === "locked") button.clickable = false;
        return button;
    };

    if (unitTemplate.name === "new-game-modal-button" || unitTemplate.name === "modal-exit") {
        const pseudoStart = unit.bounds.width * (3/5);
        button.bounds.start.x = unit.bounds.start.x + pseudoStart;
        button.bounds.width = unit.bounds.width - pseudoStart - unit.padding;
    };

    button.text = {
        value: unitTemplate.text.value,
        x: button.bounds.start.x + (button.bounds.width / 2),
        y: button.bounds.start.y + (button.bounds.height / 2),
        style: unitTemplate.text.style,
    };
    
    return button;
};

const areaTypeActions = {
    ["buttons"]: (area, unitNumber) => {

    },
    ["slot"]: () => console.log("SLOTS"),
    ["text-input"]: () => console.log("TEXT-INPUT"),
};

const buildUnitObject = () => {
    return {
        areaType: null,
        bounds: {
            start: {x: null, y: null},
            width: null,
            height: null,
        },
        padding: null
    }
};

const generateUnits = (area) => {
    const unitWidth = area.bounds.width / area.grid.columns;
    const unitHeight = area.bounds.height / area.grid.rows;

    for (let row = 0; row < area.grid.rows; row++) {
        for (let column = 0; column < area.grid.columns; column++) {
            const index = area.grid.columns * row + column;
            
            // area.type === "slots"
            // ? []
            // : area.type === "buttons"
            //     ? generateButton(area.unitTemplates[index], unitObject, index)
            //     : textEditRenderer()

            // console.log(`GENERATING`);
            // console.log(area.unitTemplates.length);
            
            if (area.unitTemplates.length === 0) continue;

            if (area.type === "slots") {
                const unitObject = {
                    areaType: area.type,
                    bounds: {
                        start: {
                            x: (area.bounds.start.x + (column * unitWidth)),
                            y: (area.bounds.start.y + (row * unitHeight))
                        },
                        width: unitWidth,
                        height: unitHeight,
                    },
                    padding: area.padding
                };
                unitObject.occupiedBy = [];
                area.units.push(unitObject);
                continue;
            };
            
            if (area.type === "buttons") {
                const unitObject = {
                    areaType: area.type,
                    bounds: {
                        start: {
                            x: (area.bounds.start.x + (column * unitWidth)),
                            y: (area.bounds.start.y + (row * unitHeight))
                        },
                        width: unitWidth,
                        height: unitHeight,
                    },
                    padding: area.padding
                };
                unitObject.occupiedBy = generateButton(area.unitTemplates[index], unitObject, index),
                area.units.push(unitObject);
            }
            
        };
    };
};

const populateAreas = (pages) => {
    for (const pagename in pages) {
        const page = pages[pagename];
        for (let i = 0; i < page.areas.length; i++) generateUnits(page.areas[i]);
    };
};

export {populateAreas, generateUnits};