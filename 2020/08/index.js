// parse the input
function Parse(input) {
  return input.split("\r\n").map(cmd => cmd.split(" "));
}

// what's val of acc before repeating an instruction
function Part1(input) {
  let acc = 0;
  let visited = {};

  for (let i = 0; i < input.length; i++) {
    if (visited[i] !== undefined) return acc;
    visited[i] = true;

    let [cmd, val] = input[i];
    val = parseInt(val, 10);

    switch (cmd) {
      case "acc":
        acc += val;
        break;
      case "jmp":
        i += val - 1;
        break;
    }
  }
  return [acc, true];
}

// What's val of acc after patching in fixed instruction
function Part2(input) {
  for (let i = 0; i < input.length; i++) {
    let inputCopy = [...input];
    inputCopy[i] = [...inputCopy[i]];

    if (inputCopy[i][0] === "nop") inputCopy[i][0] = "jmp";
    else if (inputCopy[i][0] === "jmp") inputCopy[i][0] = "nop";

    let result = Part1(inputCopy);
    if (result[1]) return result[0];
  }
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
