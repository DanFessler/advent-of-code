// parse the input
function Parse(input) {
  return input.split(/\r?\n/).map((row) => row.split("").map((num) => num * 1));
}

// Part 1
function Part1(input) {
  return search(input, [0, 0], [input.length - 1, input.length - 1]);
}

// Part 2
function Part2(input) {
  let map = [];
  const size = input.length;

  // build up larger map based on input
  for (let y = 0; y < size * 5; y++) {
    let row = [];
    for (let x = 0; x < size * 5; x++) {
      let [tx, ty] = [Math.floor(x / size), Math.floor(y / size)];
      row.push(((input[y % size][x % size] + (tx + ty) - 1) % 9) + 1);
    }
    map.push(row);
  }

  return search(map, [0, 0], [size * 5 - 1, size * 5 - 1]);
}

// Simplified A* search algorithm
function search(map, [x1, y1], [x2, y2]) {
  let open = [{ pos: [x1, y1], cost: 0 }];
  let costs = {};

  while (open.length) {
    // find node with least cost
    let current = open.reduce((lowest, node) =>
      !lowest || node.cost < lowest.cost ? node : lowest
    );

    let [x, y] = current.pos;

    // if we reached the end, return the total cost
    if (x == x2 && y == y2) return current.cost;

    // for each neighbor, if new cost is lower then
    // add it to the open list for further searching
    neighbors(x, y).forEach(([x, y]) => {
      if (!map[y] || !map[y][x]) return;

      let neighbor = {
        pos: [x, y],
        cost: current.cost + map[y][x],
      };

      i = y * map[0].length + x;
      if (!costs[i] || neighbor.cost < costs[i]) {
        costs[i] = neighbor.cost;
        open.push(neighbor);
      }
    });

    // remove current from open list
    open = open.filter((node) => node !== current);
  }
}

function neighbors(x, y) {
  return [
    [x, y - 1],
    [x, y + 1],
    [x - 1, y],
    [x + 1, y],
  ];
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
