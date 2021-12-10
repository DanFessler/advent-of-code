// parse the input
function Parse(input) {
  return input.split(/\r?\n/).map((row) => row.split(""));
}

// Part 1
function Part1(input) {
  let { errors } = solve(input);

  return errors.reduce((acc, tok) => {
    return (
      acc +
      {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137,
      }[tok]
    );
  }, 0);
}

// Part 2
function Part2(input) {
  let { closings } = solve(input);

  let scores = closings.map((closing) => {
    return closing.reduce((acc, tok) => {
      return acc * 5 + [")", "]", "}", ">"].indexOf(tok) + 1;
    }, 0);
  });

  return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
}

function solve(input) {
  let errors = [];
  let closings = [];

  const map = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">",
  };

  for (line of input) {
    let stack = [];

    for (i in line) {
      const token = line[i];
      if (["(", "[", "{", "<"].includes(token)) stack.push(map[token]);
      if ([")", "]", "}", ">"].includes(token)) {
        if (token !== stack.at(-1)) {
          errors.push(token);
          break;
        } else stack.pop();
      }
      if (parseInt(i) === line.length - 1) {
        closings.push(stack.reverse());
      }
    }
  }

  return { errors, closings };
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
