const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`LISTENING on port ${port}`);
});