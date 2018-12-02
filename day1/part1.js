const fs = require("fs");
const readline = require("readline");

const lineReader = readline.createInterface({
  input: fs.createReadStream("input.txt")
});

let result = 0;

const computeResult = line => {
  if (line.indexOf("-", 0)) {
    result += new Number(line.substring(1, line.length));
  } else if (line.indexOf("+", 0)) {
    result -= new Number(line.substring(1, line.length));
  }
};

lineReader.on("line", line => {
  computeResult(line);
});

lineReader.on("close", () => {
  console.log(result);
});
