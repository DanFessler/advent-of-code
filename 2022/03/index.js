// parse the input
function Parse(input) {
  return input.split(/\n/).map((pack) => {
    const half = pack.length / 2;
    return [pack.substring(0, half), pack.substring(half)];
  });
}

function Part1(input) {
  let missplacedItems = input.map(([a, b]) => {
    for (let i = 0; i < a.length; i++) {
      const type = a[i];
      if (b.includes(type)) return type;
    }
  });

  return calcPriorities(missplacedItems);
}

function Part2(input) {
  // group into threes and join pockets
  const grouped = input.reduce((acc, curr) => {
    const group = acc.length && acc[acc.length - 1];
    if (group.length < 3) {
      group.push(curr.join(""));
    } else {
      acc.push([curr.join("")]);
    }
    return acc;
  }, []);

  // find only item that all three in set hold
  let badge = grouped.map(([a, b, c]) => {
    for (let i = 0; i < a.length; i++) {
      const type = a[i];
      if (b.includes(type) && c.includes(type)) return type;
    }
  });

  // calculate priorities
  return calcPriorities(badge);
}

function calcPriorities(types) {
  const priorities = types.map((type) => {
    if (type == type.toUpperCase()) {
      return type.charCodeAt(0) - 38;
    } else {
      return type.charCodeAt(0) - 96;
    }
  });
  return priorities.reduce((acc, curr) => acc + curr);
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
