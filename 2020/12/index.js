// parse the input
function Parse(input) {
  return input
    .split(/\n/)
    .map(row => [row.substring(0, 1), parseInt(row.slice(1), 10)]);
}

function Part1(input) {
  let pos = { x: 0, y: 0, a: 0 };
  input.forEach(cmd => {
    let [key, val] = cmd;

    const instructions = {
      N: () => (pos.y += val),
      S: () => (pos.y -= val),
      E: () => (pos.x += val),
      W: () => (pos.x -= val),
      L: () => (pos.a = (pos.a + 4 - val / 90) % 4),
      R: () => (pos.a = (pos.a + 4 + val / 90) % 4),
      F: () => {
        if (pos.a === 0) pos.x += val;
        if (pos.a === 1) pos.y -= val;
        if (pos.a === 2) pos.x -= val;
        if (pos.a === 3) pos.y += val;
      }
    };

    instructions[key]();
    // console.log(key, val, pos);
  });
  return Math.abs(pos.x) + Math.abs(pos.y);
}

function Part2(input) {
  let pos = { x: 0, y: 0, a: 0 };
  let wpt = { x: 10, y: 1 };

  input.forEach(cmd => {
    let [key, val] = cmd;

    const instructions = {
      N: () => (wpt.y += val),
      S: () => (wpt.y -= val),
      E: () => (wpt.x += val),
      W: () => (wpt.x -= val),
      L: () => {
        for (let i = 0; i < val / 90; i++) {
          wpt = { x: -wpt.y, y: wpt.x };
        }
      },
      R: () => {
        for (let i = 0; i < val / 90; i++) {
          wpt = { x: wpt.y, y: -wpt.x };
        }
      },
      F: () => {
        for (let i = 0; i < val; i++) {
          pos.x += wpt.x;
          pos.y += wpt.y;
        }
      }
    };

    instructions[key]();
    // console.log(key, val, pos);
  });
  return Math.abs(pos.x) + Math.abs(pos.y);
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
