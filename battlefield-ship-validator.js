function validateBattlefield(field) {
  let shipCapacitor = 0;
  const ships = {};

  function validateCell(i, j) {
    shipCapacitor++;
    if (shipCapacitor > 4) {
      return false;
    }
    field[i][j] = 0;

    // Cannot have ship at diagonals
    if (field[i + 1][j + 1] || field[i + 1][j - 1]) {
      return false;
    }

    // Cannot have perpendicular ship
    return !(field[i][j + 1] && field[i + 1][j]);
  }

  for (const [i, line] of field.entries()) {
    for (const [j, one] of line.entries()) {
      if (one) {
        if (!validateCell(i, j)) {
          return false;
        }

        // Has a horizontal ship
        if (field[i][j + 1]) {
          let tj = j;
          while(field[i][++tj]) {
            if (!validateCell(i, tj)) {
              return false;
            }
          }
        }

        // Has a vertical ship
        if (field[i + 1][j]) {
          let ti = i;
          while(field[++ti][j]) {
            if (!validateCell(ti, j)) {
              return false;
            }
          }
        }
      }

      if (shipCapacitor > 0) {
        ships[shipCapacitor] = ships[shipCapacitor] ? ships[shipCapacitor] + 1 : 1;
        shipCapacitor = 0;
      }
    }
  }

  return ships[4] === 1 && ships [3] === 2 && ships[2] === 3 && ships[1] === 4;
}


const assert = require('assert');

describe("Battlefield ship validator", () => {
  it("test", () => {
    assert.deepStrictEqual(validateBattlefield([
      [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]), true);
  });
});

