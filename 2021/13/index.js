// parse the input
function Parse(input) {
  let [points, instructions] = input.split(/\r?\n\r?\n/);

  return [
    points.split(/\r?\n/).map((row) => {
      let [x, y] = row.split(",").map((val) => val * 1);
      return { x, y };
    }),
    instructions.split(/\r?\n/).map((instruction) => {
      return instruction.split("fold along ")[1].split("=");
    }),
  ];
}

// Part 1
function Part1([points, instructions]) {
  let set = new Set();

  fold(points, instructions[0], ({ x, y }) => {
    set.add(x + "," + y);
  });

  return set.size;
}

// Part 2
function Part2([points, instructions]) {
  let [width, height] = [0, 0];

  instructions.forEach((instruction, i) => {
    fold(points, instruction, ({ x, y }) => {
      if (i === instructions.length - 1) {
        if (x > width) width = x;
        if (y > height) height = y;
      }
    });
  });

  let map = new Array(height + 1).fill().map(() => {
    return new Array(width + 1).fill(" ");
  });

  points.forEach(({ x, y }) => {
    map[y][x] = "█";
  });

  return "\n" + map.map((row) => row.join("")).join("\n");
}

function fold(points, [axis, loc], fn) {
  points.forEach((point) => {
    if (point[axis] > loc) {
      let d = point[axis] - loc;
      point[axis] = loc - d;
    }
    fn(point);
  });
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
