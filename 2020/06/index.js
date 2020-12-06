// parse the input
function Parse(input) {
  return input.split("\n\n").map(group => group.split("\n"));
}

// Part 1
function Part1(input) {
  return input
    .map(group => new Set(group.join("").split("")).size)
    .reduce((acc, val) => acc + val);
}

// Part 2
function Part2(input) {
  let uniques = input.map(group => new Set(group.join("").split("")));

  return (
    uniques
      .map((group, i) => {
        return (
          [...group]
            .map(letter => {
              // for each unique letter in a group, check if every person agreed
              return (
                input[i]
                  // true or false if they agreed
                  .map(person => person.includes(letter))
                  // count the true, and see if it equals the size of the group
                  .reduce((acc, val) => acc + val, 0) === input[i].length
              );
            })
            // add up the unanimous questions for the group
            .reduce((acc, val) => acc + val)
        );
      })
      // add up the unanimous questions for the entire list
      .reduce((acc, val) => acc + val)
  );
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
