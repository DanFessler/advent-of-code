// parse the input
function Parse(input) {
  return input.split(",").map((age) => age * 1);
}

// Part 1
function Part1(input) {
  return solve(input, (pos, target) => {
    return Math.abs(target - pos);
  });
}

// Part 2
function Part2(input) {
  return solve(input, (pos, target) => {
    let d = Math.abs(target - pos);
    return (d * (d + 1)) / 2;
  });
}

function solve(input, gasFunction) {
  let sorted = input.sort((a, b) => a - b);
  let [min, max] = [sorted[0], sorted[sorted.length - 1]];

  let lowest;
  for (let target = min; target <= max; target++) {
    let spentFuel = sum(sorted.map((pos) => gasFunction(pos, target)));
    if (!lowest || spentFuel < lowest) lowest = spentFuel;
  }

  return lowest;
}

function sum(arr) {
  return arr.reduce((acc, val) => acc + val);
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
