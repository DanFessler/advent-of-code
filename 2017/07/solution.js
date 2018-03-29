input = document.body.textContent.trim();

function ParseInput(input) {
  return input.split(/\n/).map(function(line){
    var node = line.split(" -> ")[0];
    var children = line.split(" -> ")[1];
    var split = node.split(" ");
    var name = split[0];
    var weight = split[1].substring(1,split[1].length-1);
    return {
      name: name,
      weight: parseInt(weight),
      children: children ? children.split(", ") : null
    }
  });
}

function BuildStruct(input) {
  for (var i=0; i<input.length; i++) {
    if (input[i].children !== null) {
      for (var child=0; child<input[i].children.length; child++) {
        input[i].children[child] = FindNode(input, input[i].children[child]);
        input[i].children[child].parent = input[i]
      }
    }
  }
  var root = FindRoot(input[0]);
  CalcTotalWeight(root);
  return root;
}

function FindNode(input, name) {
  for (var i=0; i<input.length; i++) {
    if (input[i].name == name) {
      return input[i];
    }
  }
}

function CalcTotalWeight(node) {
  var weight = node.weight;
  if (node.children) {
    for (var i=0; i<node.children.length; i++) {
      weight += CalcTotalWeight(node.children[i]);
    }
  }
  node.cumulativeWeight = weight;
  return weight;
}

function FindRoot(node) {
  return node.parent? FindRoot(node.parent) : node;
}

function FindImbalance(node, delta) {
  if (node.children && node.children.length > 2) {
    for (var i=0; i<node.children.length; i++) {
      var child = [
        node.children[(i+0)%node.children.length],
        node.children[(i+1)%node.children.length],
        node.children[(i+2)%node.children.length]
      ]
      if (child[0].cumulativeWeight !== child[1].cumulativeWeight && child[0].cumulativeWeight !== child[2].cumulativeWeight) {
        return FindImbalance(child[0], child[1].cumulativeWeight - child[0].cumulativeWeight);
      }
    }
  }
  return {node: node, correctedWeight: node.weight + delta};
}

// Part 1
function Part1 (input) {
  return BuildStruct(ParseInput(input)).name;
}

// Part 2
function Part2 (input) {
  var root = BuildStruct(ParseInput(input));
  return FindImbalance(root, 0).correctedWeight;
}

console.log("DAY 07-1: "+Part1(input));
console.log("DAY 07-2: "+Part2(input));
