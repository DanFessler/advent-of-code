// Day 4

// Parse Input into array of passphrases
input = document.body.textContent.trim().split(/\n/);

// Part 1
function Part1 (input) {
  function hasDuplicates(passphrase) {
    var words = passphrase.split(" ")
    for (var wordA=0; wordA<words.length; wordA++) {
      for (var wordB=0; wordB<words.length; wordB++) {
        if (wordA !== wordB && words[wordA] == words[wordB]) return true
      }
    }
    return false
  }

  var countValid = 0
  for (var i=0; i<input.length; i++) {
    countValid += hasDuplicates(input[i])? 0 : 1;
  }

  return countValid
}

// Part 2
function Part2 (input) {
  function hasDuplicates(passphrase) {
    var words = passphrase.split(" ")
    for (var wordA=0; wordA<words.length; wordA++) {
      for (var wordB=0; wordB<words.length; wordB++) {
        if (wordA !== wordB) {
          var A = words[wordA].split('').sort().join('');
          var B = words[wordB].split('').sort().join('');
          if (A == B) return true
        }
      }
    }
    return false
  }

  var countValid = 0
  for (var i=0; i<input.length; i++) {
    countValid += hasDuplicates(input[i])? 0 : 1;
  }

  return countValid
}

// Log solutions to the console
console.log(Part1(input));
console.log(Part2(input));
