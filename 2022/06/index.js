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
    const marker = buffer.substring(i - markerLength, i);
    if (new Set(marker).size === marker.length) return i;
  }
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
