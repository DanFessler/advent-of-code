// parse the input
function Parse(input) {
  return input.split("\r\n").map(cmd => cmd.split(" "));
}

// value of acc before repeating an instruction
function Part1(input) {
  let [result, terminated] = Run(input);
  return result;
}

// value of acc after patching in fixed instruction
function Part2(input) {
  for (let i = 0; i < input.length; i++) {
    let [cmd, val] = input[i];

    if (cmd === "nop" || cmd === "jmp") {
      let inputCopy = [...input];
      inputCopy[i] = [cmd === "nop" ? "jmp" : "nop", val];

      let [result, terminated] = Run(inputCopy);
      if (terminated) return result;
    }
  }
}

function Run(input) {
  let acc = 0;
  let visited = {};

  for (let i = 0; i < input.length; i++) {
    if (visited[i] !== undefined) return [acc, false];
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

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
