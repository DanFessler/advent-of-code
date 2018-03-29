input = document.body.textContent.trim();

// Part 1 and 2
function Solve(input) {
  var score = 0
  var nest = 0
  var garbage = false
  var garbageCharacters = 0
  for (var i=0; i<input.length; i++) {
    if (input[i] == "!") {
      i++
      continue
    }
    if (!garbage) {
      if (input[i] == "{") {
        nest++
        score += nest
      }
      if (input[i] == "}") {
        nest--
      }
      if (input[i] == "<") {
        garbage = true
      }
    }
    else {
      if (input[i] == ">") {
        garbage = false
        continue
      }
      garbageCharacters++
    }
  }
  return {score: score, garbage: garbageCharacters}
}

var Answer = Solve(input);
console.log("DAY 09-1: "+Answer.score);
console.log("DAY 09-2: "+Answer.garbage);
