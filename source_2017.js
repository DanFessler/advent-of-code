var adventOfCode = [

	{
		Puzzle: function() { window.open("http://adventofcode.com/2017/day/1") },
		input: data.Day1,

		Solve: function(input) { if (!input) input = this.input;

		},
	},

	{
		Puzzle: function() { window.open("http://adventofcode.com/2017/day/2") },
		input: data.Day2,

		Part1: function(input) { if (!input) input = this.input;

			function FindRange(row) {
				var smallest;
				var largest;
				for (var i=0; i<row.length; i++) {
					if (smallest == undefined || row[i] < smallest) smallest = row[i];
					if (largest == undefined || row[i] > largest) largest = row[i];
				}
				return largest - smallest;
			}

			function AddRows(rows) {
				var sum = 0;
				for (var i=0; i<rows.length; i++) {
					sum += FindRange(rows[i]);
				}
				return sum;
			}

			console.log(AddRows(input));
		},

		Part2: function(input) { if (!input) input = this.input;

			function FindRange(row) {
				for (var i=0; i<row.length; i++) {
					for (var test=0; test<row.length; test++) {
						if (row[test] % row[i] === 0 && test !== i) {
							return row[test] / row[i]
						}
					}
				}
			}

			function AddRows(rows) {
				var sum = 0;
				for (var i=0; i<rows.length; i++) {
					sum += FindRange(rows[i]);
				}
				return sum;
			}

			console.log(AddRows(input));
		},
	},

	{
		Puzzle: function() { window.open("http://adventofcode.com/2017/day/3") },
		input: data.Day3,

		Part1: function(input) { if (!input) input = this.input;
			function getVector(direction) {
				var dir = (direction - 1) % 4 + 1;
				if (dir === 1) return [1, 0];
				if (dir === 2) return [0, 1];
				if (dir === 3) return [-1,0];
				if (dir === 4) return [0,-1];
			}

			var delta = [0,0];
			var direction = 1;
			var length = 1;
			var count = 0;

			for (var i=0; i<input; i++) {

				var vector = getVector(direction);
				delta[0] += vector[0];
				delta[1] += vector[1];

				count++;
				if (count == length) {
					direction++;
				}
				if (count == length * 2) {
					direction++;
					length++;
					count = 0;
				}

			}

			console.log(delta)
			console.log(Math.abs(delta[0]) + Math.abs(delta[1]) - 1)
		},

		Part2: function(input) { if (!input) input = this.input;

			// Built data map
			var mapsize = 529;
			var datamap = [];
			for (var y=0; y<mapsize; y++) {
				datamap[y] = [];
				for (var x=0; x<mapsize; x++) {
					datamap[y][x] = 0;
				}
			}
			// fill in first cell
			datamap[Math.floor(mapsize/2)][Math.floor(mapsize/2)] = 1;

			// Rotate direction
			function rotate(directionVector) {
				var x = Math.round(directionVector[0]*Math.cos(Math.PI/2) - directionVector[1]*Math.sin(Math.PI/2));
				var y = Math.round(directionVector[1]*Math.cos(Math.PI/2) + directionVector[0]*Math.sin(Math.PI/2));
				directionVector = [x,y];
				return(directionVector);
			}

			function addAdjacent(x0, y0) {

				var x1 = x0+Math.floor(mapsize/2);
				var y1 = y0+Math.floor(mapsize/2);
				var sum = 0;

				for (  var y=y1-1; y<=y1+1; y++) {
					for (var x=x1-1; x<=x1+1; x++) {
						sum += datamap[y][x];
					}
				}

				datamap[y1][x1] = sum;
				return sum
			}

			var delta = [0,0];
			var direction = 1;
			var directionVector = [1,0];
			var length = 1;
			var count = 0;
			var lastValue;

			for (var i=0; i<input; i++) {
				delta[0] += directionVector[0];
				delta[1] += directionVector[1];
				lastValue = addAdjacent(delta[0], delta[1]);
				if (lastValue > input) return lastValue;

				count++;
				if (count == length) {
					direction++;
					directionVector = rotate(directionVector);
				}
				if (count == length * 2) {
					direction++;
					directionVector = rotate(directionVector);
					length++;
					count = 0;
				}
			}
		},
	},

	{
		Puzzle: function() { window.open("http://adventofcode.com/2017/day/4") },
		input: data.Day4,

		Part1: function(input) { if (!input) input = this.input;

			input = input.split(/\n/);

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
		},

		Part2: function(input) { if (!input) input = this.input;

			input = input.split(/\n/);

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
	},

	{
		Puzzle: function() { window.open("http://adventofcode.com/2017/day/5") },
		input: data.Day5,

		Part1: function(input) { if (!input) input = this.input;
			input = input.split(/\n/);

			var i = 0;
			var steps = 0;
			while ((i < input.length) && (i > -1)) {
				var next = input[i];
				input[i]++;
				i += parseInt(next, 10);
				steps++;
			}

			return steps;
		},

		Part2: function(input) { if (!input) input = this.input;
			input = input.split(/\n/);

			var i = 0;
			var steps = 0;
			while ((i < input.length) && (i > -1)) {
				var next = input[i];
				input[i] = parseInt(input[i]) + (next>2? -1 : 1);
				i += parseInt(next);
				steps++;
			}

			return steps;
		},
	},

	{
		Puzzle: function() { window.open("http://adventofcode.com/2017/day/6") },
		input: data.Day6,

		Part1: function(input) { if (!input) input = this.input;
			var history = [input.slice()];
			console.log(history);

			function isUnique() {
				for (var i=0; i<history.length-1; i++) {
					if (history[history.length-1].join('') == history[i].join('')) {
						console.log("loop size: "+(history.length-i-1))
						return false
					}
				}
				return true
			}

			function getLargestIndex() {
				var largestIndex = 15;
				var largestValue = 0;
				for (var i=0; i<16; i++) {
					if (input[i] > largestValue) {
						largestValue = input[i]
						largestIndex = i
					};
				}
				return largestIndex
			}

			var cycles = 0
			while (isUnique()) {
				var i = getLargestIndex();
				var blocks = input[i];
				input[i] = 0;
				while (blocks > 0) {
					i++
					input[i%16]++
					blocks--
				}
				history.push(input.slice())
				cycles++
			}

			return cycles
		},
	},

	{
		Puzzle: function() { window.open("http://adventofcode.com/2017/day/7") },
		input: data.Day7,

		ParseInput: function(input) {
			return input.split(/\n/).map(function(line){
				var node = line.split(" -> ")[0];
				var children = line.split(" -> ")[1];
				var split = node.split(" ");
				var name = split[0];
				var weight = split[1].substring(1,split[1].length-1);
				return {
					name: name,
					weight: parseInt(weight),
					children: children ? children.split(", ") : null
				}
			});
		},

		BuildStruct: function(input) {
			for (var i=0; i<input.length; i++) {
				if (input[i].children !== null) {
					for (var child=0; child<input[i].children.length; child++) {
						input[i].children[child] = this.FindNode(input, input[i].children[child]);
						input[i].children[child].parent = input[i]
					}
				}
			}
			var root = this.FindRoot(input[0]);
			this.CalcTotalWeight(root);
			return root;
		},

		FindNode: function(input, name) {
			for (var i=0; i<input.length; i++) {
				if (input[i].name == name) {
					return input[i];
				}
			}
		},

		CalcTotalWeight: function(node) {
			var weight = node.weight;
			if (node.children) {
				for (var i=0; i<node.children.length; i++) {
					weight += this.CalcTotalWeight(node.children[i]);
				}
			}
			node.cumulativeWeight = weight;
			return weight;
		},

		FindRoot: function(node) {
			return node.parent? this.FindRoot(node.parent) : node;
		},

		FindImbalance: function(node, delta) {
			if (node.children && node.children.length > 2) {
				for (var i=0; i<node.children.length; i++) {
					var child = [
						node.children[(i+0)%node.children.length],
						node.children[(i+1)%node.children.length],
						node.children[(i+2)%node.children.length]
					]
					if (child[0].cumulativeWeight !== child[1].cumulativeWeight && child[0].cumulativeWeight !== child[2].cumulativeWeight) {
						return this.FindImbalance(child[0], child[1].cumulativeWeight - child[0].cumulativeWeight);
					}
				}
			}
			return {node: node, correctedWeight: node.weight + delta};
		},

		Part1: function(input) { if (!input) input = this.ParseInput(this.input);
			return this.BuildStruct(input);
		},

		Part2: function(input) { if (!input) input =  this.ParseInput(this.input);
			var root = this.BuildStruct(input);
			var badNode = this.FindImbalance(root, 0)
			return badNode;
		}
	},

	{
		Puzzle: function() { window.open("http://adventofcode.com/2017/day/8") },
		input: data.Day8,

		ParseInput: function(input) {
			return input.split(/\n/).map(function(line) {
				return {
					test: line.split(' if ')[1].split(' '),
					inst: line.split(' if ')[0].split(' ')
				};
			})
		},

		ConstructRegisters: function(input) {
			var registerArr = new Set(input.map(function(line) {
				return line.test[0];
			}))
			var registers = {};
			registerArr.forEach(function(reg, i) {
				registers[reg] = 0;
			})
			return registers;
		},

		test: function(expression, registers) {
			switch(expression[1]) {
				case "==": return registers[expression[0]] == parseInt(expression[2]);
				case "!=": return registers[expression[0]] != parseInt(expression[2]);
				case  ">": return registers[expression[0]]  > parseInt(expression[2]);
				case  "<": return registers[expression[0]]  < parseInt(expression[2]);
				case ">=": return registers[expression[0]] >= parseInt(expression[2]);
				case "<=": return registers[expression[0]] <= parseInt(expression[2]);
				default: return false;
			}
		},

		execute: function(instruction, registers) {
			switch(instruction[1]) {
				case "inc": registers[instruction[0]] += parseInt(instruction[2]); return registers[instruction[0]];
				case "dec": registers[instruction[0]] -= parseInt(instruction[2]); return registers[instruction[0]];
			}
		},

		Part1: function(input) { if (!input) input = this.ParseInput(this.input);
			var registers = this.ConstructRegisters(input);
			var highestRecordedValue = 0;
			input.forEach(function(line, i) {
				if (this.test(line.test, registers)) var result = this.execute(line.inst, registers);
				if (result > highestRecordedValue) highestRecordedValue = result;
			}, this)
			return [registers, highestRecordedValue];
		},
	},

	{
		Puzzle: function() { window.open("http://adventofcode.com/2017/day/9") },
		input: data.Day9,

		Part1: function(input) { if (!input) input = this.input;
			var score = 0
			var nest = 0
			var garbage = false
			var garbageCharacters = 0
			for (var i=0; i<input.length; i++) {
				if (input[i] == "!") {
					i++
					continue
				}
				if (!garbage) {
					if (input[i] == "{") {
						nest++
						score += nest
					}
					if (input[i] == "}") {
						nest--
					}
					if (input[i] == "<") {
						garbage = true
					}
				}
				else {
					if (input[i] == ">") {
						garbage = false
						continue
					}
					garbageCharacters++
				}
			}
			return {score: score, garbage: garbageCharacters}
		},
	},

	{
		Puzzle: function() { window.open("http://adventofcode.com/2017/day/10") },
		input: data.Day10,

		Part1: function(input) { if (!input) input = this.input.split(",");

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
		},

		Part2: function(input) { if (!input) input = this.input; input = input.split('');

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
		},
	},

	{
		Puzzle: function() { window.open("http://adventofcode.com/2017/day/11") },
		input: data.Day11,

		Part1: function(input) { if (!input) input = this.input.split(",");
			var x=0; var y=0;
			var furthest = 0;
			for (var i=0; i<input.length; i++) {
				switch (input[i]) {
					case "n": y += 2; break;
					case "s": y -= 2; break;
					case "ne": x += 2; y++; break;
					case "se": x += 2; y--; break;
					case "nw": x -= 2; y++; break;
					case "sw": x -= 2; y--; break;
				}
				if (stepDistance(x,y) > furthest) furthest = stepDistance(x,y)
			}

			return {distance: stepDistance(x, y), furthest: furthest}

			function stepDistance(x, y) {
				var xSteps = Math.abs(x/2);
				var ySteps = y>0 ? (y-xSteps)/2 : Math.abs((y+xSteps)/2)
				return xSteps + ySteps
			}
		},
	},

	{
		Puzzle: function() { window.open("http://adventofcode.com/2017/day/12") },
		input: data.Day12,

		ParseInput: function(input) {
			return input.split(/\n/).map(function(line){
				var name = line.split(" <-> ")[0];
				var children = line.split(" <-> ")[1];
				return {
					name: name,
					children: children ? children.split(", ") : null
				}
			}, this);
		},

		BuildStruct: function(input) {
			for (var i=0; i<input.length; i++) {
				if (input[i].children !== null) {
					for (var child=0; child<input[i].children.length; child++) {
						input[i].children[child] = this.FindNode(input, input[i].children[child]);
					}
				}
			}
			return input;
		},

		FindNode: function(input, name) {
			for (var i=0; i<input.length; i++) {
				if (input[i].name == name) {
					return input[i];
				}
			}
		},

		Count: function(node, history) {
			if (!history) history = []
			if (history.find(function(name){return name == node}, this) == undefined) {
				history.push(node);
				var count = 1;
				if (node.children) {
					for (var i=0; i<node.children.length; i++) {
						var childCount = this.Count(node.children[i], history);
						count += childCount.total;
					}
				}
				return {total: count, history: history};
			}
			else {
				return {total: 0, history: history};
			}
		},

		Part1: function(input) { if (!input) input = this.ParseInput(this.input)
			this.BuildStruct(input)
			return this.Count(input[0])
		},

		Part2: function(input) { if (!input) input = this.ParseInput(this.input)
			this.BuildStruct(input)
			var groups = 0
			var history = []
			for (var i=0; i<input.length; i++) {
				if (history.find(function(node){return node == input[i]}, this) == undefined) {
					history = history.concat(this.Count(input[i]).history)
					groups++
				}
			}
			return groups
		},
	},

	{
		Puzzle: function() { window.open("http://adventofcode.com/2017/day/13") },
		input: data.Day13,

		PingPong: function(i, range) {
			range--
			return Math.abs((i+range) % (range*2) - range)
		},

		Part1: function(input) { if (!input) input = this.input
			var severity = 0;
			for (var i=0; i<96; i++) {
				if (input[i] && this.PingPong(i, input[i]) == 0) {
					severity += i*input[i]
				}
			}
			return severity
		},

		Part2: function(input) { if (!input) input = this.input
			var caught
			var delay = 0;
			while (caught !== false) {
				var caught = false;
				for (var i=0; i<97; i++) {
					if (input[i] && this.PingPong(i+delay, input[i]) == 0) {
						caught = true
						break
					}
				}
				delay++
			}
			return delay-1
		},
	},

	{
		Puzzle: function() { window.open("http://adventofcode.com/2017/day/14") },
		input: data.Day14,
		puzzles: this,

		Part1: function(input) { if (!input) input = this.input
			var used = 0
			var disk = []
			for (var row=0; row<128; row++) {
				var hash = this.puzzles.adventOfCode[9].Part2(input+'-'+row)
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
		},

		Part2: function(input) { if (!input) input = this.input

			var disk = this.Part1(input).disk

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
		},
	},

	{
		Puzzle: function() { window.open("http://adventofcode.com/2017/day/15") },
		input: data.Day15,

		Part1: function(input) { if (!input) input = this.input
			if (window.confirm("This solution may take a while to process. Are you sure you want to continue?") == true) {
				var previousValue = input
				var count = 0
				for (var x=0; x<10; x++) {
					for (var i=0; i<400000; i++) {
						previousValue = {
							a: (previousValue.a * 16807) % 2147483647,
							b: (previousValue.b * 48271) % 2147483647
						}
						var binaryValue = {
							a: parseInt(previousValue.a, 10).toString(2).substr(-16),
							b: parseInt(previousValue.b, 10).toString(2).substr(-16),
						}
						//console.log(binaryValue)
						if (binaryValue.a == binaryValue.b) count++
					}
					console.log( "Found: "+count+", ("+(x+1)+"/"+100+")" )
				}
				return count
			}
		},

		Part2: function(input) { if (!input) input = this.input
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

						if (consideredCount % 100 == 0) console.log(consideredCount+"/5000000")
					}
				}
			}

			return count
		}
	},

	{
		Puzzle: function() { window.open("http://adventofcode.com/2017/day/16") },
		input: data.Day16,
		dancers: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p'],

		FindDancer: function(dancer) {
			return this.dancers.findIndex(function(dancer){return dancer == this}, dancer)
		},

		Spin: function(a) {
			return this.dancers = this.dancers.splice(-a).concat(this.dancers);
		},

		Exchange: function(a, b) {
			this.dancers[a] = this.dancers.splice(b, 1, this.dancers[a])[0]
			return this.dancers
		},

		Partner: function(a, b) {
			return this.Exchange(this.FindDancer(a), this.FindDancer(b))
		},

		Part1: function(input) { if (!input) input = this.input.split(',')
			input.forEach(function(instruction){
				var move = instruction.substr(0,1)
				var params = instruction.substr(1).split('/')
				switch (move) {
					case 's': this.Spin(params[0]); break;
					case 'x': this.Exchange(params[0], params[1]); break;
					case 'p': this.Partner(params[0], params[1]); break;
				}
			}, this)
			return this.dancers
		},

		Part2: function(input) { if (!input) input = this.input.split(',')
			for (var i=0; i<(1000000000%60); i++) {
				this.Part1()
			}
			return this.dancers.join('')
		}
	},

	{
		Puzzle: function() { window.open("http://adventofcode.com/2017/day/17") },
		input: data.Day17,

		Part1: function(input) { if (!input) input = this.input
			var buffer = [0]
			var position = 0
			var value = 0
			for (var i=0; i<2017; i++) {
				position = (position + input) % buffer.length
				position ++
				value ++
				buffer.splice(position, 0, value)
			}
			position++
			return buffer[position % buffer.length]
		},

		Part2: function(input) { if (!input) input = this.input
			var buffer = 1
			var position = 0
			var value = 0
			var secondIndexValue
			for (var i=0; i<50000000; i++) {
				position = (position + input) % buffer
				position ++
				value ++
				buffer ++
				if (position == 1) {secondIndexValue = value}
			}
			return secondIndexValue
		}
	},

	{
		Puzzle: function() { window.open("http://adventofcode.com/2017/day/18") },
		input: data.Day18,

		ParseInput: function(input) {
			return input.split(/\n/).map(function(line) {
				return line.split(' ')
			})
		},

		ConstructRegisters: function(input) {
			var registers = {};
			input.forEach(function(reg, i) {
				if (isNaN(reg[1])) registers[reg[1]] = 0;
			})
			return registers;
		},

		GetValue: function(expression, registers) {
			return (expression && isNaN(expression)) ? this.GetValue(registers[expression], registers) : parseInt(expression)
		},

		Run: function(script, params) {
			var jump = 1

			var instruction = script[params.pointer][0]
			var i = script[params.pointer][1]
			var X = this.GetValue(script[params.pointer][1], params.registers)
			var Y = this.GetValue(script[params.pointer][2], params.registers)

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
		},

		Part1: function(input) { input = this.ParseInput(input? input : this.input)
			var params = { pointer: 0, registers: this.ConstructRegisters(input) }
			while (params.pointer <= input.length) {
				params.pointer = this.Run(input, params)
			}
			return params.lastSound
		},

		Part2: function(input) { input = this.ParseInput(input? input : this.input)

			var params = [
				{ registers: this.ConstructRegisters(input), pointer: 0, input: [], sendCount: 0 },
				{ registers: this.ConstructRegisters(input), pointer: 0, input: [], sendCount: 0 }
		  	]

			params[0].output = params[1].input;
			params[1].output = params[0].input;
			params[0].registers.p = 0;
			params[1].registers.p = 1;

			var lastpos = [0,0]
			while ((params[0].pointer <= input.length || params[1].pointer <= input.length)) {
				if (params[0].pointer <= input.length) params[0].pointer = this.Run(input, params[0])
				if (params[1].pointer <= input.length) params[1].pointer = this.Run(input, params[1])
				if (params[0].pointer == lastpos[0] && params[1].pointer == lastpos[1]) break
				lastpos = [params[0].pointer, params[1].pointer]
			}

			return params[1].sendCount
		}
	},

	{
		Puzzle: function() { window.open("http://adventofcode.com/2017/day/19") },
		input: data.Day19,
		letters: '',

		directions: [
			{ x: 0, y:-1 },
			{ x: 1, y: 0 },
			{ x: 0, y: 1 },
			{ x:-1, y: 0 },
		],

		GetDirection: function(map, pos) {
			if (isPath(this.directions[pos.direction])) return pos.direction

			for (var i=0; i<3; i+=2) {
				var dirIndex = (((i + pos.direction - 1) % 4) + 4) % 4;
				if (isPath(this.directions[dirIndex])) return dirIndex
			}

			function isPath(direction) {
				return map[pos.y + direction.y][pos.x + direction.x] !== " "
			}

			return null
		},

		MovePos: function(map, pos) {
			pos.x += this.directions[pos.direction].x
			pos.y += this.directions[pos.direction].y
			pos.direction = this.GetDirection(map, pos)

			var letter = map[pos.y][pos.x].match(/^[A-Z]/)
			if (letter) this.letters += letter
		},

		Part1: function(input) { if (!input) input = this.input
			input = this.input.split(/\n/).map(function(row){return row.split('')})

			var pos = {
				x: input[0].findIndex(function(element){return element == "|"}), y: 0,
				direction: 2,
			}

			var steps = 0
			while (pos.direction != null) {
				this.MovePos(input, pos)
				steps++
			}
			return {letters: this.letters, steps: steps+1}
		}
	},

	{
		Puzzle: function() { window.open("http://adventofcode.com/2017/day/20") },
		input: data.Day20,
		
		ParseInput: function(input) {
			return input.split(/\n/).map(function(particle){
				return particle.split(', ').map(function(vector){
					return vector.substr(3,vector.length-4).split(',').map(function(value){
						return parseInt(value)
					})
				})
			})
		},

		Part1: function(input) { if (!input) input = this.input
			input = this.ParseInput(input)

			// Simply find the lowest acceleration (breaks if there are multiple lowest)
			var smallest = 0
			input.forEach(function(particle,i){
				var thisAcc     = Math.abs(particle[2][0])        + Math.abs(particle[2][1])        + Math.abs(particle[2][2])
				var smallestAcc = Math.abs(input[smallest][2][0]) + Math.abs(input[smallest][2][1]) + Math.abs(input[smallest][2][2])
				if (thisAcc < smallestAcc) smallest = i
			})

			return [smallest, input[smallest]]
		},

		Part2: function(input) { if (!input) input = this.input
			input = this.ParseInput(input)
			
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
	},

	{
		Puzzle: function() { window.open("http://adventofcode.com/2017/day/21") },
		input: data.Day21,
		
		ParseInput: function(input) {
			return input.split(/\n/).map(
				rule => {
					var thisrule = rule.split(" => ").map(
						row => row.split("/").map(
							column => column.split('').map(
								pixel => pixel == "#"? 1 : 0
							)
						)
					)
					return {input: thisrule[0], output: thisrule[1]}
				}
			)
		},

		Part1: function(input) { if (!input) input = this.input
			input = this.ParseInput(input)

			return input
		},
	}
]

var puzzle = adventOfCode[adventOfCode.length-1];
console.time('Day '+(adventOfCode.length)+' Part '+(puzzle.Part2? 2 : 1));
console.log(puzzle.Part2? puzzle.Part2() : (puzzle.Part1? puzzle.Part1() : null));
console.timeEnd('Day '+(adventOfCode.length)+' Part '+(puzzle.Part2? 2 : 1));
