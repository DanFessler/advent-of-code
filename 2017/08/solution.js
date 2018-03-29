input = document.body.textContent.trim();

function ParseInput(input) {
  return input.split(/\n/).map(function(line) {
    return {
      test: line.split(' if ')[1].split(' '),
      inst: line.split(' if ')[0].split(' ')
    };
  })
}

function ConstructRegisters(input) {
  var registerArr = new Set(input.map(function(line) {
    return line.test[0];
  }))
  var registers = {};
  registerArr.forEach(function(reg, i) {
    registers[reg] = 0;
  })
  return registers;
}

function test(expression, registers) {
  switch(expression[1]) {
    case "==": return registers[expression[0]] == parseInt(expression[2]);
    case "!=": return registers[expression[0]] != parseInt(expression[2]);
    case  ">": return registers[expression[0]]  > parseInt(expression[2]);
    case  "<": return registers[expression[0]]  < parseInt(expression[2]);
    case ">=": return registers[expression[0]] >= parseInt(expression[2]);
    case "<=": return registers[expression[0]] <= parseInt(expression[2]);
    default: return false;
  }
}

function execute(instruction, registers) {
  switch(instruction[1]) {
    case "inc": registers[instruction[0]] += parseInt(instruction[2]); return registers[instruction[0]];
    case "dec": registers[instruction[0]] -= parseInt(instruction[2]); return registers[instruction[0]];
  }
}

// Part 1 and 2
function Solve (input) {
  input = ParseInput(input);
  var registers = ConstructRegisters(input);
  var highestRecordedValue = 0;
  input.forEach(function(line, i) {
    if (this.test(line.test, registers)) var result = execute(line.inst, registers);
    if (result > highestRecordedValue) highestRecordedValue = result;
  }, this)
  let regArr = Object.values(registers);
  let maxVal = Math.max(...regArr);
  return [maxVal, highestRecordedValue];
}

var Answer = Solve(input);
console.log("DAY 08-1: "+Answer[0]);
console.log("DAY 08-2: "+Answer[1]);
