// parse the input
function Parse(input) {
  return input.split(/\r\n/).map((item) => {
    let [direction, steps] = item.split(" ");
    return [direction, parseInt(steps, 10)];
  });
}

function Part1(input) {
  let [x, y] = [0, 0];

  let ops = {
    forward: (steps) => {
      x += steps;
    },
    down: (steps) => {
      y += steps;
    },
    up: (steps) => {
      y -= steps;
    },
  };

  input.forEach((instruction) => {
    let [direction, steps] = instruction;
    ops[direction](steps);
  });

  return x * y;
}

function Part2(input) {
  let [x, y, aim] = [0, 0, 0];

  let ops = {
    forward: (steps) => {
      x += steps;
      y += aim * steps;
    },
    down: (steps) => {
      aim += steps;
    },
    up: (steps) => {
      aim -= steps;
    },
  };

  input.forEach((instruction) => {
    let [direction, steps] = instruction;
    ops[direction](steps);
  });

  return x * y;
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
