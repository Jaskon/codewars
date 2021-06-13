function arrayIterator(array) {
  const checkedCells = array.map(line => line.map(_ => false));

  let direction = 'r'
  let directionChangesInRow = 0;


  const changeDirection = () => {
    switch (direction) {
      case 'r': direction = 'd'; break;
      case 'u': direction = 'r'; break;
      case 'l': direction = 'u'; break;
      case 'd': direction = 'l'; break;
    }
    directionChangesInRow++;
  }

  const checkAndGet = (i, j) => {
    directionChangesInRow = 0;
    checkedCells[i][j] = true;
    return array[i][j];
  }

  const verifyCell = (i, j) => {
    return checkedCells[i] && !checkedCells[i][j]
      && array[i] !== undefined && array[i][j] !== undefined;
  }


  let i = 0;
  let j = 0;

  function* nextElement() {
    if (!array.length || !array[0].length) {
      return;
    }

    checkedCells[0][0] = true;
    yield array[i][j];

    while (directionChangesInRow < 2) {
      if (direction === 'r' && verifyCell(i, j + 1)) {
        yield checkAndGet(i, ++j);
        continue;
      }
      if (direction === 'd' && verifyCell(i + 1, j)) {
        yield checkAndGet(++i, j);
        continue;
      }
      if (direction === 'l' && verifyCell(i, j - 1)) {
        yield checkAndGet(i, --j);
        continue;
      }
      if (direction === 'u' && verifyCell(i - 1, j)) {
        yield checkAndGet(--i, j);
        continue;
      }
      changeDirection();
    }
  }

  return nextElement();
}



snail = function(array) {
  const sorted = [];

  const iterator = arrayIterator(array);

  let current = iterator.next();
  while (!current.done) {
    sorted.push(current.value);
    current = iterator.next();
  }

  return sorted;
}


const assert = require('assert');

describe("Snail", () => {
  it("test", () => {
    assert.deepStrictEqual(snail([[]]), []);
    assert.deepStrictEqual(snail([[1]]), [1]);
    assert.deepStrictEqual(snail([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [1, 2, 3, 6, 9, 8, 7, 4, 5]);
    assert.deepStrictEqual(snail([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]]), [1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19, 18, 17, 12, 13]);
    assert.deepStrictEqual(snail([[1, 2, 3, 4, 5, 6], [20, 21, 22, 23, 24, 7], [19, 32, 33, 34, 25, 8], [18, 31, 36, 35, 26, 9], [17, 30, 29, 28, 27, 10], [16, 15, 14, 13, 12, 11]]), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]);
  });
});
