const fs = require("fs");
const readline = require("readline");

const lineReader = readline.createInterface({
  input: fs.createReadStream("input.txt")
});

const array = Array.from({ length: 1000 }, () =>
  Array.from({ length: 1000 }, () => ".")
);

const claims = [];

// example: #1287 @ 152,94: 10x27
const parseLine = line => {
  const value = line.substring(line.indexOf("#") + 1, line.indexOf("@") - 1);
  const x = line.substring(line.indexOf("@") + 2, line.indexOf(","));
  const y = line.substring(line.indexOf(",") + 1, line.indexOf(":"));

  const width = line.substring(line.indexOf(":") + 2, line.indexOf("x"));
  const height = line.substring(line.indexOf("x") + 1);
  return {
    x: parseInt(x),
    y: parseInt(y),
    width: parseInt(width),
    height: parseInt(height),
    value: parseInt(value)
  };
};

const placeFabric = fabric => {
  for (let x = 0; x < fabric.width; x++) {
    for (let y = 0; y < fabric.height; y++) {
      const currentPos = array[fabric.x + x][fabric.y + y];

      const isUntouched = currentPos === ".";
      const isOverlapped = currentPos === "X";
      const isNotOverlapped = currentPos !== "X" && currentPos !== ".";
      if (isUntouched) {
        // Position has never been touched
        array[fabric.x + x][fabric.y + y] = fabric.value;
        continue;
      }

      if (isOverlapped) {
        // Position has already (previously) been overlapped
        continue;
      }

      if (isNotOverlapped) {
        // Position will overlap (for the first time)
        array[fabric.x + x][fabric.y + y] = "X";
        continue;
      }
    }
  }
};

const findUntouchedClaim = () => {
  claims.map(claim => {
    let untouchedClaim = true;
    for (let x = 0; x < claim.width; x++) {
      for (let y = 0; y < claim.height; y++) {
        const currentPos = array[claim.x + x][claim.y + y];
        if (currentPos !== claim.value) {
          untouchedClaim = false;
        }
      }
    }

    if (untouchedClaim) {
      // There's the result
      console.log(claim.value);
    }
  });
};

lineReader.on("line", line => {
  const fabric = parseLine(line);
  placeFabric(fabric);
  claims.push(fabric);
});

lineReader.on("close", () => {
  console.log(overlappingSize);
  findUntouchedClaim();
});
