// Day 3

// Parse Input
input = document.body.textContent.trim();

// Part 1
function Part1 (input) {
  function getVector(direction) {
    var dir = (direction - 1) % 4 + 1;
    if (dir === 1) return [1, 0];
    if (dir === 2) return [0, 1];
    if (dir === 3) return [-1,0];
    if (dir === 4) return [0,-1];
  }

  var delta = [0,0];
  var direction = 1;
  var length = 1;
  var count = 0;

  for (var i=0; i<input; i++) {
    var vector = getVector(direction);
    delta[0] += vector[0];
    delta[1] += vector[1];
    count++;
    if (count == length) {
      direction++;
    }
    if (count == length * 2) {
      direction++;
      length++;
      count = 0;
    }
  }

  return Math.abs(delta[0]) + Math.abs(delta[1]) - 1;
}

// Part 2
function Part2 (input) {

  // Built data map
  var mapsize = 529;
  var datamap = [];
  for (var y=0; y<mapsize; y++) {
    datamap[y] = [];
    for (var x=0; x<mapsize; x++) {
      datamap[y][x] = 0;
    }
  }
  // fill in first cell
  datamap[Math.floor(mapsize/2)][Math.floor(mapsize/2)] = 1;

  // Rotate direction
  function rotate(directionVector) {
    var x = Math.round(directionVector[0]*Math.cos(Math.PI/2) - directionVector[1]*Math.sin(Math.PI/2));
    var y = Math.round(directionVector[1]*Math.cos(Math.PI/2) + directionVector[0]*Math.sin(Math.PI/2));
    directionVector = [x,y];
    return(directionVector);
  }

  function addAdjacent(x0, y0) {
    var x1 = x0+Math.floor(mapsize/2);
    var y1 = y0+Math.floor(mapsize/2);
    var sum = 0;
    for (  var y=y1-1; y<=y1+1; y++) {
      for (var x=x1-1; x<=x1+1; x++) {
        sum += datamap[y][x];
      }
    }
    datamap[y1][x1] = sum;
    return sum
  }

  var delta = [0,0];
  var direction = 1;
  var directionVector = [1,0];
  var length = 1;
  var count = 0;
  var lastValue;

  for (var i=0; i<input; i++) {
    delta[0] += directionVector[0];
    delta[1] += directionVector[1];
    lastValue = addAdjacent(delta[0], delta[1]);
    if (lastValue > input) return lastValue;

    count++;
    if (count == length) {
      direction++;
      directionVector = rotate(directionVector);
    }
    if (count == length * 2) {
      direction++;
      directionVector = rotate(directionVector);
      length++;
      count = 0;
    }
  }
}

// Log solutions to the console
console.log(Part1(input));
console.log(Part2(input));
