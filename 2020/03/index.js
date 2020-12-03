// parse the input
function Parse(input) {
  return input
    .split("\n")
    .map(row => row.split("").map(cel => (cel === "." ? 0 : 1)));
}

// count trees starting at 0,0 with a slope of 3:1
function Part1(input) {
  return Solve(input, [{ right: 3, down: 1 }]);
}

// count trees using various slopes, and multiply together
function Part2(input) {
  return Solve(input, [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 }
  ]);
}

function Solve(input, slopes) {
  let results = slopes.map(slope => {
    let count = 0;
    let x = 0;
    for (let y = 0; y < input.length; y += slope.down) {
      if (input[y][x]) count++;
      x = (x + slope.right) % 31;
    }
    return count;
  });
  return results.reduce((acc, val) => acc * val);
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
