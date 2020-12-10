// parse the input
function Parse(input) {
  return input.split(/\n/).map(n => parseInt(n, 10));
}

//
function Part1(input) {
  const sorted = input.sort((a, b) => a - b);
  const builtin = sorted[sorted.length - 1] + 3;

  const diffs = [...sorted, builtin].map((jolts, i) => {
    return i ? jolts - sorted[i - 1] : jolts;
  });

  const diffCounts = diffs.reduce(
    (acc, val) => {
      if (!val) return acc;
      if (val === 1) {
        acc[0] += 1;
        return acc;
      } else {
        acc[1] += 1;
        return acc;
      }
    },
    [0, 0]
  );

  return { sorted, diffs };
  return diffCounts[0] * diffCounts[1];
}

// can only get rid of indexes who's diffs are 1 and not before a 3
// count all combinations of getting rid of those indexes
// but can't get rid of more than 2 consecutive indexes
function Part2(input) {}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
