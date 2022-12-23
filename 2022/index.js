const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

let args = process.argv.slice(2);
let day = args[0] ? parseInt(args[0], 10) : undefined;
let inputPath = args[1] || "input.txt";

var puzzles = ["./01", "./02", "./03", "./04", "./05", "./06"].map(
  (file, i) => {
    file = `${__dirname}/${file}`;
    return {
      input: fs.readFileSync(
        // if we're specifying a specific input file, use that instead for that day
        path.resolve(file, day === i + 1 ? inputPath : "input.txt"),
        "utf8"
      ),
      ...require(file),
    };
  }
);

if (day) solve(day);
else puzzles.forEach((puzzle, i) => solve(i + 1));

function solve(day) {
  try {
    let puzzle = puzzles[day - 1];
    let [part1, part2] = [
      run(puzzle.Part1, puzzle.Parse(puzzle.input)),
      run(puzzle.Part2, puzzle.Parse(puzzle.input)),
    ];
    console.log(`day_${day}_1:`, ...part1, `\nday_${day}_2:`, ...part2);
  } catch (err) {
    console.error("Invalid Puzzle: " + day, err);
  }
}

function run(fn, input) {
  let t1 = performance.now();
  let result = fn(input);
  let t2 = performance.now();
  return [result, Math.floor((t2 - t1) * 100) / 100 + "ms"];
}
