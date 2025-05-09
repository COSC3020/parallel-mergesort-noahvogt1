const fs = require('fs');
const jsc = require('jsverify');

eval(fs.readFileSync('code.js') + ''); // Assumes parallelMergeSort is defined in code.js

const testSort = jsc.forall("array nat", function(arr) {
    var a1 = JSON.parse(JSON.stringify(arr));
    var a2 = JSON.parse(JSON.stringify(arr));

    return parallelMergeSort(a1).then(sorted => {
        return JSON.stringify(sorted) === JSON.stringify(a2.sort(function(a, b) { return a - b; }));
    });
});

jsc.assert(testSort);
