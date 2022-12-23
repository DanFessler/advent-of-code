// parse the input
function Parse(input) {
  let [state, instructions] = input
    .split(/\n\n/)
    .map((line) => line.split(/\n/));

  // parse the world state
  state.splice(state.length - 1, 1);
  state = state.map((line) => {
    return line.match(/.{1,4}/g).map((piece) => {
      return piece.substr(1, 1);
    });
  });

  // reformat world state into packed columns
  let newState = [...new Array(state[0].length)].map((i) => []);
  for (let y = 0; y < state.length; y++) {
    for (let x = 0; x < state[0].length; x++) {
      let item = state[y][x];
      if (item !== " ") newState[x].push(item);
    }
  }

  // parse instructions extracting only values
  instructions = instructions.map((ins) => {
    let [, m, , f, , t] = ins.split(" ").map((num) => parseInt(num, 10));
    return [m, f, t];
  });

  return [newState, instructions];
}

function Part1([state, instructions]) {
  instructions.forEach(([move, from, to]) => {
    for (let i = 0; i < move; i++) {
      let deleted = state[from - 1].shift();
      state[to - 1].unshift(deleted);
    }
  });

  return state.map((col) => col[0]).join("");
}

function Part2([state, instructions]) {
  instructions.forEach(([move, from, to]) => {
    let deleted = state[from - 1].splice(0, move);
    state[to - 1].unshift(...deleted);
  });

  return state.map((col) => col[0]).join("");
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
