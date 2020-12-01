const fs = require("fs");
const path = require("path");

module.exports = dir => {
  console.log("poop");
  return fs.readFileSync(path.resolve(dir, "input.txt"), "utf8");
};
