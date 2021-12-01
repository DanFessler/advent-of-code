// parse the input
function Parse(input) {
  return input.split(/\n/).map((item) => parseInt(item, 10));
}

// count the number of times a depth measurement increases from the previous measurement
function Part1(input) {
  let count = 0;
  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) count++;
  }
  return count;
}

// count the number of times the sum of measurements in this sliding window increases from the previous sum
function Part2(input) {
  let count = 0;
  let lastSum = undefined;
  for (let i = 1; i < input.length; i++) {
    let sum = input[i - 1] + input[i] + input[i + 1];
    if (lastSum !== undefined && sum > lastSum) count++;
    lastSum = sum;
  }
  return count;
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
