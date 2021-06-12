function getDepth(arr, i, j) {
  const colour = arr[i][j];
  let depth = 0;

  const queue = [[i, j]];
  let currentDepthQueuePointer = 0;
  let currentDepthQueuePointerEnd = 0;

  const processCell = (_i, _j) => {
    if (!arr[_i] || arr[_i][_j] !== colour) {
      return false;
    }
    queue.push([_i, _j]);
    return true;
  };

  while (currentDepthQueuePointer < queue.length) {
    currentDepthQueuePointerEnd = queue.length;
    depth++;

    while (currentDepthQueuePointer < currentDepthQueuePointerEnd) {
      i = queue[currentDepthQueuePointer][0];
      j = queue[currentDepthQueuePointer][1];

      if (!processCell(i, j + 1)) return depth;
      if (!processCell(i, j - 1)) return depth;
      if (!processCell(i + 1, j)) return depth;
      if (!processCell(i - 1, j)) return depth;

      currentDepthQueuePointer++;
    }
  }
}

function central_pixels(image, colour) {
  if (!image.pixels.find(one => one === colour)) {
    return [];
  }

  const imageMatrix = Array(image.height).fill(null).map(
    (_, index) => image.pixels.slice(index * image.width, (index + 1) * image.width)
  );

  const depths = image.pixels.map(
    (one, index) => one === colour ? getDepth(imageMatrix, Math.floor(index / image.width), index % image.width) : 0
  );

  console.log(depths);

  const maxElem = Math.max(...depths);
  const maxElemIndexes = [];
  depths.forEach((one, index) => one === maxElem ? maxElemIndexes.push(index) : 0);

  return maxElemIndexes;
}



class Image {
  constructor(data, w, h) {
    this.pixels = data.slice();
    this.width = w;
    this.height = h;
  }
}


const { expect } = require('chai');

