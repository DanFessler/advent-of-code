// Parse Input into array of numbers
input = document.body.textContent.trim().split(/\n/).map((e)=>parseInt(e));

// Part 1
function Part1 (input) {
  var i = 0;
  var steps = 0;
  while ((i < input.length) && (i > -1)) {
    var next = input[i];
    input[i]++;
    i += next;
    steps++;
  }
  return steps;
}

// Part 2
function Part2 (input) {
  var i = 0;
  var steps = 0;
  while ((i < input.length) && (i > -1)) {
    var next = input[i];
    input[i] = input[i] + (next>2? -1 : 1);
    i += next;
    steps++;
  }
  return steps;
}

console.log("DAY 05-1: "+Part1(input.slice()));
console.log("DAY 05-2: "+Part2(input.slice()));
