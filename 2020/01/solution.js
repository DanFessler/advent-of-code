// Get input either from browser or file
let input;
if (typeof window === "undefined") {
  input = require("fs").readFileSync(
    require("path").resolve(__dirname, "input.txt"),
    "utf8"
  );
} else {
  input = document.body.textContent.trim();
}

// parse the input
input = input.split("\n").map(item => parseInt(item, 10));

// Part 1
// Find two numbers that add to 2020 and multiply them together
for (i = 0; i < input.length; i++) {
  let A = input[i];
  let B = input.filter(item => A + item === 2020)[0];
  if (B !== undefined) {
    console.log(A * B);
    break;
  }
}

// Part 2
// find three numbers that add to 2020 and multiply them together
try {
  for (A = 0; A < input.length; A++) {
    for (B = 0; B < input.length; B++) {
      for (C = 0; C < input.length; C++) {
        if (input[A] + input[B] + input[C] === 2020) {
          throw input[A] * input[B] * input[C];
        }
      }
    }
  }
} catch (value) {
  console.log(value);
}
