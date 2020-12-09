// parse the input into array of binary addresses
function Parse(input) {
  return input.split("\r\n").map(seat => ({
    row: seat
      .substr(0, 7)
      .split("")
      .map(letter => (letter == "F" ? 0 : 1)),
    col: seat
      .substr(7)
      .split("")
      .map(letter => (letter == "L" ? 0 : 1))
  }));
}

// find highest seat ID
function Part1(input) {
  return decodeSeats(input).reduce((largestId, id) =>
    id > largestId ? id : largestId
  );
}

// find empty seat with neighboring filled seats
function Part2(input) {
  return (
    decodeSeats(input).find(
      (seatID, i, arr) =>
        arr.find(nextSeatID => nextSeatID === seatID + 1) === undefined &&
        arr.find(nextSeatID => nextSeatID === seatID + 2) !== undefined
    ) + 1
  );
}

function decodeSeats(input) {
  return input.map(seat => {
    let row = binarySearch(128, [...seat.row]);
    let col = binarySearch(8, [...seat.col]);
    let id = row * 8 + col;
    return id;
  });
}

function binarySearch(size, address, index = 0) {
  if (address.length > 0) {
    let instruction = address[0];
    address.shift();
    size = size / 2;
    return binarySearch(size, address, index + instruction * size);
  }
  return index;
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
