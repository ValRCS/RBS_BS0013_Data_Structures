# Week 8 Reflection — Heap and Priority Queue

Answer concisely after your implementation passes the tests.

1. **Representation.** How can a `std::vector` represent a complete binary tree without storing child pointers?

2. **Invariant.** State the shape invariant and heap-order invariant separately. Why does satisfying the heap-order invariant not make the whole vector sorted?

3. **Complexity.** Explain why sift-up and sift-down inspect at most `Θ(log n)` tree levels. Also state the vector-reallocation qualification for an individual `push()`.

4. **Heapify.** Why can bottom-up heap construction run in `Θ(n)` even though one sift-down can cost `O(log n)`?

5. **Library comparison.** Give one reason to use `std::priority_queue` in production code and one reason implementing `BinaryHeap<T>` is pedagogically useful.
