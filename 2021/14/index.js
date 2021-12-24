// parse the input
function Parse(input) {
  let [template, rules] = input.split(/\r?\n\r?\n/);
  return [
    template,
    rules.split(/\r?\n/).reduce((obj, rule) => {
      let [pattern, insert] = rule.split(" -> ");
      obj[pattern] = insert;
      return obj;
    }, {}),
  ];
}

// Part 1
function Part1(input) {
  return solve(input, 10);
}

// Part 2
function Part2(input) {
  return solve(input, 40);
}

function solve([template, rules], steps) {
  // get initial pair and element counts as key/value pairs
  let [pairs, elements] = [...template].reduce(
    ([pairs, elements], char, i) => {
      let pair = template.substr(i, 2);

      pairs[pair] = pairs[pair] + 1 || 1;
      elements[char] = elements[char] + 1 || 1;

      return [pairs, elements];
    },
    [{}, {}]
  );

  // On each step loop through pairs, and maintain pair and element counts
  for (let i = 0; i < steps; i++) {
    let newPairs = { ...pairs };

    for (let pair in pairs) {
      let [pairCount, newChar] = [pairs[pair], rules[pair]];

      if (newChar) {
        let [pairA, pairB] = [pair[0] + newChar, newChar + pair[1]];
        elements[newChar] = elements[newChar] + pairCount || pairCount;
        newPairs[pairA] = newPairs[pairA] + pairCount || pairCount;
        newPairs[pairB] = newPairs[pairB] + pairCount || pairCount;
        newPairs[pair] -= pairCount;
      }
    }

    pairs = newPairs;
  }

  // sort element keys by count
  let keys = Object.keys(elements);
  keys.sort((a, b) => elements[b] - elements[a]);

  // return the most common element count minus the least common
  return elements[keys.at(0)] - elements[keys.at(-1)];
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
