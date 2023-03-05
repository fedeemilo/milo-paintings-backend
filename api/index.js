require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("../src/config/db");
const paintings = require("../src/routes/paintings");

db();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Milo paintings");
});
app.use("/api/paintings", paintings);

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
