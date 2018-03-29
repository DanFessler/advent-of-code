inputArr = document.body.textContent.trim().split(/\n/).map((e)=>(e.split(' ').slice(-1)[0]));
input = {a:inputArr[0], b:inputArr[1]};

// Part 1
function Part1 (input) {
  if (window.confirm("This solution may take a while to process. Are you sure you want to continue?") == true) {
    var previousValue = input
    var count = 0
    for (var x=0; x<100; x++) {
      for (var i=0; i<400000; i++) {
        previousValue = {
          a: (previousValue.a * 16807) % 2147483647,
          b: (previousValue.b * 48271) % 2147483647
        }
        var binaryValue = {
          a: parseInt(previousValue.a, 10).toString(2).substr(-16),
          b: parseInt(previousValue.b, 10).toString(2).substr(-16),
        }
        if (binaryValue.a == binaryValue.b) count++
      }
      //console.log( "Found: "+count+", ("+(x+1)+"/"+100+")" )
    }
    return count
  }
}

// Part 2
function Part2 (input) {
  var previousValue = input
  var historyA = []
  var historyB = []
  var lastPair = -1
  var count = 0
  var consideredCount = 0;

  while (consideredCount < 5000000) {
    previousValue = {
      a: (previousValue.a * 16807) % 2147483647,
      b: (previousValue.b * 48271) % 2147483647
    }

    if (previousValue.a % 4 == 0) historyA.push(previousValue.a)
    if (previousValue.b % 8 == 0) historyB.push(previousValue.b)

    if (historyA.length && historyB.length) {
      var minPairIndex = Math.min(historyA.length-1, historyB.length-1)
      if (minPairIndex > lastPair) {
        var binaryValue = {
          a: parseInt(historyA[minPairIndex], 10).toString(2).substr(-16),
          b: parseInt(historyB[minPairIndex], 10).toString(2).substr(-16),
        }
        if (binaryValue.a == binaryValue.b) count++

        consideredCount++
        lastPair = minPairIndex

        //if (consideredCount % 100 == 0) console.log(consideredCount+"/5000000")
      }
    }
  }

  return count
}

console.log("DAY 15-1: "+Part1(input));
console.log("DAY 15-2: "+Part2(input));
