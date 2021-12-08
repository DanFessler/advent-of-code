// parse the input
function Parse(input) {
  return input
    .split(/\r?\n/)
    .map((line) =>
      line
        .split(" | ")
        .map((part) =>
          part.split(" ").map((string) => string.split("").sort().join(""))
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
    let fives = new Set();
    let sixes = new Set();

    // first match all the uniques
    patterns.forEach((element) => {
      if (element.length == 2) digits[1] = element;
      if (element.length == 4) digits[4] = element;
      if (element.length == 3) digits[7] = element;
      if (element.length == 7) digits[8] = element;

      // add ambiguous strings to a set list by length
      if (element.length == 5) fives.add(element);
      if (element.length == 6) sixes.add(element);
    });

    // 3 is the only length-5 that contains the segments from digit 1
    digits[3] = [...fives].find((string) => {
      return includesChars(string, digits[1]);
    });

    // 5 contains segments from digit 4 when you remove digit 1 segments
    digits[5] = [...fives].find((string) => {
      return includesChars(
        string,
        digits[4].replace(digits[1][0], "").replace(digits[1][1], "")
      );
    });

    // 2 is the last remaining length-5
    digits[2] = [...fives].find((string) => {
      return string !== digits[3] && string !== digits[5];
    });

    // 9 is the only length-6 that contains the segments from digit 3
    digits[9] = [...sixes].find((string) => {
      return includesChars(string, digits[3]);
    });

    // 6 contains digit 5, but so does 9 which we've already found so exclude it
    digits[6] = [...sixes].find((string) => {
      return includesChars(string, digits[5]) && string !== digits[9];
    });

    // 0 is the last remaining length-6
    digits[0] = [...sixes].find((string) => {
      return string !== digits[6] && string !== digits[9];
    });

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
