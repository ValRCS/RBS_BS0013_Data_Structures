# Week 5 Reflection — Circular Queue

Answer briefly after your implementation works.

1. Why is `enqueue` Θ(1) **worst case** in this fixed-capacity queue?
2. Why is `dequeue` Θ(1) worst case?
3. Why would a dynamically growing circular queue normally describe enqueue as **amortized Θ(1)** instead?
4. In the expression `(front_ + i) % capacity()`, what does `i` mean: a physical index or a logical position?
5. Why can the physical array still contain an old integer after `dequeue()` without that value remaining part of the logical queue?
6. Give one practical advantage of a circular array over a linked queue.
7. Give one practical limitation of this fixed-capacity circular queue.
8. Which of these statements belongs to the **queue ADT**, and which belongs only to our **representation**?
   - first inserted remaining element is removed first;
   - storage is a `std::vector<int>`;
   - elements may wrap around index 0;
   - `front()` returns the next element to be removed.
