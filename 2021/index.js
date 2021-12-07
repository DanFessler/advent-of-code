const fs = require("fs");
const path = require("path");

let args = process.argv.slice(2);
let day = args[0] ? parseInt(args[0], 10) : undefined;
let inputPath = args[1] || "input.txt";

var puzzles = ["./01", "./02", "./03", "./04", "./05", "./06", "./07"].map(
  (file, i) => {
    file = `${__dirname}/${file}`;
    return {
      input: fs
        .readFileSync(
          // if we're specifying a specific input file, use that instead for that day
          path.resolve(file, day === i + 1 ? inputPath : "input.txt"),
          "utf8"
        )
        .trim(),
      ...require(file),
    };
  }
);

if (day) solve(day);
else puzzles.forEach((puzzle, i) => solve(i + 1));

function solve(day) {
  try {
    let puzzle = puzzles[day - 1];
    // let input = puzzle.Parse(puzzle.input);
    console.log(
      `day_${day}_1:`,
      puzzle.Part1(puzzle.Parse(puzzle.input)),
      `\nday_${day}_2:`,
      puzzle.Part2(puzzle.Parse(puzzle.input))
    );
  } catch (err) {
    console.error("Invalid Puzzle: " + day, err);
  }
}
