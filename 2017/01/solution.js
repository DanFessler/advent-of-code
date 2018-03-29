input = document.body.textContent.trim();

// Part 1
function Part1 (input) {
  let matchingDigits = [];
  for (let i=0; i<input.length; i++) {
    let currentValue = input[i];
    let nextValue = i===input.length-1? input[0] : input[i+1];
    if (currentValue === nextValue) {
      matchingDigits.push(currentValue)
    }
  }
  return matchingDigits.reduce((acc, currentVal) => parseInt(acc, 10) + parseInt(currentVal, 10));
}

// Part 2
function Part2 (input) {
  let matchingDigits = [];
  for (let i=0; i<input.length; i++) {
    let currentValue = input[i];
    let nextValue = input[(i + (input.length/2)) % input.length];
    if (currentValue === nextValue) {
      matchingDigits.push(currentValue)
    }
  }
  return matchingDigits.reduce((acc, currentVal) => parseInt(acc, 10) + parseInt(currentVal, 10));
}

console.log("DAY 01-1: "+Part1(input));
console.log("DAY 01-2: "+Part2(input));
