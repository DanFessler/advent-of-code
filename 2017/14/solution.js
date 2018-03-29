input = document.body.textContent.trim();

// Day 10 Part 2
function Day10_Part2 (input) {
  input = input.split('');
  input = input.map(function(char){return char.charCodeAt()}).concat([17, 31, 73, 47, 23]);

  var string = []
  var stringLength = 256;
  for (var i=0; i<stringLength; i++) { string.push(i) }

  var location = 0
  var skipSize = 0
  for (var i=0; i<64; i++) {
    input.forEach(function(length, i) {
      length = parseInt(length)

      var substring = string.slice(location,location+length);
        substring = (location+length >= stringLength)? substring.concat(string.slice(0,(location+length)%stringLength)) : substring;

      substring.reverse().forEach(function(number,i) {
        string[(i+location)%stringLength] = substring[i];
      })

      location = (location + length + skipSize) % stringLength
      skipSize++
    })
  }

  var desnseHash = []
  for (var i=0; i<16; i++) {
    var block = 0
    for (var b=0; b<16; b++) {
      block ^= string[b+(i*16)]
    }
    desnseHash.push(block);
  }

  desnseHash = desnseHash.map(function(char) {
    var hex = char.toString(16);
    return hex.length<2 ? "0"+hex : hex;
  })

  return desnseHash.join('')
}

// Part 1
function Part1 (input) {
  var used = 0
  var disk = []
  for (var row=0; row<128; row++) {
    var hash = Day10_Part2(input+'-'+row)
    var rowString = ''
    for (var i=0; i<32; i++) {
      var string = parseInt(hash[i], 16).toString(2);
      string = '0'.repeat(4-string.length) + string;
      rowString += string;
    }
    used += rowString.match(/1/g).length;
    disk.push(rowString.split(''));
  }
  return {disk: disk, used: used}
}

// Part 2
function Part2 (input) {
  var disk = Part1(input).disk

  var regions = 1;
  for (var y=0; y<128; y++) {
    for (var x=0; x<128; x++) {
      disk[y][x] = parseInt(disk[y][x])
      if (disk[y][x] == 1) {
        regions = flood(x, y, regions+1)
      }
    }
  }

  function flood(x, y, value, sourceValue) {
    if (!sourceValue) var sourceValue = disk[y][x]
    disk[y][x] = value;
    if (disk[y][x-1] && disk[y][x-1] == sourceValue) flood(x-1, y, value, sourceValue)
    if (disk[y][x+1] && disk[y][x+1] == sourceValue) flood(x+1, y, value, sourceValue)
    if (disk[y-1]    && disk[y-1][x] == sourceValue) flood(x, y-1, value, sourceValue)
    if (disk[y+1]    && disk[y+1][x] == sourceValue) flood(x, y+1, value, sourceValue)
    return value
  }

  return regions-1
}

console.log("DAY 14-1: "+Part1(input).used);
console.log("DAY 14-2: "+Part2(input));
