// parse the input
function Parse(input) {
  return input.split(/\n/).map((strat) => strat.split(" "));
}

const MOV_MAP = { A: "R", B: "P", C: "S", X: "R", Y: "P", Z: "S" };
const WIN_MAP = { R: "P", P: "S", S: "R" };
const LOS_MAP = { R: "S", P: "R", S: "P" };
const PNT_MAP = { R: 1, P: 2, S: 3 };

function Part1(input) {
  // translate strat to moves
  const moves = input.map((round) => {
    return round.map((move) => MOV_MAP[move]);
  });

  return calculateScore(moves);
}

function Part2(input) {
  // translate strat to moves
  const moves = input.map(([theirMove, instruction]) => {
    const move = MOV_MAP[theirMove];

    switch (instruction) {
      case "X":
        return [move, LOS_MAP[move]];
      case "Z":
        return [move, WIN_MAP[move]];
      case "Y":
        return [move, move];
    }
  });

  return calculateScore(moves);
}

function calculateScore(turns) {
  let score = 0;
  turns.forEach(([theirMove, yourMove]) => {
    score += PNT_MAP[yourMove];
    if (theirMove === yourMove) score += 3;
    if (WIN_MAP[theirMove] == yourMove) score += 6;
  });
  return score;
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
