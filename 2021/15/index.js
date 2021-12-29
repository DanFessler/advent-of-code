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

// A* search algorithm
function search(map, [x1, y1], [x2, y2]) {
  let open = [{ pos: [x1, y1], g: 0, f: 0 }];
  let visited = {};

  while (open.length) {
    // find node with least cost
    let q = open.reduce((lowest, node) => {
      if (!lowest || node.f < lowest.f) return node;
      return lowest;
    }, 0);

    let [x, y] = q.pos;

    // if we reached the end, return the total cost
    if (x == x2 && y == y2) return q.g;

    let neighbors = [
      [x + 0, y + -1],
      [x + 0, y + +1],
      [x + -1, y + 0],
      [x + +1, y + 0],
    ];

    neighbors.forEach(([x, y]) => {
      if (map[y] && map[y][x]) {
        let d = map[y][x];

        let neighbor = {
          pos: [x, y],
          g: q.g + d,
          f: q.g + d + Math.abs(x2 - x1) + Math.abs(y2 - y1),
        };

        i = y * map[0].length + x;
        if (!visited[i] || neighbor.g < visited[i].g) {
          visited[i] = neighbor;

          let isOpen = open.find((node) => {
            let [x2, y2] = node.pos;
            return x == x2 && y == y2;
          });

          if (!isOpen) open.push(neighbor);
        }
      }
    });

    // remove q from open list
    open = open.filter((node) => node !== q);
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
