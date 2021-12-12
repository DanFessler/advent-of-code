// parse the input
function Parse(input) {
  return input.split(/\r?\n/).map((row) => row.split("").map((num) => num * 1));
}

// Part 1
function Part1(input) {
  try {
    let total = 0;
    solve(input, (step, flashes) => {
      total += flashes;
      if (step === 100) throw total;
    });
  } catch (total) {
    return total;
  }
}

// Part 2
function Part2(input) {
  try {
    solve(input, (step, flashes) => {
      if (flashes === 100) throw step;
    });
  } catch (step) {
    return step;
  }
}

function solve(input, fn) {
  let step = 0;
  let grid = input;

  while (++step) {
    // increment energy
    grid = grid.map((row) => row.map((num) => num + 1));

    // handle flash propegation
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        propegateFlash(grid, x, y);
      }
    }

    // count flashes on this iteration
    let flashes = grid.flat().reduce((acc, val) => acc + (val == 0 && 1), 0);

    // call user function
    fn(step, flashes);
  }
}

function propegateFlash(grid, x1, y1) {
  // check if cell qualifies
  if (grid[y1][x1] > 9) {
    grid[y1][x1] = 0;

    // increment neighbors energy and recursively check
    for (let y = y1 - 1; y <= y1 + 1; y++) {
      for (let x = x1 - 1; x <= x1 + 1; x++) {
        if (!grid[y] || !grid[y][x]) continue;
        grid[y][x]++;
        propegateFlash(grid, x, y);
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
