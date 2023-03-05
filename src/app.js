require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./config/db");
const paintings = require("./routes/paintings");

db();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("HOME");
});
app.use("/api/paintings", paintings);

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
