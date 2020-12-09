// parse the input into array of passport objects
function Parse(input) {
  return input.split("\r\n\r\n").map(passport => {
    let rows = passport.split(/[ \r\n]+/).map(row => row.split(":"));
    let obj = {};
    rows.forEach(row => {
      let [key, val] = row;
      obj[key] = val;
    });
    return obj;
  });
  return input;
}

// count valid passports ignoring cid
function Part1(input) {
  return input.filter(passport => validate(passport)).length;
}

// count valid passports ignoring cid with strict validation
function Part2(input) {
  return input.filter(passport => validate(passport, true)).length;
}

function validate(passport, strict) {
  const rules = {
    // cid: id => true,
    byr: year => year >= 1920 && year <= 2002,
    iyr: year => year >= 2010 && year <= 2020,
    eyr: year => year >= 2020 && year <= 2030,
    hcl: color => /^#[0-9|a-f]{6}$/.test(color),
    ecl: color => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(color),
    pid: id => /^\d{9}$/.test(id),
    hgt: height => {
      let unit = height.substr(-2);
      height = height.substr(0, height.length - 2);
      if (unit === "cm") return height >= 150 && height <= 193;
      if (unit === "in") return height >= 59 && height <= 76;
      return false;
    }
  };

  // if a field is missing or fails the rule, short the validation
  for (const field in rules) {
    if (!(field in passport) || (strict && !rules[field](passport[field]))) {
      return false;
    }
  }

  // otherwise pass
  return true;
}

// if we're running in the browser, parse the input from the document
// otherwise export the functions
if (typeof window !== "undefined") {
  let input = Parse(document.body.textContent.trim());
  console.log(Part1(input), Part2(input));
} else {
  module.exports = { Parse, Part1, Part2 };
}
