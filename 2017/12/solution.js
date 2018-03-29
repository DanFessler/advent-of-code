input = document.body.textContent.trim();

function ParseInput(input) {
  return input.split(/\n/).map(function(line){
    var name = line.split(" <-> ")[0];
    var children = line.split(" <-> ")[1];
    return {
      name: name,
      children: children ? children.split(", ") : null
    }
  }, this);
}

function BuildStruct(input) {
  for (var i=0; i<input.length; i++) {
    if (input[i].children !== null) {
      for (var child=0; child<input[i].children.length; child++) {
        input[i].children[child] = FindNode(input, input[i].children[child]);
      }
    }
  }
  return input;
}

function FindNode(input, name) {
  for (var i=0; i<input.length; i++) {
    if (input[i].name == name) {
      return input[i];
    }
  }
}

function Count(node, history) {
  if (!history) history = []
  if (history.find(function(name){return name == node}, this) == undefined) {
    history.push(node);
    var count = 1;
    if (node.children) {
      for (var i=0; i<node.children.length; i++) {
        var childCount = Count(node.children[i], history);
        count += childCount.total;
      }
    }
    return {total: count, history: history};
  }
  else {
    return {total: 0, history: history};
  }
}

// Part 1
function Part1 (input) {
  input = this.ParseInput(this.input)
  BuildStruct(input)
  return Count(input[0]).total
}

// Part 2
function Part2 (input) {
  input = this.ParseInput(this.input)
  BuildStruct(input)
  var groups = 0
  var history = []
  for (var i=0; i<input.length; i++) {
    if (history.find(function(node){return node == input[i]}, this) == undefined) {
      history = history.concat(Count(input[i]).history)
      groups++
    }
  }
  return groups
}

console.log("DAY 12-1: "+Part1(input));
console.log("DAY 12-2: "+Part2(input));
