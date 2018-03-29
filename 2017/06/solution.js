// Parse Input into array of numbers
input = document.body.textContent.trim().split(/\s+/).map((e)=>parseInt(e));

// Part 1
function Part1 (input, returnLoopSize) {
  var history = [input.slice()];

  function isUnique() {
    for (var i=0; i<history.length-1; i++) {
      if (history[history.length-1].join('') == history[i].join('')) {
        return history.length-i-1
      }
    }
    return true
  }

  function getLargestIndex() {
    var largestIndex = 15;
    var largestValue = 0;
    for (var i=0; i<16; i++) {
      if (input[i] > largestValue) {
        largestValue = input[i]
        largestIndex = i
      };
    }
    return largestIndex
  }

  var cycles = 0
  while (isUnique() == true) {
    var i = getLargestIndex();
    var blocks = input[i];
    input[i] = 0;
    while (blocks > 0) {
      i++
      input[i%16]++
      blocks--
    }
    history.push(input.slice())
    cycles++
  }

  return returnLoopSize? isUnique() : cycles;
}

// Part 2
function Part2 (input) {
  return Part1(input, true);
}

console.log("DAY 06-1: "+Part1(input));
console.log("DAY 06-2: "+Part2(input));
