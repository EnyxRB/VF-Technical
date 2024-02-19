const db = require("../db");
const crypto = require("crypto");

exports.getResources = async (req, res, next) => {
  const basicInfo = db.resources.map((r) => ({ id: r.id, name: r.name }));

  res.status(200).json(basicInfo);
};

exports.getResource = async (req, res, next) => {
  const { id } = req.params;
  const resource = db.resources.find((r) => r.id === id);

  if (resource) {
    if (resource.id === "6b1889d9-d3af-4660-ad84-5491975ddd89") {
      await new Promise((res) => setTimeout(() => res(""), 2000));
    }
    res.status(200).json({
      id: resource.id,
      name: resource.name,
      role: resource.role,
      email: resource.email,
    });
  } else {
    res.status(404).json(resource);
  }
};

exports.getResourceSkills = async (req, res, next) => {
  const { id } = req.params;
  const resource = db.resources.find((r) => r.id === id);

  await new Promise((res) => setTimeout(() => res(""), 2000));
  if (resource && resource.skills) {
    res.status(200).json(resource.skills);
  } else {
    res.status(500).json();
  }
};

exports.postResource = async (req, res, next) => {
  const { firstname, lastname, role, email, skills } = req.body;

  if (!firstname || !lastname || !role || !email || !skills || (skills && skills.length === 0)) {
    res.status(400).json({ messsage: "firstname, lastname, role, email and skills are all required properties to create a new resource" });
  } else {
    const fullSkills = [];
    skills.forEach((skill) => {
      const fullSkill = db.skills.find((s) => s.id === skill);
      if (fullSkill) {
        fullSkills.push(fullSkill);
      }
    });

    const resource = {
      id: crypto.randomUUID(),
      name: `${firstname} ${lastname}`,
      role,
      email,
      skills: fullSkills,
    };

    db.resources.push(resource);
    await new Promise((res) => setTimeout(() => res(""), 2000));
    res.status(200).json({ id: resource.id });
  }
};
