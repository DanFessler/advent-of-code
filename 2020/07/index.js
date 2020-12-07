// parse the input
function Parse(input) {
  return input.split("\n").map(rule => {
    rule = rule.slice(0, -1);
    let [container, contents] = rule.split(" contain ");
    container = container.slice(0, -4).trim();

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

    return { color: container, contents };
  });
}

// how many rules can contain shiny gold
function Part1(input) {
  // return input;
  return input
    .map(
      container =>
        container.contents
          .map(item => findGold(input, item.color))
          .reduce((acc, val) => acc + val, 0) > 0
    )
    .reduce((acc, val) => acc + val);
}

function findGold(input, bagColor) {
  bagObj = find(input, bagColor);
  if (
    bagColor === "shiny gold" ||
    (bagObj &&
      bagObj.contents.filter(innerBag => findGold(input, innerBag.color))
        .length)
  ) {
    return true;
  }
  return false;
}

function find(input, bagColor) {
  try {
    return input.find(bagObj => bagObj.color === bagColor);
  } catch {
    console.log("ERR");
  }
}

// Part 2
function Part2(input) {
  console.log(input);
  return countContents(input, find(input, "shiny gold"));
}

function countContents(input, bagObj) {
  console.log(bagObj);

  // bagObj.forEach(bag=>countContents(input))

  // console.log(!bagObj.contents.length);
  if (bagObj.contents.length === 0) {
    console.log("AHHHH", bagObj);
    return 1;
  }

  return bagObj.contents
    .map(inner => {
      console.log("POOP", inner, find(input, inner.color));
      let innerObj = find(input, inner.color);
      return innerObj ? countContents(input, innerObj) * inner.quantity : 1;
    })
    .reduce((acc, val) => acc + val, 0);
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
