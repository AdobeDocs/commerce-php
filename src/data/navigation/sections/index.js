const architecture = require("./architecture");
const best_practices = require("./best_practices");
const coding_standards = require("./coding_standards");
const development = require("./development");
const module_reference = require("./module_reference");
const module_reference_beta = require("./module_reference_beta");
const tutorials = require("./tutorials");


module.exports = [...architecture, ...best_practices, ...coding_standards, ...development, ...module_reference, ...module_reference_beta, ...tutorials];