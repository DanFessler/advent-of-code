var puzzles = ["./01", "./02"].map(file => require(file));

let args = process.argv.slice(2);
let day = args[0] ? parseInt(args[0], 10) : undefined;

if (day) solve(day);
else puzzles.forEach((puzzle, i) => solve(i + 1));

function solve(day) {
  console.log(
    `day_${day}_1:`,
    puzzles[day - 1][0](),
    `\nday_${day}_2:`,
    puzzles[day - 1][1]()
  );
}
