// parse the input
function Parse(input) {
  return input.split(/\n/).map(line => {
    let [policy, password] = line.split(": ");
    let [range, letter] = policy.split(" ");
    let [min, max] = range.split("-");
    return {
      min: parseInt(min, 10),
      max: parseInt(max, 10),
      letter: letter,
      password: password.split("")
    };
  });
}

// count valid passwords according to policy
function Part1(input) {
  let results = input.filter(entry => {
    let letterCount = entry.password.filter(l => l === entry.letter).length;
    return letterCount >= entry.min && letterCount <= entry.max;
  });
  return results.length;
}

// min and max are indexes in which the letter must be in exactly one
function Part2(input) {
  let results = input.filter(entry => {
    let a = entry.password[entry.min - 1] === entry.letter;
    let b = entry.password[entry.max - 1] === entry.letter;
    return (a && !b) || (!a && b);
  });
  return results.length;
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
