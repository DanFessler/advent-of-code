input = document.body.textContent.trim();

function ParseInput(input) {
  return input.split(/\n/).map(
    rule => {
      var thisrule = rule.split(" => ").map(
        row => row.split("/").map(
          column => column.split('').map(
            pixel => pixel == "#"? 1 : 0
          )
        )
      )
      return {input: thisrule[0], output: thisrule[1]}
    }
  )
}

// Part 1
function Part1 (input) {

}

// Part 2
function Part2 (input) {

}

console.log("DAY 21-1: "+Part1(input));
console.log("DAY 21-2: "+Part2(input));
