input = document.body.textContent.trim();

function ParseInput(input) {
  return input.split(/\n/).map(function(particle){
    return particle.split(', ').map(function(vector){
      return vector.substr(3,vector.length-4).split(',').map(function(value){
        return parseInt(value)
      })
    })
  })
}

function Part1(input) {
  input = ParseInput(input)

  // Simply find the lowest acceleration (breaks if there are multiple lowest)
  var smallest = 0
  input.forEach(function(particle,i){
    var thisAcc     = Math.abs(particle[2][0])        + Math.abs(particle[2][1])        + Math.abs(particle[2][2])
    var smallestAcc = Math.abs(input[smallest][2][0]) + Math.abs(input[smallest][2][1]) + Math.abs(input[smallest][2][2])
    if (thisAcc < smallestAcc) smallest = i
  })

  return smallest
}

function Part2(input) {
  input = ParseInput(input)

  for (var run=0; run<50; run++) {
    // Update particles
    var positions = {}
    input.forEach(function(particle, i){
      // increase velocity				// increase position
      particle[1][0] += particle[2][0];	particle[0][0] += particle[1][0]
      particle[1][1] += particle[2][1];	particle[0][1] += particle[1][1]
      particle[1][2] += particle[2][2];	particle[0][2] += particle[1][2]

      // record position
      var key = particle[0].join()
      if (positions[key] !== undefined) positions[key].push(i)
      else positions[key] = [i]
    })

    // list of indices to delete
    var deleteList = []
    for (pos in positions) {
      if (positions[pos].length > 1) {
        for (var i=0; i<positions[pos].length; i++) {
          deleteList.push(positions[pos][i])
        }
      }
    }

    // remove indices from particles input array
    deleteList.sort((a,b)=>(a-b)).reverse()
    for (var i=0; i<deleteList.length; i++) {
      input.splice(deleteList[i], 1)
    }
  }

  return input.length
}

console.log("DAY 20-1: "+Part1(input));
console.log("DAY 20-2: "+Part2(input));
