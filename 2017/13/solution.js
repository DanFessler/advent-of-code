// Convert input into key-value pair Object
input = eval("({"+document.body.textContent.trim().replace(/\n/g, ", ")+"})")

function PingPong(i, range) {
  range--
  return Math.abs((i+range) % (range*2) - range)
}

// Part 1
function Part1 (input) {
  var severity = 0;
  for (var i=0; i<96; i++) {
    if (input[i] && PingPong(i, input[i]) == 0) {
      severity += i*input[i]
    }
  }
  return severity
}

// Part 2
function Part2 (input) {
  var caught
  var delay = 0;
  while (caught !== false) {
    var caught = false;
    for (var i=0; i<97; i++) {
      if (input[i] && PingPong(i+delay, input[i]) == 0) {
        caught = true
        break
      }
    }
    delay++
  }
  return delay-1
}

console.log("DAY 13-1: "+Part1(input));
console.log("DAY 13-2: "+Part2(input));
