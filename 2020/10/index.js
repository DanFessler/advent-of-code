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

  return sorted.map((elem, i) => `${elem}:${diffs[i]}`);
  return [diffCounts, diffCounts[0] * diffCounts[1]];
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

// 3, 2
// 2, 1
// 4 * 2 = 6

// consecutives:  4,4,3,2,4,1,4
// minus one:     3,3,2,1,3,  3
// binary +1:     8,8,4,2,8,  8

let input = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];
// let input = [28,33,18,42,31,14,46,20,48,47,24,23,49,45,19,38,39,11,1,32,25,35,8,17,7,9,4,2,34,10,3]; //prettier-ignore

// 4, 4, 3, 2, 4, 1, 4
let consecutives = [1, 3, 2, 1]
  .map(elem => Math.floor(elem / 2))
  .reduce((acc, val) => acc * (val ? Math.pow(2, val) : 1));

console.log(consecutives);
