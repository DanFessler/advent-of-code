// parse the input
function Parse(input) {
  return input
    .split(/\n/)
    .map((pair) =>
      pair
        .split(",")
        .map((range) => range.split("-").map((str) => parseInt(str, 10)))
    );
}

function Part1(input) {
  count = 0;
  input.forEach(([[a1, a2], [b1, b2]]) => {
    if (a1 == b1 && a2 == b2) count++;
    else {
      if (a1 >= b1 && a2 <= b2) count++;
      if (b1 >= a1 && b2 <= a2) count++;
    }
  });
  return count;
}

function Part2(input) {
  count = 0;
  input.forEach(([[a1, a2], [b1, b2]]) => {
    let rangeB = b2 - b1;
    if (b1 + rangeB >= a1 && b1 <= a2) count++;
  });
  return count;
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
