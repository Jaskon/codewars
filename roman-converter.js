const romanValues = {
  'I': 1,
  'V': 5,
  'X': 10,
  'L': 50,
  'C': 100,
  'D': 500,
  'M': 1000
};

const romanValuesByQuality = [
  {num: 1000, sym: 'M'},
  {num: 500, sym: 'D'},
  {num: 100, sym: 'C'},
  {num: 50, sym: 'L'},
  {num: 10, sym: 'X'},
  {num: 5, sym: 'V'},
  {num: 1, sym: 'I'}
];
romanValuesByQuality[0].availableSub = romanValuesByQuality[2];
romanValuesByQuality[1].availableSub = romanValuesByQuality[2];
romanValuesByQuality[2].availableSub = romanValuesByQuality[4];
romanValuesByQuality[3].availableSub = romanValuesByQuality[4];
romanValuesByQuality[4].availableSub = romanValuesByQuality[6];
romanValuesByQuality[5].availableSub = romanValuesByQuality[6];


function fromRoman(sym) {
  const values = sym.split('').map(one => romanValues[one]);
  return values.reduce((sum, one, i) => {
    if (one < values[i + 1]) {
      return sum + (values[i + 1] - one) - values[i + 1];
    }
    return sum + one;
  }, 0)
}


function toRoman(num) {
  let sym = '';

  while (true) {
    const curSymIndex = romanValuesByQuality.findIndex(one => num >= one.num);
    const curSym = romanValuesByQuality[curSymIndex];

    if (!curSym) {
      return sym;
    }


    const higherSym = romanValuesByQuality[curSymIndex - 1];
    if (higherSym && num >= higherSym.num - higherSym.availableSub.num) {
      sym += (higherSym.availableSub.sym + higherSym.sym);
      num -= (higherSym.num - higherSym.availableSub.num);
    } else {
      sym += curSym.sym;
      num -= curSym.num;
    }
  }
}


const RomanNumerals = {
  toRoman: toRoman,
  fromRoman: fromRoman
};


const assert = require('assert');

describe("Tests", () => {
  it("test", () => {
    assert.equal(RomanNumerals.toRoman(1000), 'M');
    assert.equal(RomanNumerals.toRoman(999), "CMXCIX");
    assert.equal(RomanNumerals.toRoman(4), 'IV');
    assert.equal(RomanNumerals.toRoman(1), 'I');
    assert.equal(RomanNumerals.toRoman(1991), 'MCMXCI');
    assert.equal(RomanNumerals.toRoman(2006), 'MMVI');
    assert.equal(RomanNumerals.toRoman(2020), 'MMXX');

    assert.equal(RomanNumerals.fromRoman('XXI'), 21);
    assert.equal(RomanNumerals.fromRoman('I'), 1);
    assert.equal(RomanNumerals.fromRoman('III'), 3);
    assert.equal(RomanNumerals.fromRoman('IV'), 4);
    assert.equal(RomanNumerals.fromRoman('MMVII'), 2007);
    assert.equal(RomanNumerals.fromRoman('MDCLXIX'), 1669);
  });
});
