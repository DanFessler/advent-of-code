var puzzles = ["./01", "./02"].map(file => require(file));

let args = process.argv.slice(2);
let day = args[0] ? parseInt(args[0], 10) : undefined;

// if day was specified, only print that day's solution
if (day) {
  console.log(
    `day_${day}_1:`,
    puzzles[day - 1][0](),
    `\nday_${day}_2:`,
    puzzles[day - 1][1]()
  );
}
// Otherwise print all puzzle solutions
else {
  puzzles.forEach((puzzle, i) =>
    console.log(
      `day_${i + 1}_1:`,
      puzzle[0](),
      `\nday_${i + 1}_2:`,
      puzzle[1]()
    )
  );
}
