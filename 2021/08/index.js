// parse the input
function Parse(input) {
  return input.split(/\r?\n/).map((line) =>
    line.split(" | ").map((part) =>
      part.split(" ").map((string) => {
        return string.split("").sort().join("");
      })
    )
  );
}

// Part 1
function Part1(input) {
  let count = 0;
  input.forEach(([patterns, output]) => {
    output.forEach((element) => {
      if ([2, 4, 3, 7].includes(element.length)) {
        count++;
      }
    });
  });
  return count;
}

// Part 2
function Part2(input) {
  let results = input.map(([patterns, output]) => {
    let digits = {};

    patterns.sort((a, b) => a.length - b.length);
    let L5 = patterns.filter((pattern) => pattern.length == 5);
    let L6 = patterns.filter((pattern) => pattern.length == 6);

    digits[1] = patterns[0];
    digits[4] = patterns[2];
    digits[7] = patterns[1];
    digits[8] = patterns[9];
    digits[3] = L5.find((pattern) => includesChars(pattern, digits[1]));
    digits[9] = L6.find((pattern) => includesChars(pattern, digits[4]));
    digits[2] = L5.find((pattern) => !includesChars(digits[9], pattern));
    digits[6] = L6.find((pattern) => !includesChars(pattern, digits[7]));
    digits[5] = L5.find((pattern) => includesChars(digits[6], pattern));
    digits[0] = L6.find((pattern) => !includesChars(pattern, digits[5]));

    // transpose key/value to make a string mapping
    let mapping = {};
    Object.keys(digits).forEach((key) => {
      mapping[digits[key]] = key;
    });

    return output.map((out) => mapping[out]).join("") * 1;
  });

  return results.reduce((acc, val) => acc + val, 0);
}

function includesChars(inputStr, testStr) {
  const strArr = inputStr.split("");
  const testArr = testStr.split("");
  for (i in testArr) {
    if (!strArr.includes(testArr[i])) return false;
  }
  return true;
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
