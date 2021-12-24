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
  let [pairs, elements] = [{}, {}];

  // get initial pair and element counts as key/value pairs
  for (let i in template) {
    let pair = template.substr(i, 2);
    pairs[pair] = pairs[pair] + 1 || 1;
    elements[pair[0]] = elements[pair[0]] + 1 || 1;
  }

  // On each step loop through pairs, and maintain pair and element counts
  for (let i = 0; i < steps; i++) {
    let newPairs = { ...pairs };

    for (let pair in pairs) {
      let [pairCount, newEl] = [pairs[pair], rules[pair]];

      if (newEl) {
        let [pairA, pairB] = [pair[0] + newEl, newEl + pair[1]];
        newPairs[pair] -= pairCount;
        newPairs[pairA] = newPairs[pairA] + pairCount || pairCount;
        newPairs[pairB] = newPairs[pairB] + pairCount || pairCount;
        elements[newEl] = elements[newEl] + pairCount || pairCount;
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
