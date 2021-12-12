// parse the input
function Parse(input) {
  // return input.split(/\r?\n/).map((line) => line.split("-"));
  let lines = input.split(/\r?\n/).map((line) => line.split("-"));

  let nodes = {};
  for (edge of lines) {
    let [a, b] = edge;
    nodes[a] = [...(nodes[a] || []), b];
    nodes[b] = [...(nodes[b] || []), a];
  }

  return nodes;
}

// Part 1
function Part1(nodes) {
  let results = explore(nodes, "start");

  return results.length;

  function explore(nodes, from, path = [from], paths = [], visited = {}) {
    if (from === "end") return paths.push(path);

    if (from.toLowerCase() === from) {
      visited[from] = true;
    }

    nodes[from].forEach((node) => {
      if (!visited[node]) {
        explore({ ...nodes }, node, [...path, node], paths, { ...visited });
      }
    });

    return paths;
  }
}

// Part 2
function Part2(nodes) {
  let results = explore(nodes, "start");

  return results.length;

  function explore(
    nodes,
    from,
    path = [from],
    paths = [],
    visited = { start: true, end: true }
  ) {
    if (from === "end") return paths.push(path);

    if (from.toLowerCase() === from) {
      visited[from] = visited[from] + 1 || 1;
    }

    nodes[from].forEach((node) => {
      if (!visited[node] || visited[node] < 2) {
        explore({ ...nodes }, node, [...path, node], paths, { ...visited });
      }
    });

    return paths;
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
