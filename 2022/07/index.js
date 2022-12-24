// parse the input
function Parse(input) {
  return input.split(/\n/).map((line) => line.split(" "));
}

function Part1(input) {
  const tree = buildTree(input);

  const dirList = [];
  calcDirSize(tree["/"], dirList);

  // sum the directories of size 100,000 or lower
  return dirList.reduce((acc, cur) => {
    if (cur <= 100000) acc += cur;
    return acc;
  }, 0);
}

function Part2(input) {
  const tree = buildTree(input);

  const dirList = [];
  const totalSize = calcDirSize(tree["/"], dirList);

  // return the smallest dir size that would leave at lest 30000000 if deleted
  return dirList
    .sort((a, b) => a - b)
    .find((dir) => dir >= 30000000 - (70000000 - totalSize));
}

function calcDirSize(dir, dirList) {
  let size = 0;

  // iterate directory's children to calc total size
  Object.keys(dir.children).forEach((key) => {
    let node = dir.children[key];
    if (node.type === "file") {
      size += parseInt(node.size, 10);
    } else {
      size += calcDirSize(node, dirList);
    }
  });

  // push calculated directory size to an array for easier access later
  dirList.push(size);

  return size;
}

function buildTree(input) {
  const tree = {
    "/": {
      type: "dir",
      children: {},
    },
  };

  const dir = [tree["/"]];

  for (let i = 1; i < input.length; i++) {
    let [token, cmd, param] = input[i];
    if (token == "$") {
      const currentDir = dir[dir.length - 1];
      switch (cmd) {
        case "ls":
          while (true) {
            let next = input[i + 1];
            if (!next || next[0] === "$") break;

            let [size, name] = next;
            if (size === "dir") {
              currentDir.children[name] = {
                type: "dir",
                children: {},
              };
            } else {
              currentDir.children[name] = {
                type: "file",
                size: size,
              };
            }

            i = i + 1;
          }
          break;
        case "cd":
          if (param === "..") dir.pop();
          else dir.push(currentDir.children[param]);
          break;
      }
    }
  }

  return tree;
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
