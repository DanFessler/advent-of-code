// Day 2

// Parse Input into 2D array of numbers
input = document.body.textContent.trim().split(/\n/).map((i)=>i.split(/\s+/).map((i)=>parseInt(i)));

// Part 1
function Part1 (input) {
  function FindRange(row) {
    var smallest;
    var largest;
    for (var i=0; i<row.length; i++) {
      if (smallest == undefined || row[i] < smallest) smallest = row[i];
      if (largest == undefined || row[i] > largest) largest = row[i];
    }
    return largest - smallest;
  }

  function AddRows(rows) {
    var sum = 0;
    for (var i=0; i<rows.length; i++) {
      sum += FindRange(rows[i]);
    }
    return sum;
  }

  return AddRows(input);
}

// Part 2
function Part2 (input) {
  function FindRange(row) {
    for (var i=0; i<row.length; i++) {
      for (var test=0; test<row.length; test++) {
        if (row[test] % row[i] === 0 && test !== i) {
          return row[test] / row[i]
        }
      }
    }
  }

  function AddRows(rows) {
    var sum = 0;
    for (var i=0; i<rows.length; i++) {
      sum += FindRange(rows[i]);
    }
    return sum;
  }

  return AddRows(input);
}

// Log solutions to the console
console.log(Part1(input));
console.log(Part2(input));
