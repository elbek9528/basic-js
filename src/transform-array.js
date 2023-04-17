const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
const DISCARD_NEXT = '--discard-next';
const DISCARD_PREV = '--discard-prev';
const DOUBLE_NEXT = '--double-next';
const DOUBLE_PREV = '--double-prev';  

function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  const transformedArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === DISCARD_NEXT) {
      i++;
    } else if (arr[i] === DISCARD_PREV) {
      if (i !== 0 && arr[i - 2] !== DISCARD_NEXT) {
        transformedArr.pop();
      }
    } else if (arr[i] === DOUBLE_NEXT) {
      if (i !== arr.length - 1) {
        transformedArr.push(arr[i + 1]);
      }
    } else if (arr[i] === DOUBLE_PREV) {
      if (i !== 0 && arr[i - 2] !== DISCARD_NEXT) {
        transformedArr.push(arr[i - 1]);
      }
    } else {
      transformedArr.push(arr[i]);
    }
  }

  return transformedArr;
}
  //throw new NotImplementedError('Not implemented');
  // remove line with error and write your code here


module.exports = {
  transform
};
