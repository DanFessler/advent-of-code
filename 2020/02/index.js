// Get input either from browser or file
var BROWSER = typeof window !== "undefined";
var input = !BROWSER
  ? require("../../input.js")(__dirname).trim()
  : document.body.textContent.trim();

// parse the input
input = input.split("\n").map(line => {
  let [policy, password] = line.split(": ");
  let [range, letter] = policy.split(" ");
  let [min, max] = range.split("-");
  return {
    min: parseInt(min, 10),
    max: parseInt(max, 10),
    letter,
    password: password.split("")
  };
});

// count valid passwords according to policy
function Part1() {
  let results = input.filter(entry => {
    let letterCount = entry.password.filter(let => let === entry.letter).length;
    return letterCount >= entry.min && letterCount <= entry.max;
  });
  return results.length;
}

// min and max are indexes in which the letter must be in exactly one
function Part2() {
  let results = input.filter(entry => {
    let a = entry.password[entry.min - 1] === entry.letter;
    let b = entry.password[entry.max - 1] === entry.letter;
    return (a && !b) || (!a && b);
  });
  return results.length;
}

if (!BROWSER) module.exports = [Part1, Part2];
else console.log(Part1(), Part2());
