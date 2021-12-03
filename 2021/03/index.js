// parse the input
function Parse(input) {
  return input
    .split(/\r?\n/)
    .map((num) => num.split("").map((num) => parseInt(num, 10)));
}

function Part1(input) {
  const total = input.reduce((acc, numArr) => {
    return numArr.map((num, i) => (acc[i] += num));
  }, new Array(12).fill(0));

  const binary = total
    .map((total) => (total / input.length > 0.5 ? 1 : 0))
    .join("");
  const binaryNot = total
    .map((total) => (total / input.length > 0.5 ? 0 : 1))
    .join("");

  return parseInt(binary, 2) * parseInt(binaryNot, 2);
}

function Part2(input) {
  function getRating(invert) {
    let filtered = input;
    let bit = 0;

    while (filtered.length > 1) {
      const total = filtered.reduce((acc, numArr) => {
        return numArr.map((num, i) => (acc[i] += num));
      }, new Array(12).fill(0));

      let commonBit = total[bit] / filtered.length >= 0.5 ? 1 : 0;
      if (invert) commonBit = 1 - commonBit;

      filtered = filtered.filter((num) => {
        return num[bit] === commonBit;
      });

      bit++;
    }

    return parseInt(filtered[0].join(""), 2);
  }

  return getRating() * getRating(true);
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
