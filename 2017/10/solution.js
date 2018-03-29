input = document.body.textContent.trim();

// Part 1
function Part1 (input) {
  input = input.split(',');
  var string = []
  var stringLength = 256;
  for (var i=0; i<stringLength; i++) { string.push(i) }

  var location = 0
  var skipSize = 0
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

  return string[0] * string[1]
}

// Part 2
function Part2 (input) {
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

console.log("DAY 10-1: "+Part1(input));
console.log("DAY 10-2: "+Part2(input));
