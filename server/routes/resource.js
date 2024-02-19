const express = require("express");
const router = express.Router();

const resourceController = require("../controllers/resource");

router.get("/", resourceController.getResources);
router.get("/:id", resourceController.getResource);
router.get("/:id/skills", resourceController.getResourceSkills);

router.post("/", resourceController.postResource);

module.exports = router;
