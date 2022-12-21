// parse the input
function Parse(input) {
  input = "[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]";

  return input.split(/\r?\n/);

  return input.split(/\r?\n/).map((string) => {
    return JSON.parse(string);
  });
}

// Part 1
function Part1(input) {
  for (number of input) {
    console.log(number);

    let nest = 0;
    for (i in number) {
      let char = number[i];
      // console.log(char);
      if (char == "[") nest++;
      if (char == "]") nest--;

      if (nest === 5) {
        let endi = i;
        while (number[endi++] !== "]") {}
        // console.log("end", number.substring(i, endi));
        let [a, b] = JSON.parse(number.substring(i, endi));

        number = number.slice(0, i) + "0" + number.slice(endi + 1);
        findNumIndex(number, i - 1, -1, a);
        console.log(number);
      }
    }
  }
  // return input;
}

function findNumIndex(string, i, direction, num) {
  while (
    !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(string[i])
  ) {
    i += direction;
    console.log("string", string[i]);
  }
  string = string.slice(0, i) + (num + string[i] * 1) + string.slice(i + 1);
  console.log(string);
  // console.log("found!", string[i]);
}

// Part 2
function Part2(input) {}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
