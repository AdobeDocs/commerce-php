const architecture = require("./architecture");
const best_practices = require("./best_practices");
const coding_standards = require("./coding_standards");
const developer = require("./developer");
const module_reference = require("./module_reference");


module.exports = [...architecture, ...best_practices, ...coding_standards, ...developer, ...module_reference];