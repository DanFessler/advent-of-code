// parse the input
function Parse(input) {
  return input.split(",").map((age) => age * 1);
}

// Part 1
function Part1(input, days = 80) {
  let fish = [...input];

  for (let day = 0; day < days; day++) {
    fish.forEach((specimen, i) => {
      fish[i] = specimen - 1;
      if (fish[i] < 0) {
        fish[i] = 6;
        fish.push(8);
      }
    });
  }

  return fish.length;
}

// Part 2
function Part2(input, days = 256) {
  // separate into age groups
  let fish = new Array(9).fill(0);
  input.forEach((age) => {
    fish[age]++;
  });

  // update group counts each day;
  for (let i = 0; i < days; i++) {
    let newFish = new Array(9).fill(0);
    for (day in fish) {
      if (day == 0) {
        newFish[6] = fish[0];
        newFish[8] = fish[0];
      } else {
        newFish[day - 1] += fish[day];
      }
    }
    fish = [...newFish];
  }

  // sum the total
  return fish.reduce((acc, val) => acc + val, 0);
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
