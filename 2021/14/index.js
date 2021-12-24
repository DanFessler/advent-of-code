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
function Part1([polymer, rules]) {
  // create new polymer by applying rules on old polymer
  for (let i = 0; i < 10; i++) {
    let newPolymer = "";
    for (let i = 0; i < polymer.length - 1; i++) {
      let test = polymer.substr(i, 2);
      newPolymer += test[0];
      if (rules[test]) newPolymer += rules[test];
    }
    polymer = newPolymer + polymer.charAt(polymer.length - 1);
  }

  // add up each element as key/value pairs
  let counts = [...polymer].reduce((acc, val) => {
    if (!acc[val]) acc[val] = 1;
    else acc[val]++;
    return acc;
  }, {});

  // sort element keys by count
  let keys = Object.keys(counts);
  keys.sort((a, b) => counts[b] - counts[a]);

  // return the most common element count minus the least common
  return counts[keys.at(0)] - counts[keys.at(-1)];
}

// Part 2
function Part2([template, rules]) {
  // get initial pair and element counts as key/value pairs
  let [pairs, elements] = [...template].reduce(
    ([pairs, counts], char, i, arr) => {
      if (arr[i + 1]) {
        let pair = arr[i] + arr[i + 1];
        pairs[pair] = pairs[pair] + 1 || 1;
      }
      counts[char] = counts[char] + 1 || 1;
      return [pairs, counts];
    },
    [{}, {}]
  );

  // On each step loop through pairs, and maintain pair and element counts
  for (let steps = 0; steps < 40; steps++) {
    let newPairs = { ...pairs };
    for (let pair in pairs) {
      let pairCount = pairs[pair];
      let newChar = rules[pair];

      // if this pair has a rule, and the we have some number of that pair...
      if (newChar && pairCount) {
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
