const fs = require("fs");
const path = require("path");

var puzzles = ["./01", "./02"].map(file => {
  return {
    input: fs.readFileSync(path.resolve(file, "input.txt"), "utf8").trim(),
    ...require(file)
  };
});

let args = process.argv.slice(2);
let day = args[0] ? parseInt(args[0], 10) : undefined;

if (day) solve(day);
else puzzles.forEach((puzzle, i) => solve(i + 1));

function solve(day) {
  let puzzle = puzzles[day - 1];
  console.log(
    `day_${day}_1:`,
    puzzle.Part1(puzzle.Parse(puzzle.input)),
    `\nday_${day}_2:`,
    puzzle.Part2(puzzle.Parse(puzzle.input))
  );
}
