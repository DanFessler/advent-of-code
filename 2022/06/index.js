// parse the input
function Parse(input) {
  return input;
}

function Part1(input) {
  return findMarkerIndex(input, 4);
}

function Part2(input) {
  return findMarkerIndex(input, 14);
}

function findMarkerIndex(buffer, markerLength) {
  for (let i = markerLength; i < buffer.length; i++) {
    if (isDistinct(buffer.substring(i - markerLength, i))) return i;
  }
}

function isDistinct2(string) {
  let str = "";
  for (let i = 0; i < string.length; i++) {
    if (str.includes(string[i])) return false;
    str += string[i];
  }
  return true;
}

function isDistinct(string) {
  return new Set(string).size === string.length;
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
