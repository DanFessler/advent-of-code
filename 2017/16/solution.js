input = document.body.textContent.trim().split(',');

var dancers = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p'];

function FindDancer(dancer) {
  return dancers.findIndex(function(dancer){return dancer == this}, dancer)
}

function Spin(a) {
  return dancers = dancers.splice(-a).concat(dancers);
}

function Exchange(a, b) {
  dancers[a] = dancers.splice(b, 1, dancers[a])[0]
  return dancers
}

function Partner(a, b) {
  return Exchange(FindDancer(a), FindDancer(b))
}

// Part 1
function Part1 (input) {
  input.forEach(function(instruction){
    var move = instruction.substr(0,1)
    var params = instruction.substr(1).split('/')
    switch (move) {
      case 's': Spin(params[0]); break;
      case 'x': Exchange(params[0], params[1]); break;
      case 'p': Partner(params[0], params[1]); break;
    }
  }, this)
  return dancers
}

// Part 2
function Part2 (input) {
  for (var i=0; i<(1000000000%60-1); i++) {
    Part1(input)
  }
  return dancers
}

console.log("DAY 16-1: "+Part1(input));
console.log("DAY 16-2: "+Part2(input));
