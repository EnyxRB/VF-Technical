const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const resourceRoutes = require("./routes/resource");
const skillsRoutes = require("./routes/skills");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/resources", resourceRoutes);
app.use("/skills", skillsRoutes);

app.listen(4000);
