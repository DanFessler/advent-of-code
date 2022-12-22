// parse the input
function Parse(input) {
  return input
    .split(/\n\n/)
    .map((elf) => elf.split(/\n/).map((item) => parseInt(item, 10)));
}

// return the highest calorie of all elves
function Part1(input) {
  return sortElfCalories(input)[0];
}

// return the sum of the three highest calorie-carrying elves
function Part2(input) {
  const [a, b, c] = sortElfCalories(input);
  return a + b + c;
}

function sortElfCalories(input) {
  const totals = input.map((elf) => {
    return elf.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  });
  return totals.sort((a, b) => b - a);
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
