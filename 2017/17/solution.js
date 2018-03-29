input = parseInt(document.body.textContent.trim());

// Part 1
function Part1 (input) {
  var buffer = [0]
  var position = 0
  var value = 0
  for (var i=0; i<2017; i++) {
    position = (position + input) % buffer.length
    position ++
    value ++
    buffer.splice(position, 0, value)
  }
  position++
  return buffer[position % buffer.length]
}

// Part 2
function Part2 (input) {
  var buffer = 1
  var position = 0
  var value = 0
  var secondIndexValue
  for (var i=0; i<50000000; i++) {
    position = (position + input) % buffer
    position ++
    value ++
    buffer ++
    if (position == 1) {secondIndexValue = value}
  }
  return secondIndexValue
}

console.log("DAY 17-1: "+Part1(input));
console.log("DAY 17-2: "+Part2(input));
