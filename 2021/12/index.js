const { performance } = require("perf_hooks");

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
  let results;
  let t = performance.now();
  results = traverse(nodes);
  t = performance.now() - t;
  console.log(t);
  return results.length;
}

// Part 2
function Part2(nodes) {
  let results;
  let t = performance.now();
  results = traverse(nodes, "mj");
  t = performance.now() - t;
  console.log(t);
  return results.length;

  // let results = [];
  // // let { start, end, ...rest } = nodes;
  // let keys = Object.keys(nodes).filter((node) => {
  //   return node.toLowerCase() === node && node !== "start" && node !== "end";
  // });
  // for (key of keys) {
  //   let newResults = traverse(nodes, key);
  //   // push new results to the list only if they're unique
  //   newResults.forEach((newResult) => {
  //     if (!results.find((result) => result.join(",") === newResult.join(","))) {
  //       results.push(newResult);
  //     }
  //   });
  // }
  // return results.length;
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
