// parse the input
function Parse(input) {
  return input.split("\n").map(item => parseInt(item, 10));
}

// Find two numbers that add to 2020 and multiply them together
function Part1(input) {
  for (A = 0; A < input.length; A++) {
    for (B = 0; B < input.length; B++) {
      if (input[A] + input[B] === 2020) {
        return input[A] * input[B];
      }
    }
  }
}

// find three numbers that add to 2020 and multiply them together
function Part2(input) {
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

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
