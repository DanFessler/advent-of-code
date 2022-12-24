// parse the input
function Parse(input) {
  return input.split(/\n/).map((line) => line.split(" "));
}

function Part1(input) {
  const root = buildTree(input);
  const [size, list] = calcDirSize(root);

  // sum the directories of size 100,000 or lower
  return list.reduce((acc, cur) => {
    if (cur <= 100_000) acc += cur;
    return acc;
  }, 0);
}

function Part2(input) {
  const root = buildTree(input);
  const [size, list] = calcDirSize(root);

  // return the smallest dir size that would leave at least 30,000,000 if deleted
  return list
    .sort((a, b) => a - b)
    .find((dir) => dir + (70_000_000 - size) >= 30_000_000);
}

function calcDirSize(dir, dirList = []) {
  let size = 0;

  // iterate directory's children to calc total size
  Object.keys(dir.children).forEach((key) => {
    let node = dir.children[key];
    if (node.type === "file") {
      size += parseInt(node.size, 10);
    } else {
      let [nodeSize] = calcDirSize(node, dirList);
      size += nodeSize;
    }
  });

  // push calculated directory size to an array for easier access later
  dirList.push(size);

  return [size, dirList];
}

function buildTree(input) {
  const root = createDir();
  let trace = [root];

  for (line of input) {
    const dir = trace[trace.length - 1];

    if (line[0] == "$") {
      processCmd();
    } else {
      processFile();
    }

    function processCmd() {
      const [, cmd, param] = line;
      if (cmd == "cd") {
        switch (param) {
          case "/":
            trace = [root];
            break;
          case "..":
            trace.pop();
            break;
          default:
            trace.push(dir.children[param]);
        }
      }
    }

    function processFile() {
      const [size, name] = line;
      if (size === "dir") {
        dir.children[name] = createDir();
      } else {
        dir.children[name] = createFile(size);
      }
    }
  }

  return root;
}

const createDir = () => ({
  type: "dir",
  children: {},
});

const createFile = (size) => ({
  type: "file",
  size: size,
});

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
