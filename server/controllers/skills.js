const db = require("../db");

exports.getSkills = async (req, res, next) => {
  res.status(200).json(db.skills);
};
