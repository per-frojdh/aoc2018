const fs = require("fs");
const readline = require("readline");

const lineReader = readline.createInterface({
  input: fs.createReadStream("input.txt")
});

const array = Array.from({ length: 1000 }, () =>
  Array.from({ length: 1000 }, () => ".")
);

const lineRe = /([^#]?\d+)\D*(\d*,\d*)\D*(\d*x\d*)/;
let overlappingSize = 0;

// example: #1287 @ 152,94: 10x27
const parseLine = line => {
  const [_, id, coordinates, size] = line.match(lineRe);
  const [x, y] = coordinates.split(",");
  const [width, height] = size.split("x");

  return {
    x: parseInt(x),
    y: parseInt(y),
    width: parseInt(width),
    height: parseInt(height),
    id: parseInt(id)
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
        array[fabric.x + x][fabric.y + y] = fabric.id;
        continue;
      }

      if (isOverlapped) {
        // Position has already (previously) been overlapped
        continue;
      }

      if (isNotOverlapped) {
        // Position will overlap (for the first time)
        array[fabric.x + x][fabric.y + y] = "X";
        overlappingSize++;
        continue;
      }
    }
  }
};

lineReader.on("line", line => placeFabric(parseLine(line)));

lineReader.on("close", () => {
  console.log(overlappingSize);
});
