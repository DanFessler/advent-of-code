// parse the input
function Parse(input) {
  let [match, x1, x2, y1, y2] = input.match(
    /[a-z]=(-?\d*)..(-?\d*), [a-z]=(-?\d*)..(-?\d*)/
  );
  // return target rect
  return [x1 * 1, y1 * 1, x2 - x1, y2 - y1];
}

// Part 1
function Part1(targetRect) {
  let [vx, vy] = [0, 0];

  // find start vx assuming vy=0
  for (; vx < targetRect[0]; vx++) {
    if (shoot(vx, vy, targetRect) !== false) break;
  }

  // find highest height by ramping up vy while ramping down vx
  maxHeight = 0;
  for (let x = vx; x > 0; x--) {
    for (let y = 0; y < 100; y++) {
      maxHeight = Math.max(maxHeight, shoot(x, y, targetRect));
    }
  }

  return maxHeight;
}

// Part 2
function Part2(targetRect) {
  let [vx, vy] = [0, 0];

  // find start vx assuming vy=0
  for (; vx < targetRect[0]; vx++) {
    if (shoot(vx, vy, targetRect) !== false) break;
  }

  // find highest vy by ramping up vy while ramping down vx
  for (let x = vx; x > 0; x--) {
    for (let y = 0; y < 100; y++) {
      if (shoot(x, y, targetRect) !== false) {
        vy = Math.max(y, vy);
      }
    }
  }

  // count successful initial velocities starting from highest
  // and slowly ramping down vy while ramping up vx.
  // I'm not being smart here, and just gessing max iterations.
  let count = 0;
  for (let x = 0; x < 1000; x++) {
    for (let y = vy; y > -1000; y--) {
      if (shoot(x, y, targetRect) !== false) count++;
    }
  }

  return count;
}

// Simulate shot
function shoot(vx, vy, [tx, ty, tw, th]) {
  let [x, y] = [0, 0];

  let maxY = 0;
  while (x <= tx + tw && y >= ty) {
    x += vx;
    y += vy;
    if (y > maxY) maxY = y;
    if (vx) vx += vx > 0 ? -1 : 1;
    vy -= 1;

    // if we've hit the target return the max height reached
    if (x >= tx && x <= tx + tw && y >= ty && y <= ty + th) {
      return maxY;
    }
  }

  // otherwise return false
  return false;
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
