const { performance } = require("perf_hooks");
const { isArray } = require("util");

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
  return traverse(nodes).length;
}

// Part 2
function Part2(nodes) {
  let results = [];

  let keys = Object.keys(nodes).filter((node) => {
    return node.toLowerCase() === node && node !== "start" && node !== "end";
  });

  // this code takes quite a while to execute.
  for (key of keys) {
    let newResults = traverse(nodes, key);

    // filter new results for unique paths
    let resultStrings = results.map((result) => result.join(","));
    let newResultStrings = newResults.map((result) => result.join(","));
    newResults = newResults.filter((result, i) => {
      return !resultStrings.find((string) => string === newResultStrings[i]);
    });

    results.push(...newResults);
  }

  return results.length;
}

function traverse(
  nodes,
  exception = null,
  from = "start",
  path = [from],
  paths = [],
  visited = {}
) {
  if (from === "end") return paths.push(path);
  if (from.toLowerCase() === from) visited[from] = visited[from] + 1 || 1;

  nodes[from].forEach((node) => {
    if (!visited[node] || visited[node] < (node === exception ? 2 : 1)) {
      traverse(nodes, exception, node, [...path, node], paths, { ...visited });
    }
  });

  return paths;
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
