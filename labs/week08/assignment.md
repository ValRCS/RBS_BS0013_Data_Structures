# Week 8 Practical — Build a Binary Heap

**BS0013 Data Structures**  
Riga Business School, Riga Technical University

## Goal

Implement a max-oriented **binary heap** backed by `std::vector` and use it as a priority queue.

The main conceptual step is that the representation is physically linear but logically hierarchical:

```text
array index:   0   1   2   3   4   5   6
value:        90  70  80  20  40  50  60

                 90
              /      \
            70        80
           /  \      /  \
         20   40    50   60
```

For zero-based indexing:

```text
parent(i) = (i - 1) / 2       for i > 0
left(i)   = 2 * i + 1
right(i)  = 2 * i + 2
```

The two invariants are:

1. **shape invariant** — the logical tree is complete because the live elements occupy vector indices `0..size-1`;
2. **heap-order invariant** — no child has greater priority than its parent.

For this lab, greater values mean greater priority.

---

## Expected duration

Approximately **two academic hours (90 minutes)**.

Suggested pacing:

| Time | Activity |
|---:|---|
| 0–10 min | Draw array/tree correspondence and index formulas |
| 10–25 min | Implement index helpers and invariant checker |
| 25–45 min | Implement `push()` + sift-up and trace one insertion |
| 45–65 min | Implement `pop()` + sift-down and trace one removal |
| 65–75 min | Implement bottom-up `heapify()` constructor |
| 75–83 min | Add student tests and run sanitizer build |
| 83–88 min | Compare with `std::priority_queue` |
| 88–90 min | Complete reflection and commit work |

---

## Starter interface

Open `include/binary_heap.hpp`.

The starter provides this public interface:

```cpp
template <typename T>
class BinaryHeap {
public:
    BinaryHeap();
    explicit BinaryHeap(std::vector<T> values);

    bool empty() const;
    std::size_t size() const;
    const T& top() const;

    void push(const T& value);
    void pop();

    bool check_invariant() const;
    const std::vector<T>& storage() const;
};
```

Do **not** replace the implementation with `std::priority_queue`. The point is to implement the representation that a priority queue can use.

---

# Task 1 — Index navigation

Implement the private helpers:

```cpp
parent(i)
left(i)
right(i)
```

Before coding, fill in the following table for a heap containing at least 10 elements:

| `i` | parent | left child | right child |
|---:|---:|---:|---:|
| 0 | — | ? | ? |
| 1 | ? | ? | ? |
| 2 | ? | ? | ? |
| 3 | ? | ? | ? |

Questions:

1. Why is `parent(0)` not a meaningful operation?
2. Which indices can contain leaves?
3. Why does contiguous storage automatically preserve the complete-tree shape?

---

# Task 2 — Check the heap invariant

Implement:

```cpp
bool check_invariant() const;
```

For every non-root element at index `i`, compare it with its parent.

A valid max-heap must satisfy:

```text
parent value >= child value
```

Examples:

```text
[90, 70, 80, 20, 40, 50, 60]   valid
[90, 95, 80, 20, 40, 50, 60]   invalid
```

Do not try to prove that the whole vector is sorted. A heap is **not** a sorted array and is **not** a binary search tree.

---

# Task 3 — `top()`

Implement:

```cpp
const T& top() const;
```

Requirements:

- return the root element at index `0`;
- throw `std::out_of_range` when the heap is empty;
- do not scan the vector.

State its time and auxiliary-space complexity.

---

# Task 4 — Insert with sift-up

Implement:

```cpp
void push(const T& value);
```

Algorithm:

1. append the new value at the end of the vector;
2. while it has greater priority than its parent, swap it upward;
3. stop when the parent has at least as much priority or the value reaches the root.

Trace this insertion by hand before testing code:

```text
before: [90, 70, 80, 20, 40, 50, 60]
push 85
```

Record each array state after a swap.

### Complexity precision

The **heap repair** visits at most one root-to-leaf path, so sift-up is `O(log n)`.

Because this implementation uses `std::vector`, a particular append may occasionally reallocate and move `Θ(n)` elements. Geometric vector growth makes append amortized `O(1)`, but that does not change the heap's `O(log n)` structural repair bound.

---

# Task 5 — Remove the maximum with sift-down

Implement:

```cpp
void pop();
```

Requirements:

- throw `std::out_of_range` when empty;
- replace the root with the final vector element;
- remove the final vector element;
- repeatedly swap the replacement with the higher-priority child until the heap invariant is restored;
- when both children exist, choose the larger child;
- handle the one-child case correctly.

Trace one removal from:

```text
[90, 70, 80, 20, 40, 50, 60]
```

Do not shift every element left. That would destroy the intended complexity.

---

# Task 6 — Bottom-up heap construction

The constructor:

```cpp
explicit BinaryHeap(std::vector<T> values);
```

receives arbitrary values. Implement `heapify()` so it converts them to a valid heap.

Use **bottom-up heapify**:

1. leaves already satisfy the heap invariant;
2. start at the last internal node;
3. call sift-down while moving toward the root.

Do not implement this constructor by repeatedly calling `push()` unless you are doing so only as an experiment. Repeated insertion costs `O(n log n)` in the usual bound; bottom-up heapify is `Θ(n)`.

---

# Task 7 — Tests

The supplied tests are examples, not the complete specification.

Add at least **two independent tests** of your own. Good targets include:

- duplicate priorities;
- negative integer values;
- a heap whose final internal node has only a left child;
- repeated `pop()` until empty;
- alternating `push()` and `pop()`;
- building from arbitrary input and checking the invariant after every removal.

A useful property test for a max-heap is:

```text
repeated top + pop produces a non-increasing sequence
```

Run the sanitizer build before finishing.

---

# Task 8 — Compare with `std::priority_queue`

Write a short comparison in `reflection.md`.

Address:

- which ADT operations both structures provide;
- which representation detail your custom heap exposes that `std::priority_queue` hides;
- why production code normally uses the standard-library adaptor;
- why implementing the heap yourself was still useful here.

Optional: investigate how `std::priority_queue` uses a comparator to create min-oriented or custom-priority queues.

---

## Core completion checklist

- [ ] index helpers are correct;
- [ ] `top()` handles empty/non-empty heaps;
- [ ] `push()` restores the invariant with sift-up;
- [ ] `pop()` restores the invariant with sift-down;
- [ ] constructor heapifies arbitrary input;
- [ ] `check_invariant()` detects violations;
- [ ] supplied tests pass;
- [ ] two additional tests are added;
- [ ] sanitizer build passes;
- [ ] `reflection.md` is completed;
- [ ] you can explain why heap updates follow a path of height `Θ(log n)`.

## Extensions

1. Add a comparator template parameter so the same class supports min-heaps.
2. Count comparisons during `push`, `pop`, and bottom-up heapify.
3. Compare repeated insertion with bottom-up heapify on increasing input sizes.
4. Add `replace_top(value)` and reason about its complexity.
5. Investigate whether arbitrary-key search is efficient in a binary heap and explain why.
