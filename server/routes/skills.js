const express = require("express");
const router = express.Router();

const dataController = require("../controllers/skills");

router.get("/", dataController.getSkills);

module.exports = router;
