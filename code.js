let Parallel = require('paralleljs');

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

// Helper function for recursive parallel merge sort
function parallelMergeSort(arr) {
  if (arr.length <= 1) {
    return Promise.resolve(arr);
  }

  let mid = Math.floor(arr.length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);

  // Run recursive sort in parallel using Parallel.js
  let leftPromise = new Parallel(left).require(parallelMergeSort, merge).spawn(function(data) {
    return parallelMergeSort(data);
  });

  let rightPromise = new Parallel(right).require(parallelMergeSort, merge).spawn(function(data) {
    return parallelMergeSort(data);
  });

  return Promise.all([leftPromise, rightPromise])
    .then(([sortedLeft, sortedRight]) => {
      return merge(sortedLeft, sortedRight);
    });
}

global.parallelMergeSort = parallelMergeSort;
