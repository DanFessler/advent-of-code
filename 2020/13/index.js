// parse the input
function Parse(input) {
  let [earliest, busIds] = input.split(/\n/);
  earliest = parseInt(earliest, 10);
  busIds = busIds.split(",").map(id => (id === "x" ? 0 : parseInt(id, 10)));
  return { earliest, busIds };
}

function Part1({ earliest, busIds }) {
  let filtered = busIds.filter(id => id !== "x");
  let earliestBus = filtered
    .map(id => ({ id, wait: calcWait(id, earliest) }))
    .sort((a, b) => a.wait - b.wait)[0];
  return earliestBus.id * earliestBus.wait;
}

function Part2({ busIds }) {
  let largest = busIds
    .map((id, index) => ({ index, id }))
    .sort((a, b) => b.id - a.id)[0];

  let t = Math.floor(100000000000000 / busIds[0]) * busIds[0];
  let i = 0;
  while (true) {
    if (subsequentDeparture(busIds, 1, t)) break;
    else {
      let d = Math.max(
        Math.floor(calcWait(largest.id, t + largest.index) / busIds[0]) *
          busIds[0],
        busIds[0]
      );
      t = t + d;
      if (i++ % 1000000 === 0) console.log(t, d);
      // t += busIds[0];
    }
  }
  return t;
}

function subsequentDeparture(ids, index, time) {
  if (index === ids.length) return true;
  if (calcWait(ids[index], time) === 1 || ids[index] === 0)
    return subsequentDeparture(ids, index + 1, time + 1);
  else return false;
}

function calcWait(id, time) {
  return id - (time % id);
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
