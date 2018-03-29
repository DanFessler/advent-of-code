input = document.body.textContent.trim();

// Part 1 and 2
function Solve(input) {
  input = this.input.split(",");
  var x=0; var y=0;
  var furthest = 0;
  for (var i=0; i<input.length; i++) {
    switch (input[i]) {
      case "n": y += 2; break;
      case "s": y -= 2; break;
      case "ne": x += 2; y++; break;
      case "se": x += 2; y--; break;
      case "nw": x -= 2; y++; break;
      case "sw": x -= 2; y--; break;
    }
    if (stepDistance(x,y) > furthest) furthest = stepDistance(x,y)
  }

  return {distance: stepDistance(x, y), furthest: furthest}

  function stepDistance(x, y) {
    var xSteps = Math.abs(x/2);
    var ySteps = y>0 ? (y-xSteps)/2 : Math.abs((y+xSteps)/2)
    return xSteps + ySteps
  }
}

var answer = Solve(input);
console.log("DAY 11-1: "+answer.distance);
console.log("DAY 11-2: "+answer.furthest);
