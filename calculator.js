function calc(expr) {
  const tokens = expr.split(' ');
  let pointer = 0;

  function shift() {
    return tokens[pointer++];
  }

  getOne();
}


const { expect } = require('chai');

describe("Calculator", function() {
  it("calc simple expressions", function () {
    expect(calc('6 + 3')).to.equals(9);
    expect(calc('6 - 3')).to.equals(3);
    expect(calc('6 * 3')).to.equals(18);
    expect(calc('6 / 3')).to.equals(2);
  });
});
