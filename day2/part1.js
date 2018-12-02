const fs = require("fs");
const readline = require("readline");

const lineReader = readline.createInterface({
  input: fs.createReadStream("input.txt")
});

const set = new Set();
let result = {};
let doubles = 0;
let triples = 0;

const computeResult = line => {
  const chars = line.split("");
  chars.map(char => {
    if (set.has(char)) {
      result[char] = result[char] + 1;
    } else {
      set.add(char);
      result[char] = 1;
    }
  });

  let foundTwo = false;
  let foundThree = false;

  Object.values(result).map(value => {
    if (value == 2 && !foundTwo) {
      doubles++;
      foundTwo = true;
    } else if (value == 3 && !foundThree) {
      triples++;
      foundThree = true;
    }
  });

  set.clear();
  result = {};
};

lineReader.on("line", line => {
  computeResult(line);
});

lineReader.on("close", () => {
  console.log(doubles * triples);
});
