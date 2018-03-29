input = document.body.textContent;

letters = ''

directions = [
  { x: 0, y:-1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x:-1, y: 0 },
]

function GetDirection(map, pos) {
  if (isPath(directions[pos.direction])) return pos.direction

  for (var i=0; i<3; i+=2) {
    var dirIndex = (((i + pos.direction - 1) % 4) + 4) % 4;
    if (isPath(directions[dirIndex])) return dirIndex
  }

  function isPath(direction) {
    return map[pos.y + direction.y][pos.x + direction.x] !== " "
  }

  return null
}

function MovePos(map, pos) {
  pos.x += directions[pos.direction].x
  pos.y += directions[pos.direction].y
  pos.direction = GetDirection(map, pos)

  var letter = map[pos.y][pos.x].match(/^[A-Z]/)
  if (letter) letters += letter
}

// Part 1
function Solve(input) {
  input = input.split(/\n/).map(function(row){return row.split('')})

  var pos = {
    x: input[0].findIndex(function(element){return element == "|"}), y: 0,
    direction: 2,
  }

  var steps = 0
  while (pos.direction != null) {
    MovePos(input, pos)
    steps++
  }
  return {letters: letters, steps: steps+1}
}

var answer = Solve(input);
console.log("DAY 19-1: "+answer.letters);
console.log("DAY 19-2: "+answer.steps);
