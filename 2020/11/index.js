// parse the input
function Parse(input) {
  return input.split(/\n/).map(row => row.split(""));
}

function Part1(input) {
  while (true) {
    try {
      input = step(input, 4, 1);
    } catch (result) {
      return result.flat().reduce((acc, val) => acc + (val === "#" ? 1 : 0), 0);
    }
  }
}

function Part2(input) {
  while (true) {
    try {
      input = step(input, 5, 0);
    } catch (result) {
      return result.flat().reduce((acc, val) => acc + (val === "#" ? 1 : 0), 0);
    }
  }
}

function step(input, countTolerance, distance) {
  let nextInput = input.map(row => [...row]);
  let width = input[0].length;
  let height = input.length;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let cel = input[y][x];
      let count = countAdjacent(x, y, input, distance);

      if (cel === "L" && count === 0) nextInput[y][x] = "#";
      if (cel === "#" && count >= countTolerance) nextInput[y][x] = "L";
    }
  }
  // console.log(nextInput.map(row => row.join(" ")).join("\n") + "\n");
  if (JSON.stringify(nextInput) === JSON.stringify(input)) throw nextInput;
  return nextInput;
}

// Count adjacent occupied seats by looking in 8 directions to the nearest chair
// limited by a specified distance
function countAdjacent(x, y, input, distance) {
  let count = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx !== 0 || dy !== 0) {
        if (seatVisible(x, y, dx, dy, input, distance)) {
          count++;
        }
      }
    }
  }
  return count;
}

// recursively look for first seat in a given direction dx,dy from x,y
function seatVisible(x, y, dx, dy, input, distance) {
  let width = input[0].length;
  let height = input.length;
  let nextX = x + dx;
  let nextY = y + dy;

  if (nextX < 0 || nextX > width - 1 || nextY < 0 || nextY > height - 1)
    return false;

  switch (input[nextY][nextX]) {
    case "L":
      return false;
    case "#":
      return true;
    default:
      distance--;
      if (distance) {
        return seatVisible(nextX, nextY, dx, dy, input, distance);
      } else {
        return false;
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
