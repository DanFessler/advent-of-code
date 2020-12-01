// Get input either from browser or file
var BROWSER = typeof window !== "undefined";
var input = !BROWSER
  ? require("../../input.js")(__dirname)
  : document.body.textContent.trim();

// parse the input
input = input.split("\n").map(item => parseInt(item, 10));

// Part 1
function Part1() {
  return "poop";
}

// Part 2
function Part2() {
  return "cheese";
}

if (!BROWSER) module.exports = [Part1, Part2];
else console.log(Part1(), Part2());
