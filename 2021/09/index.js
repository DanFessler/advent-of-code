// parse the input
function Parse(input) {
  return input
    .split(/\r?\n/)
    .map((row) => row.split("").map((num) => parseInt(num, 10)));
}

// Part 1
function Part1(input) {
  let lowestPoints = [];

  findLowPoints(input, (x, y) => {
    lowestPoints.push(input[y][x]);
  });

  return lowestPoints.reduce((acc, point) => acc + point + 1, 0);
}

// Part 2
function Part2(input) {
  let basinSizes = [];

  findLowPoints(input, (x, y) => {
    basinSizes.push(getBasinSize(input, x, y));
  });

  return basinSizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, size) => acc * size);
}

function getBasinSize(input, x, y) {
  let hash = { [`${x},${y}`]: input[y][x] };

  while (true) {
    let newHash = {};

    for (key in hash) {
      let [x, y] = key.split(",").map((val) => val * 1);
      const neighbors = [
        [x, y - 1],
        [x, y + 1],
        [x - 1, y],
        [x + 1, y],
      ];

      neighbors.forEach(([tx, ty]) => {
        if (tx < 0 || tx > input[0].length - 1) return;
        if (ty < 0 || ty > input.length - 1) return;
        if (hash[`${tx},${ty}`]) return;
        if (input[ty][tx] == 9) return;
        if (input[ty][tx] <= input[y][x]) return;

        newHash[`${tx},${ty}`] = input[ty][tx];
      });
    }

    hash = { ...hash, ...newHash };
    if (!Object.keys(newHash).length) break;
  }

  return Object.keys(hash).length;
}

function findLowPoints(input, fn) {
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      let [center, up, down, left, right] = [
        input[y][x],
        y > 0 ? input[y - 1][x] : 10,
        y < input.length - 1 ? input[y + 1][x] : 10,
        x > 0 ? input[y][x - 1] : 10,
        x < input[0].length - 1 ? input[y][x + 1] : 10,
      ];

      if (center < up && center < down && center < left && center < right) {
        fn(x, y);
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
