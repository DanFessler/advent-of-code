// parse the input
function Parse(input) {
  return input.split(/\n/).map(n => parseInt(n, 10));
}

// return first number who's 2 of prior 25 dont sum to it
function Part1(input) {
  for (let i = 26; i < input.length; i++) {
    let sum = input[i];
    let partial = input.slice(i - 25, i);

    let b;
    for (a of partial) {
      b = partial.find(b => a + b === sum && a !== b);
      if (b) break;
    }

    if (!b) return sum;
  }
}

// find contiguous sum to part 1, add first and last
function Part2(input) {
  let fault = Part1(input);

  for (let i = 0; i < input.length; i++) {
    let sum = 0;
    let i2 = i;
    while (sum < fault) {
      sum += input[i2];
      i2++;
    }

    if (sum === fault) {
      let partial = input.slice(i, i2).sort((a, b) => a - b);
      return partial[0] + partial[partial.length - 1];
    }
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
