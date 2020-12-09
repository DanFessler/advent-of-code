// parse the input
function Parse(input) {
  return input.split("\n").map(rule => {
    rule = rule.split(".")[0];
    let [color, contents] = rule.split(" contain ");

    return {
      color: color.split(" bags")[0],
      contents:
        contents === "no other bags"
          ? []
          : contents.split(", ").map(item => {
              let [quantity, ...color] = item.split(" bag")[0].split(" ");
              return {
                color: color.join(" "),
                quantity: parseInt(quantity, 10)
              };
            })
    };
  });
}

// how many rules can contain shiny gold
function Part1(input) {
  return (
    input.reduce((acc, container) => {
      let count = countBags(input, container, "shiny gold");
      return acc + (count > 0);
    }, 0) - 1
  );

  function countBags(input, container, searchColor) {
    return (
      container.color === searchColor ||
      container.contents.filter(innerBag =>
        countBags(input, find(input, innerBag.color), searchColor)
      ).length
    );
  }
}

// How many bags are nested in shiny gold bags
function Part2(input) {
  return countContents(input, find(input, "shiny gold"));

  function countContents(input, container) {
    return container.contents.reduce((acc, bag) => {
      let count = countContents(input, find(input, bag.color)) * bag.quantity;
      return acc + bag.quantity + count;
    }, 0);
  }
}

function find(input, bagColor) {
  return input.find(bagObj => bagObj.color === bagColor);
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
