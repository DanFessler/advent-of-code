const TYPES = {
  0: "SUM",
  1: "MUL",
  2: "MIN",
  3: "MAX",
  4: "VAL",
  5: "IGT",
  6: "ILT",
  7: "IEQ",
};

// parse the input
function Parse(input) {
  let bin = "";
  let c = 0;
  let bitCount = 0;

  function getBits(n = 1) {
    let str = "";
    for (let i = 0; i < n; i++) {
      if (!bin) bin = hexToBin(input.substr(c++, 1));
      str += bin[0];
      bin = bin.substring(1);
    }
    bitCount += n;
    return str;
  }

  function getDec(bits) {
    return parseInt(getBits(bits), 2);
  }

  function hexToBin(string) {
    return parseInt(string, 16).toString(2).padStart(4, "0");
  }

  function getPacket() {
    let version = getDec(3);
    let type = TYPES[getDec(3)];
    let value;

    // if type is literal value
    if (type == "VAL") {
      let groups = [];
      let read = true;
      while (read == true) {
        read = getBits();
        groups.push(getBits(4));
      }
      value = parseInt(groups.join(""), 2);
    }

    // otherwise parse as an operator
    else {
      value = [];
      switch (getBits()) {
        case "0":
          let length = getDec(15);
          let currentBit = bitCount;
          while (bitCount < currentBit + length) {
            value.push(getPacket());
          }
          break;
        case "1":
          let packetCount = getDec(11);
          for (let i = 0; i < packetCount; i++) {
            value.push(getPacket());
          }
          break;
      }
    }

    return { version, type, value };
  }

  return getPacket();
}

// Part 1
function Part1(input) {
  function countVersion(packets) {
    if (!packets.length) return 0;
    return packets.reduce(
      (acc, { version, value }) => acc + version + countVersion(value),
      0
    );
  }

  return countVersion([input]);
}

// Part 2
function Part2(input) {
  const ops = {
    VAL: (value) => value,
    IGT: ([a, b]) => run(a) > run(b),
    ILT: ([a, b]) => run(a) < run(b),
    IEQ: ([a, b]) => run(a) == run(b),
    MIN: (inputs) => Math.min(...inputs.map((exp) => run(exp))),
    MAX: (inputs) => Math.max(...inputs.map((exp) => run(exp))),
    SUM: (inputs) => inputs.reduce((acc, exp) => acc + run(exp), 0),
    MUL: (inputs) => inputs.reduce((acc, exp) => acc * run(exp), 1),
  };

  const run = (expression) => ops[expression.type](expression.value);

  return run(input);
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