describe("central_pixels", function(){

  const ascending = (a,b)=>a-b;  // ascending order for sorting

  it("Example_In_The_Picture", function() {
    const image = new Image([1, 1, 4, 4, 4, 4, 2, 2, 2, 2,
      1, 1, 1, 1, 2, 2, 2, 2, 2, 2,
      1, 1, 1, 1, 2, 2, 2, 2, 2, 2,
      1, 1, 1, 1, 1, 3, 2, 2, 2, 2,
      1, 1, 1, 1, 1, 3, 3, 3, 2, 2,
      1, 1, 1, 1, 1, 1, 3, 3, 3, 3], 10, 6);

    // Only one red pixel has the maximum depth of 3:
    const red_ctr = [ 32 ];
    expect(central_pixels(image, 1)).to.have.members(red_ctr);

    // Multiple blue pixels have the maximum depth of 2:
    const blue_ctr = [ 16,17,18,26,27,28,38 ];
    expect(central_pixels(image, 2).sort(ascending)).to.have.members(blue_ctr);

    // All the green pixels have depth 1, so they are all "central":
    const green_ctr = [ 35,45,46,47,56,57,58,59 ];
    expect(central_pixels(image, 3).sort(ascending)).to.have.members(green_ctr);

    // Similarly, all the purple pixels have depth 1:
    const purple_ctr = [ 2,3,4,5 ];
    expect(central_pixels(image, 4).sort(ascending)).to.have.members(purple_ctr);

    // There are no pixels with colour 5:
    const non_existent_ctr = [ ];
    expect(central_pixels(image, 5)).to.have.members(non_existent_ctr);
  });

  it("Big test one", function() {
    expect(central_pixels(
      new Image([61,60,61,60,60,60,61,60,60,61,61,60,60,62,61,61,61,60,62,60,61,60,60,61,60,62,61,62,60,62,60,60,62,61,62,62,62,60,60,60,60,60,62,62,62,62,61,61,62,61,61,61,61,61,62,60,60,62,62,61,62,60,62,62,61,61,60,60,62,60,61,62,60,61,60,61,61,62,62,61,60,60,61,61,61,61,62,61,61,60,60,62,62,60,60,62,62,62,60,61,62,61,62,61,62,62,62,60,60,60,62,61,62,60,62,61,61,62,60,60,60,61,61,61,61,61,60,62,60,60,61,62,61,62,60,60,62,60,62,61,60,60,62,62,60,62,62,62,61,61,61,60,62,61,60,60,61,60,60,62,60,60,61,60,62,60,60,60,61,60,61,61,60,62,61,60,61,20,20,20,61,62,61,62,60,60,62,61,62,62,61,60,62,60,62,61,62,62,61,60,60,60,60,62,61,60,62,60,62,62,60,60,60,61,61,62,20,20,20,20,20,20,20,20,20,62,61,61,62,62,60,61,61,60,62,61,61,61,61,60,62,61,61,60,62,61,62,60,61,62,61,61,60,62,61,62,20,20,20,20,20,20,20,20,20,20,20,20,20,60,60,61,62,62,60,62,62,62,60,60,60,62,61,60,62,62,61,61,60,60,61,61,60,60,62,62,60,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,62,62,60,61,62,62,62,62,60,60,60,61,62,61,62,60,61,60,61,61,61,62,61,60,60,62,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,62,60,60,61,61,62,62,62,60,62,62,61,62,60,60,60,60,60,60,60,62,60,62,62,62,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,61,62,60,61,62,60,60,60,60,60,61,61,62,60,61,61,62,61,60,62,61,62,60,61,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,61,60,61,60,61,61,60,61,60,60,60,61,60,61,62,62,62,60,62,60,60,62,62,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,61,62,60,62,62,60,62,62,62,62,61,62,61,62,60,60,62,60,61,62,62,62,62,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,62,62,61,62,62,61,62,60,61,61,61,61,60,61,60,62,61,61,61,61,61,62,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,62,62,60,60,62,62,62,62,60,60,62,60,60,61,61,61,60,62,60,62,62,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,60,61,61,61,62,62,62,60,62,60,60,62,60,61,60,62,60,62,61,62,61,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,62,62,61,60,60,61,62,60,60,60,62,62,60,61,61,60,61,62,61,60,61,60,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,60,60,60,60,62,61,60,61,62,60,60,62,61,60,61,62,60,62,60,60,61,62,60,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,61,61,60,61,62,61,60,61,62,62,62,62,61,60,61,61,60,62,61,60,62,62,60,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,60,62,60,61,62,60,61,62,60,62,62,62,61,61,62,61,60,60,60,61,62,61,61,60,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,60,60,62,62,60,62,61,60,60,62,62,61,61,61,60,62,62,60,60,61,60,62,60,61,62,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,62,62,61,60,61,61,60,62,60,61,61,60,62,62,60,61,62,60,60,62,62,60,61,61,61,60,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,61,60,61,61,62,62,62,60,61,60,62,62,62,62,61,62,61,60,62,61,60,60,61,61,62,61,60,61,20,20,20,20,20,20,20,20,20,20,20,20,20,62,62,61,62,62,60,61,60,61,60,61,61,61,60,60,60,62,60,61,61,61,62,62,60,62,60,60,60,61,61,61,20,20,20,20,20,20,20,20,20,61,61,62,60,61,60,62,62,62,62,60,60,62,60,60,60,60,62,62,62,61,62,62,62,61,62,62,61,62,61,61,60,62,61,62,60,20,20,20,61,60,62,61,62,60,61,61,61,60,61,62,62,62,61,60,62,60,60,62,62,60,60,60,62,60,60,61,60,61,61,60,60,61,60,62,62,61,62,60,62,62,60,60,62,60,62,62,62,60,61,62,60,60,61,62,60,62,62,60,61,60,60,61,60,61,62,60,61,60,60,62,62,62,61,62,62,62,60,61,60,61,62,60,62,60,62,60,62,62,61,61,62,61,60,62,62,61,60,61,61,60,60,61,60,60,60,61,62,62,61,61,60,61,60,60,60,62,61,60,61,61,62,61,60,60,61,60,61,60,62,62,60,61,61,60,61,60,62,62,61,60,61,62,62,62,60,62,61,62,60,60,62,61,61,60,61,60,60,62,60,60,61,60,61,60,62,61,60,61,61,60,62,60,61,62,61,60,61,60,60,62,60,60,62,60,61,62,62,62,62,60,62,62,61,62,61,61,60,62,61,60,62,60,62,60,60,60,61,60,61,61,61,60,60,62,60,62,60,62,60,62,62,62,60,61,61,62,62,60,62,62,61,60,60,60,62,60,60,62,62,60,62,61,62,60,62,61,60,61,61,61,61,62,61,62,62,60,61,61,62,60,62,62,60,62,61,60,60,60,60,60,62,62,60,62,60,61,62,61,61,62,61,62,61,61,62,62,60,61,62,61,62,62,60,62,60,60,61,60,62,60,62,61,60,61,62,61,62,61,61,60,62,60,62,60,62,60,61,61,61,61,62,62,61,61,62,62,62,62,60,61,62,60,62,62,61,62,60,60,62,61,62,61,62,62,61,62,60,61,62,60,62,60,61,61,61,61,60,61,61,60,61,61,61,60,61,61,60,61,62,61,61,60,60,62,60,62,61,62,61,62,61,62,60,62,62,62,62,60,60,60,61,62,60,60,61,61,60,60,60,60,62,62,61,60,61,62,60,62,60,60,61,62,61,60,61,62,62,62,61,62,61,61,62,60,61,60,60,61,60,61,61,60,62,61,62,61,61,60,62,62,62,62,61,61,60,61,61,60,61,60,62,61,60,61,61,62,61,62,62,61,62,62,62,62,61,60,60,62,61,61,61,61,60,60,60,61,61,60,60,61,61,61,61,62,62,61,61,61,61,61,62,60,62,62,62,60,61,61,62,62,60,60,61,61,61,61,60,62,61,62,61,61,62,61,61,60,60,62,61,60,61,60,60,60,62,62,61,62,62,62,61,61,60,60,62,60,61,60,62,61,61,60,61,62,62,61,60,60,60,60,62,61,62,62,61,62,61,62,62,62,60,62,61,62,60,62,60,61,60,60,62,60,60,61], 42, 38),
      20
    )).to.have.members([598]);
  });

  it("Big test two", function() {
    expect(central_pixels(
      new Image([61,60,60,61,60,62,62,60,62,60,62,62,60,60,60,61,60,61,62,62,62,60,62,61,61,60,60,61,60,60,60,61,60,60,60,61,60,60,60,60,60,61,62,60,60,60,61,61,60,62,62,62,60,61,62,61,60,62,60,61,60,60,62,61,60,61,61,61,61,60,60,61,61,60,61,60,60,60,62,61,62,61,60,62,61,60,60,62,60,61,61,62,60,62,60,60,61,60,62,62,61,60,61,61,61,60,62,61,60,62,62,61,60,60,62,62,61,61,62,62,61,62,60,60,60,61,61,60,60,60,62,60,62,62,60,61,62,62,61,61,60,62,61,60,60,60,62,62,60,21,21,21,60,61,60,62,62,62,61,61,62,61,60,62,62,60,61,61,62,60,60,61,60,61,62,62,62,60,60,62,60,60,60,60,60,61,62,61,62,21,21,21,21,21,21,21,21,21,60,61,61,60,60,61,62,62,61,61,62,61,61,62,60,61,60,62,60,61,60,60,61,62,60,60,61,61,61,61,62,62,21,21,21,21,21,21,21,21,21,21,21,21,21,60,62,60,61,62,61,62,62,60,60,60,61,61,61,61,60,60,60,62,61,61,60,61,61,61,62,61,60,62,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,61,61,60,62,61,60,61,60,62,62,62,62,62,61,61,61,60,61,61,60,61,61,61,60,60,62,61,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,61,62,61,62,61,62,62,61,61,61,61,60,60,60,61,60,62,60,61,61,62,62,61,60,61,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,60,60,62,62,61,61,60,60,62,60,62,62,62,61,60,61,61,60,62,60,61,62,62,61,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,61,60,61,60,60,62,61,60,62,62,61,62,62,62,61,62,60,60,60,60,61,60,60,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,60,62,61,62,61,61,62,60,61,60,60,60,61,61,61,61,62,60,60,60,62,62,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,60,61,61,61,62,60,61,60,62,61,60,62,61,60,62,62,61,60,62,62,60,60,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,60,61,61,62,62,60,60,60,60,62,61,62,61,61,60,61,62,61,62,60,61,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,60,62,61,61,61,60,60,62,61,61,62,62,60,61,60,61,60,61,60,62,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,60,62,61,61,60,60,61,60,60,62,61,62,62,62,60,60,62,60,61,62,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,61,61,61,62,60,60,62,60,61,61,62,62,60,60,60,62,60,61,62,60,62,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,61,62,60,61,61,60,62,60,60,62,61,61,62,61,61,61,61,61,62,60,60,62,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,61,62,60,62,61,61,61,60,60,62,60,60,61,60,60,62,61,60,60,62,62,62,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,62,62,61,61,62,60,60,61,60,61,62,62,61,60,61,62,62,60,62,60,60,61,62,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,62,61,62,60,61,62,62,60,62,61,61,60,61,62,62,62,60,60,62,62,60,60,60,61,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,62,60,62,60,62,61,62,62,60,62,61,61,61,62,62,60,61,62,61,61,62,62,60,62,60,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,60,61,61,60,61,60,60,61,61,62,61,61,61,60,61,60,61,61,62,62,60,62,61,62,61,62,60,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,61,61,60,61,62,61,60,62,62,60,60,61,61,62,61,61,62,62,61,61,60,61,62,61,60,62,60,62,60,21,21,21,21,21,21,21,21,21,21,21,21,21,61,60,62,60,61,60,62,61,60,62,62,61,60,62,62,60,60,62,60,62,60,62,62,62,62,61,61,61,62,62,60,60,21,21,21,21,21,21,21,21,21,61,61,61,61,62,62,62,62,61,60,62,60,60,62,60,61,60,61,62,62,61,61,60,62,60,62,61,62,60,60,61,61,61,60,62,61,60,21,21,21,62,61,60,62,60,60,60,62,60,60,60,61,61,62,60,60,60,60,62,60,61,61,60,60,60,61,61,61,61,61,62,60,61,61,60,62,62,61,62,62,61,62,62,61,60,62,60,60,60,62,61,62,60,61,61,61,61,62,60,61,62,61,62,60,60,62,61,62,62,61,60,62,60,62,62,61,61,61,60,61,60,62,61,60,60,60,62,62,61,62,60,62,61,61,60,60,62,62,61,61,62,60,62,61,62,61,60,60,62,61,60,60,60,62,60,62,61,61,60,60,60,62,61,61,60,60,60,60,61,61,60,62,62,60,62,62,62,60,61,62,61,62,60,62,61,62,60,60,60,60,62,61,60,61,61,62,60,61,61,62,61,61,62,62,62,61,61,62,61,61,60,60,61,61,62,60,62,61,61,62,61,62,62,62,62,62,61,62,62,60,61,60,61,60,61,62,61,61,62,61,62,60,60,60,61,60,62,60,61,60,61,61,62,62,60,61,61,60,60,61,62,61,60,62,60,62,60,62,60,61,60,61,60,61,60,61,60,60,60,62,62,60,60,60,62,62,61,60,62,62,61,60,62,60,61,61,62,60,62,62,61,60,60,61,60,60,60,62,61,61,60,62,60,60,62,61,62,60,61,61,62,60,61,62,61,62,60,61,61,62,61,60,60,61,61,61,60,60,60,61,62,60,62,61,61,62,62,61,61,61,62,60,60,60,62,60,60,61,62,60,62,60,60,60,60,60,61,61,62,62,61,61,62,61,60,61,61,62,60,61,62,62,62,60,62,60,61,60,62,61,61,62,62,62,61,60,62,62,62,62,60,60,61,62,62,62,60,61,61,61,62,60,60,60,62,62,61,61,60,60,62,60,62,62,61,62,60,62,62,60,62,60,62,60,60,60,61,60,60,62,60,60,62,61,62,61,60,61,62,62,61,61,62,62,60,61,62,61,61,61,61,61,60,61,61,61,61,60,62,60,62,62,62,60,61,60,61,62,61,60,61,60,61,61,61,60,62,62,60,60,60,62,60,60,62,60,62,61,60,60,60,60,62,60,61,61,62,60,61,62,60,62,61,60,62,62,60,62,61,61,61,61,61,61,62,62,61,60,60,62,60,60,62,60,62,60,61,62,60,61,62,60,60,62,62,60,61,60,62,62,61,62,62,61,61,60,62,62,61,61,60,61,60,60,60,60,60,62,61,62,61,62,61,60,61,60], 43, 38),
      21
    )).to.have.members([623]);
  });

});
