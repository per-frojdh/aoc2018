const fs = require("fs");
const readline = require("readline");

const lineReader = readline.createInterface({
  input: fs.createReadStream("input.txt")
});

const values = [];

const computeResult = line => {
  const withoutFirst = values.slice(1);
  withoutFirst.map(value => {
    let hits = 0;
    const firstChars = line.split("");
    const secondChars = value.split("");

    for (let i = 0; i <= firstChars.length; i++) {
      if (firstChars[i] !== secondChars[i]) {
        hits++;
      }
    }

    if (hits === 1) {
      console.log("found hit", line);
    }
  });
};

lineReader.on("line", line => {
  values.push(line);
});

lineReader.on("close", () => {
  values.map(computeResult);
});
