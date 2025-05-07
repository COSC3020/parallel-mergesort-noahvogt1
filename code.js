const Parallel = require('paralleljs');

function merge(left, right) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function parallelMergeSort(arr) {
  if (arr.length <= 1) {
    return Promise.resolve(arr);
  }

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  const leftSort = new Parallel(left).require(merge, mergeSort).spawn(subArr => mergeSort(subArr));

  const rightSort = new Parallel(right).require(merge, mergeSort).spawn(subArr => mergeSort(subArr));

  return Promise.all([leftSort, rightSort])
    .then(([leftSorted, rightSorted]) => merge(leftSorted, rightSorted));
}
