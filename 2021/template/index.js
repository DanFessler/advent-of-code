// parse the input
function Parse(input) {
  return input.split(/\r?\n/).map((row) => row.split(""));
}

// Part 1
function Part1(input) {}

// Part 2
function Part2(input) {}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
