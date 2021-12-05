// parse the input
function Parse(input) {
  return input.split(/\r?\n/).map((line) => {
    let [start, end] = line.split(" -> ");
    return [
      start.split(",").map((num) => num * 1),
      end.split(",").map((num) => num * 1),
    ];
  });
}

// solve only vertical and horizontal lines
function Part1(input) {
  return solve(
    input.filter(([[x1, y1], [x2, y2]]) => {
      return x1 == x2 || y1 == y2;
    })
  );
}

// solve all lines
function Part2(input) {
  return solve(input);
}

// solver
function solve(lines) {
  // generate zero'd grid
  const gridSize = 1000;
  const grid = new Array(gridSize)
    .fill()
    .map(() => new Array(gridSize).fill(0));

  // draw lines
  lines.forEach(([start, end]) => {
    let [x, y] = start;
    let [x2, y2] = end;
    let dx = Math.sign(x2 - x);
    let dy = Math.sign(y2 - y);

    while (true) {
      grid[y][x]++;
      if (x == x2 && y == y2) break;
      x += dx;
      y += dy;
    }
  });

  // return intersections
  return grid.flat().reduce((acc, cel) => acc + (cel > 1), 0);
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
