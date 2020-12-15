// parse the input
function Parse(input) {
  return input.split(/\n/).map(n => parseInt(n, 10));
}

// count total 1-diffs and 3-diffs, multiply together
function Part1(input) {
  const diffs = getDiffs(input);

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

  return diffCounts[0] * diffCounts[1];
}

// can only get rid of indexes who's diffs are 1 and not before a 3
// count all combinations of getting rid of those indexes
// but can't get rid of more than 2 consecutive indexes
function Part2(input) {
  let diffs = getDiffs(input);
  let results = [];
  let lastbit = null;

  // build an array of consecutive 1-diff lengths
  for (let i = 0; i < diffs.length; i++) {
    let jolt = diffs[i];
    if (jolt === 1) {
      if (lastbit === 1) {
        results[results.length - 1]++;
      } else {
        results.push(1);
      }
    }
    lastbit = jolt;
  }

  // I worked out the permutations by hand for a run of consecutive 1-diffs from 1 to 5
  // which 4 seems like the longest consecutive run present in my data. Not happy with this
  const permutationTable = [1, 2, 4, 7, 13];
  results = results.map(val => permutationTable[val - 1]);
  console.log(results);

  // multiply the permutations together
  return results.reduce((acc, val) => acc * val);
}

function getDiffs(input) {
  const sorted = input.sort((a, b) => a - b);
  const builtin = sorted[sorted.length - 1] + 3;

  return [...sorted, builtin].map((jolts, i) => {
    return i ? jolts - sorted[i - 1] : jolts;
  });
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
