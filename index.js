const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

const port = 4000;
app.listen(port, () => {
    console.log(`LISTENING on port ${port}`);
});



// pseudo DB response code

const defaultLevelTemplates = [
    {status: "unlocked", state: []},
    {status: "locked", state: []},
    {status: "locked", state: []}
];

const TESTqueriedLevelStates = {
    ["level-1"]: [
        {
            field: [],
            inventory: [
                {
                    
                }
            ],
            unitNumber: 0,
            occupiedBy: "two-way",
            rotationState: 2
        }, {
            unitNumber: 14,
            occupiedBy: "four-way",
            rotationState: 3
        }
    ] 
};

const buildLevelDataPackage = (queriedLevelStates) => {
    let clientDataPackage = [];
    
    for (let i = 0; i < defaultLevelTemplates.length; i++) {
        const levelState = queriedLevelStates[i];

        if (levelState !== undefined) {
            clientDataPackage.push({status: "complete", state: levelState});
            continue;
        };
        
        const previousLevelState = queriedLevelStates[i-1];

        if (levelState === undefined) clientDataPackage.push(defaultLevels[i]);
        else if (levelState === undefined && previousLevelState !== undefined) {
            clientDataPackage[i-1].status = "in-progress";
            clientDataPackage.push(defaultLevelTemplates[i]);
        };

        levelState === undefined
        ? previousLevelState === undefined
            ? clientDataPackage.push(defaultLevelTemplates[i])
            : clientDataPacakage[i].state = "in-progress"
        : clientDataPackage.push({status: "complete", state: levelState});
    };
};