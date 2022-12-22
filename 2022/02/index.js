// parse the input
function Parse(input) {
  return input.split(/\n/).map((strat) => strat.split(" "));
}

function Part1(input) {
  // translate strat to moves
  const moves = input.map((round) => {
    return round.map((move) => {
      if (move == "A" || move == "X") return "R";
      if (move == "B" || move == "Y") return "P";
      if (move == "C" || move == "Z") return "S";
    });
  });

  return calculateScore(moves);
}

function Part2(input) {
  // translate strat to moves
  const moves = input.map(([theirMove, instruction]) => {
    const move = { A: "R", B: "P", C: "S" }[theirMove];
    const winningMove = { R: "P", P: "S", S: "R" }[move];
    const losingMove = { R: "S", P: "R", S: "P" }[move];
    switch (instruction) {
      case "X": // lose
        return [move, losingMove];
      case "Y": // draw
        return [move, move];
      case "Z": // win
        return [move, winningMove];
    }
  });

  return calculateScore(moves);
}

function calculateScore(turns) {
  let score = 0;
  turns.forEach(([theirMove, yourMove]) => {
    // add constant amount of points for each shape you selected
    const shapeMap = { R: 1, P: 2, S: 3 };
    score += shapeMap[yourMove];

    // if it's a draw, add 3 points
    if (theirMove === yourMove) score += 3;

    // if we've won, add 6 points
    const winMap = { R: "P", P: "S", S: "R" };
    if (winMap[theirMove] == yourMove) score += 6;
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
