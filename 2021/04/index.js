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
      markNum(board, num);

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

function markNum(board, num) {
  let marked = false;
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      if (board[y][x] === num) {
        board[y][x] = "x";
        marked = true;
      }
    }
  }
  return marked;
}

function checkWin(board) {
  // check horizontal
  for (let y = 0; y < 5; y++) {
    let count = 0;
    for (let x = 0; x < 5; x++) {
      if (board[y][x] === "x") count++;
    }
    if (count === 5) return true;
  }

  // check vertical
  for (let x = 0; x < 5; x++) {
    let count = 0;
    for (let y = 0; y < 5; y++) {
      if (board[y][x] === "x") count++;
    }
    if (count === 5) return true;
  }

  // if we got here, the board isn't a winner yet
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
