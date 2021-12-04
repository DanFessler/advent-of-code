// parse the input
function Parse(input) {
  let [random, ...boards] = input.split(/\r?\n\r?\n/);

  return {
    random: random.split(",").map((num) => parseInt(num, 10)),
    boards: boards.map((board) => {
      return board.split(/\r?\n/).map((row) => {
        return row
          .trim()
          .split(/\s\s?/)
          .map((num) => {
            return num * 1;
          });
      });
    }),
  };
}

// Find first winning board
function Part1(input) {
  let { random, boards } = input;

  try {
    play(random, boards, (board, num) => {
      throw [board, num];
    });
  } catch ([board, num]) {
    return sumCels(board) * num;
  }
}

// Find last winning board
function Part2(input) {
  let { random, boards } = input;

  try {
    let winCount = 0;
    play(random, boards, (board, num) => {
      winCount++;
      if (winCount === boards.length) {
        throw [board, num];
      }
    });
  } catch ([board, num]) {
    return sumCels(board) * num;
  }
}

function play(random, boards, func) {
  random.forEach((num) => {
    boards.forEach((board, i) => {
      // exit early if board is already solved
      if (!board) return;

      // Mark the square
      for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
          if (board[y][x] === num) {
            board[y][x] = "x";
          }
        }
      }

      // check for a win and run custom function
      if (checkWin(board)) {
        func(board, num);
        boards[i] = null;
      }
    });
  });
}

function sumCels(board) {
  return board.flat().reduce((sum, cel) => {
    if (cel !== "x") return sum + cel;
    return sum;
  }, 0);
}

function checkWin(board) {
  for (let y = 0; y < 5; y++) {
    let countH = 0;
    let countV = 0;
    for (let x = 0; x < 5; x++) {
      if (board[y][x] === "x") countH++;
      if (board[x][y] === "x") countV++;
    }
    if (countH === 5 || countV === 5) return true;
  }
  return false;
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
