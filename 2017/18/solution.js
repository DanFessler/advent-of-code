input = document.body.textContent.trim();

function ParseInput(input) {
  return input.split(/\n/).map(function(line) {
    return line.split(' ')
  })
}

function ConstructRegisters(input) {
  var registers = {};
  input.forEach(function(reg, i) {
    if (isNaN(reg[1])) registers[reg[1]] = 0;
  })
  return registers;
}

function GetValue(expression, registers) {
  return (expression && isNaN(expression)) ? GetValue(registers[expression], registers) : parseInt(expression)
}

function Run(script, params) {
  var jump = 1

  var instruction = script[params.pointer][0]
  var i = script[params.pointer][1]
  var X = GetValue(script[params.pointer][1], params.registers)
  var Y = GetValue(script[params.pointer][2], params.registers)

  switch(instruction) {
    case "set": params.registers[i]  = Y; break;
    case "add": params.registers[i] += Y; break;
    case "mul": params.registers[i] *= Y; break;
    case "mod": params.registers[i] %= Y; break;
    case "jgz": jump = (X>0) ? Y : 1; break;
    case "snd":
      params.lastSound = X;
      if (params.output) {
        params.output.push(X)
        params.sendCount++
      }
      break;
    case "rcv":
      if (params.input) {
        if (params.input.length) params.registers[i] = params.input.shift();
        else jump = 0
      }
      else if (X!=0) jump = script.length;
      break;
  }

  return params.pointer+jump
}

// Part 1
function Part1 (input) {
  input = ParseInput(input)
  var params = { pointer: 0, registers: this.ConstructRegisters(input) }
  while (params.pointer <= input.length) {
    params.pointer = Run(input, params)
  }
  return params.lastSound
}

// Part 2
function Part2 (input) {
  input = ParseInput(input)
  var params = [
    { registers: ConstructRegisters(input), pointer: 0, input: [], sendCount: 0 },
    { registers: ConstructRegisters(input), pointer: 0, input: [], sendCount: 0 }
    ]

  params[0].output = params[1].input;
  params[1].output = params[0].input;
  params[0].registers.p = 0;
  params[1].registers.p = 1;

  var lastpos = [0,0]
  while ((params[0].pointer <= input.length || params[1].pointer <= input.length)) {
    if (params[0].pointer <= input.length) params[0].pointer = Run(input, params[0])
    if (params[1].pointer <= input.length) params[1].pointer = Run(input, params[1])
    if (params[0].pointer == lastpos[0] && params[1].pointer == lastpos[1]) break
    lastpos = [params[0].pointer, params[1].pointer]
  }

  return params[1].sendCount
}

console.log("DAY 18-1: "+Part1(input));
console.log("DAY 18-2: "+Part2(input));
