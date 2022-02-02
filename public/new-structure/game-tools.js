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

const generateUnits = (area) => {
    const unitWidth = area.bounds.width / area.grid.columns;
    const unitHeight = area.bounds.height / area.grid.rows;

    for (let row = 0; row < area.grid.rows; row++) {
        for (let column = 0; column < area.grid.columns; column++) {
            const index = area.grid.columns * row + column;
            // console.log(index);
            
            // areaTypeActions[area.type](area, index);
            
            if (area.unitTemplates.length === 0) return;

            const unitTemplate = area.unitTemplates[index];
            // console.log(unitTemplate.name);
            
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

            if (area.type === "buttons") {
                unitObject.occupiedBy = generateButton(unitTemplate, unitObject, index)
            } else unitObject.occupiedBy = [];
            area.units.push(unitObject);
        };
    };
};

const buildPage = (pageName) => {
    const page = pages[pageName];
    if (page.isBuilt) return;
    for (let i = 0; i < page.areas.length; i++) generateUnits(page.areas[i]);
};

export default (pages) => {
    for (const pagename in pages) {
        const page = pages[pagename];
        for (let i = 0; i < page.areas.length; i++) generateUnits(page.areas[i]);
    };
};