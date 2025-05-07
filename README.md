# Parallel Mergesort
I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.

I used chatGPT on this assignment in a couple different spots. I used it to help me with the return of the promises and then I had it help me retrofit the mergesort test code that you provided into something that this can effectivly use. I got most of the way but was having a slight issue consuming the promise that is returned. I also had help from the TA in which we decided that we couldn't fully parallelize this using paralleljs because the .spawn will not recognize the functions parallelMergesort or merge that are in the scope of code.js. I attempted to get around this by passing the file that contained the two functions in hopes that it would work; however, I found it is impossible(literally).

Implement a parallel version of mergesort (both the original recursive and the
iterative in-place version from a previous exercise are fine). You may use any
parallelization framework or method.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

## Runtime Analysis

What is the span of the parallel program, in terms of worst-case $\Theta$?

The span of my parallel program is $\Theta(n)$. This is because DAG of the program
is determined in the merging part of the program which my implimentation of the program
has a sequential merge step meaning the span is $\Theta(n)$ because the widest merge
will still go over n elements.
