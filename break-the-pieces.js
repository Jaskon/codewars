function drawShape(lines) {
  for (let [i, line] of lines.entries()) {
    for (let [j, sym] of line.entries()) {
      if (sym === ' ') {
        if (!lines[i - 1][j]) {
          lines[i - 1][j] = '-';
        }
        if (!lines[i + 1][j]) {
          lines[i + 1][j] = '-';
        }
        if (!lines[i][j - 1]) {
          lines[i][j - 1] = '|';
        }
        if (!lines[i][j + 1]) {
          lines[i][j + 1] = '|';
        }

        // Corners
        if (lines[i][j - 1] !== ' ' && lines[i - 1][j] !== ' ') {
          lines[i - 1][j - 1] = '+';
        }
        if (lines[i][j + 1] !== ' ' && lines[i - 1][j] !== ' ') {
          lines[i - 1][j + 1] = '+';
        }
        if (lines[i][j - 1] !== ' ' && lines[i + 1][j] !== ' ') {
          lines[i + 1][j - 1] = '+';
        }
        if (lines[i][j + 1] !== ' ' && lines[i + 1][j] !== ' ') {
          lines[i + 1][j + 1] = '+';
        }

        // Inner corners
        if (lines[i - 1][j] === ' ' && lines[i][j - 1] === ' ' && lines[i - 1][j - 1] !== ' ') {
          lines[i - 1][j - 1] = '+';
        }
        if (lines[i - 1][j] === ' ' && lines[i][j + 1] === ' ' && lines[i - 1][j + 1] !== ' ') {
          lines[i - 1][j + 1] = '+';
        }
        if (lines[i + 1][j] === ' ' && lines[i][j - 1] === ' ' && lines[i + 1][j - 1] !== ' ') {
          lines[i + 1][j - 1] = '+';
        }
        if (lines[i + 1][j] === ' ' && lines[i][j + 1] === ' ' && lines[i + 1][j + 1] !== ' ') {
          lines[i + 1][j + 1] = '+';
        }
      }
    }
  }

  // Replace training undefined symbols to trailing spaces
  lines = lines.map(line => line.map(sym => sym === undefined ? ' ' : sym));

  return lines.map(line => line.join('')).join('\n');
}

function getShapes(lines) {
  // Go though spaces until a space after not a space char
  // Add that coordinate to the queue and to the shape array; Mark as checked
  // Go through the queue, adding all not marked space siblings to the queue and to the shape array too;
  //   Mark them as checked
  // Go to the first milestone


  function goThroughShape(i0, j0) {
    const processCell = (i, j) => {
      if (lines[i][j] === ' ' && !marked[i][j]) {
        queue.push([i, j]);
        marked[i][j] = true;
      }
    }

    const queue = [[i0, j0]];
    let queuePointer = 0;

    while (queuePointer < queue.length) {
      const [i, j] = queue[queuePointer];
      processCell(i, j + 1);
      processCell(i, j - 1);
      processCell(i + 1, j);
      processCell(i - 1, j);
      queuePointer++;
    }

    const minI = Math.min(...queue.map(one => one[0]));
    const minJ = Math.min(...queue.map(one => one[1]));

    const shape = [];
    queue.forEach(([i, j]) => {
      if (!shape[i - minI]) {
        shape[i - minI] = Array(j - minJ).fill(undefined);
      }

      shape[i - minI][j - minJ] = ' ';
    });

    shape.forEach(line => line.unshift(undefined));
    // Create empty cells to create trailing spaces instead of them later
    shape.unshift(Array(shape[0].length).fill(undefined));
    shape.push(Array(shape[shape.length - 1].length).fill(undefined));

    return shape;
  }


  const shapes = [];
  const marked = lines.map(line => Array(line.length).fill(false));

  for (let [i, line] of lines.entries()) {
    let trailingSpace = true;
    for (let [j, sym] of line.entries()) {
      // Recognize if its a space before any other symbol
      if (sym !== ' ') {
        trailingSpace = false;
      }

      if (sym === ' ' && !trailingSpace && !marked[i][j]) {
        shapes.push(goThroughShape(i, j));
      }
    }
  }

  return shapes.map(drawShape);
}


function breakThePieces(input) {
  const inputLines = input
    .split('\n')
    .map(one => one.replace(/ +$/, ''))
    .map(one => one.split(''));

  // Array of strings
  const shapes = getShapes(inputLines);
  return shapes;
}


const assert = require('assert');

describe("Break the pieces", () => {
  it("test", () => {
    assert.deepStrictEqual(breakThePieces(
      ["+------------+\n" +
       "|            |\n" +
       "|            |\n" +
       "|            |\n" +
       "+------+-----+\n" +
       "|      |     |\n" +
       "|      |     |\n" +
       "+------+-----+\n" +
       "+-------------------+--+\n" +
       "|                   |  |\n" +
       "|                   |  |\n" +
       "|  +----------------+  |\n" +
       "|  |                   |\n" +
       "|  |                   |\n" +
       "+--+-------------------+\n" +
       "           +-+             \n" +
       "           | |             \n" +
       "         +-+-+-+           \n" +
       "         |     |           \n" +
       "      +--+-----+--+        \n" +
       "      |           |        \n" +
       "   +--+-----------+--+     \n" +
       "   |                 |     \n" +
       "   +-----------------+  "].join("\n")),
      [
       "+------------+\n" +
       "|            |\n" +
       "|            |\n" +
       "|            |\n" +
       "+------------+",
       "+------+\n" +
       "|      |\n" +
       "|      |\n" +
       "+------+",
       "+-----+\n" +
       "|     |\n" +
       "|     |\n" +
       "+-----+",
       "+-------------------+\n" +
       "|                   |\n" +
       "|                   |\n" +
       "|  +----------------+\n" +
       "|  |\n" +
       "|  |\n" +
       "+--+",
       "                 +--+\n" +
       "                 |  |\n" +
       "                 |  |\n" +
       "+----------------+  |\n" +
       "|                   |\n" +
       "|                   |\n" +
       "+-------------------+",
       "+-+\n" +
       "| |\n" +
       "+-+",
       "+-----+\n" +
       "|     |\n" +
       "+-----+",
       "+-----------+\n" +
       "|           |\n" +
       "+-----------+",
       "+-----------------+\n" +
       "|                 |\n" +
       "+-----------------+"
      ]);
  });
});
