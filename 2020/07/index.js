// parse the input
function Parse(input) {
  return input.split("\n").map(rule => {
    rule = rule.split(".")[0];
    let [color, contents] = rule.split(" contain ");
    color = color.split("bag")[0].trim();

    if (contents !== "no other bags") {
      contents = contents.split(", ").map(item => {
        let [quantity, ...color] = item
          .split("bag")[0]
          .trim()
          .split(" ");

        return {
          color: color.join(" "),
          quantity: parseInt(quantity, 10)
        };
      });
    } else contents = [];

    return { color, contents };
  });
}

// how many rules can contain shiny gold
function Part1(input) {
  return input
    .map(container => {
      return (
        container.contents
          .map(item => findGold(input, item.color))
          .reduce((acc, val) => acc + val, 0) > 0
      );
    })
    .reduce((acc, val) => acc + val);

  function findGold(input, bagColor) {
    if (
      bagColor === "shiny gold" ||
      find(input, bagColor).contents.filter(innerBag =>
        findGold(input, innerBag.color)
      ).length
    ) {
      return true;
    }
    return false;
  }
}

// How many bags are nested in shiny gold bags
function Part2(input) {
  return countContents(input, find(input, "shiny gold"));

  function countContents(input, bagObj) {
    if (!bagObj.contents) return 0;

    return bagObj.contents
      .map(inner => {
        return (
          inner.quantity +
          countContents(input, find(input, inner.color)) * inner.quantity
        );
      })
      .reduce((acc, val) => acc + val, 0);
  }
}

function find(input, bagColor) {
  try {
    return input.find(bagObj => bagObj.color === bagColor);
  } catch {
    console.log("ERR");
  }
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
