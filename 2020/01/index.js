// Get input either from browser or file
var BROWSER = typeof window !== "undefined";
var input = !BROWSER
  ? require("../../input.js")(__dirname)
  : document.body.textContent.trim();

// parse the input
input = input.split("\n").map(item => parseInt(item, 10));

// Part 1
// Find two numbers that add to 2020 and multiply them together
function Part1() {
  for (A = 0; A < input.length; A++) {
    for (B = 0; B < input.length; B++) {
      if (input[A] + input[B] === 2020) {
        return input[A] * input[B];
      }
    }
  }
}

// Part 2
// find three numbers that add to 2020 and multiply them together
function Part2() {
  for (A = 0; A < input.length; A++) {
    for (B = 0; B < input.length; B++) {
      for (C = 0; C < input.length; C++) {
        if (input[A] + input[B] + input[C] === 2020) {
          return input[A] * input[B] * input[C];
        }
      }
    }
  }
}

if (!BROWSER) module.exports = [Part1, Part2];
else console.log(Part1(), Part2());
