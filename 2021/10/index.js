// parse the input
function Parse(input) {
  return input.split(/\r?\n/).map((row) => row.split(""));
}

const openings = "([{<";
const closings = ")]}>";

// Part 1
function Part1(input) {
  let { errors } = solve(input);

  return errors.reduce((acc, tok) => {
    return acc + [3, 57, 1197, 25137][closings.indexOf(tok)];
  }, 0);
}

// Part 2
function Part2(input) {
  let { endings } = solve(input);

  let scores = endings.map((ending) =>
    ending.reduce((acc, tok) => {
      return acc * 5 + closings.indexOf(tok) + 1;
    }, 0)
  );

  return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
}

function solve(input) {
  let errors = [];
  let endings = [];

  for (line of input) {
    let stack = [];

    for (i in line) {
      const token = line[i];
      if (openings.includes(token)) {
        stack.push(closings[openings.indexOf(token)]);
      }
      if (closings.includes(token)) {
        if (token === stack.at(-1)) stack.pop();
        else {
          errors.push(token);
          break;
        }
      }
      if (parseInt(i) === line.length - 1) {
        endings.push(stack.reverse());
      }
    }
  }

  return { errors, endings };
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
