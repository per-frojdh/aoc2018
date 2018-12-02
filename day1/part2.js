const fs = require("fs");
const readline = require("readline");

const lineReader = readline.createInterface({
  input: fs.createReadStream("input.txt")
});

const values = [];
const set = new Set();
let result = 0;

const computeResult = line => {
  if (line.indexOf("-", 0)) {
    result -= parseInt(line.substring(1, line.length));
  } else if (line.indexOf("+", 0)) {
    result += parseInt(line.substring(1, line.length));
  }

  if (set.has(result)) {
    console.log(result);
    process.exit(0);
  } else {
    set.add(result);
  }
};

lineReader.on("line", line => {
  values.push(line);
});

lineReader.on("close", () => {
  while (true) {
    values.map(computeResult);
  }
});
