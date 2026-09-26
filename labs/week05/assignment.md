# Week 5 Practical — Build and Test a Circular Queue

**BS0013 Data Structures**  
Riga Business School, Riga Technical University

## Purpose

Weeks 3 and 4 gave us two general sequence representations:

```text
contiguous dynamic array: [A][B][C][D]
linked sequence:          A -> B -> C -> D -> null
```

Week 5 changes the abstraction level. A stack, queue, or deque does not promise arbitrary access to every position. Each ADT deliberately restricts which ends of the sequence may be used.

The central practical question is:

> If a queue only needs FIFO access, how can contiguous storage support enqueue and dequeue without shifting existing elements?

You will implement and test a fixed-capacity circular queue of integers.

## Learning outcomes

By the end of the practical, you should be able to:

- distinguish queue ADT behavior from circular-array representation details;
- trace logical queue order separately from physical array positions;
- maintain the invariant involving `front_`, `size_`, and capacity;
- implement `enqueue`, `dequeue`, `front`, `back`, and `clear`;
- test empty, one-element, full, and wrap-around states;
- justify the worst-case Θ(1) cost of the fixed-capacity operations;
- compare a circular-array queue with linked and shifting-array queues.

## Representation

The starter code defines `IntCircularQueue` with these representation fields:

```cpp
std::vector<int> data_;
std::size_t front_ = 0;
std::size_t size_ = 0;
```

There is deliberately **no stored back index**. It can be derived.

## Core invariant

```text
capacity > 0
0 <= size_ <= capacity
0 <= front_ < capacity
```

Logical queue element `i`, for `0 <= i < size_`, is stored at:

```text
(front_ + i) % capacity
```

Therefore:

```text
empty <=> size_ == 0
full  <=> size_ == capacity
```

An empty queue does not necessarily have `front_ == 0` after ordinary dequeues. In this lab, `clear()` explicitly restores the canonical empty state `front_ == 0`.

## Manual trace before coding

Use:

```text
capacity = 5
front = 0
size = 0
```

Trace:

```text
enqueue 10
enqueue 20
enqueue 30
dequeue
dequeue
enqueue 40
enqueue 50
enqueue 60
enqueue 70
```

After each operation record:

```text
front
size
physical occupied indices
logical queue order
```

You should reach a wrapped state where logical order crosses the physical end of the array.

## Implementation tasks

### 1. `check_invariant()`

Use assertions to verify at least:

- backing storage is non-empty;
- `front_` is a valid physical index;
- `size_` does not exceed capacity.

### 2. `physical_index(logical_index)`

Precondition:

```text
logical_index < size_
```

Return:

```text
(front_ + logical_index) % capacity()
```

### 3. `front()` and `back()`

Both require a non-empty queue.

- `front()` uses `front_` directly.
- `back()` refers to logical element `size_ - 1`.

Implement const and non-const overloads.

### 4. `enqueue(value)`

Precondition:

```text
!full()
```

Insertion position:

```text
(front_ + size_) % capacity()
```

Store the value, increase `size_`, then verify the invariant.

### 5. `dequeue()`

Precondition:

```text
!empty()
```

Update:

```text
front_ = (front_ + 1) % capacity()
--size_
```

Do not shift elements.

### 6. `clear()`

After clearing:

```text
size_ == 0
front_ == 0
capacity unchanged
```

For this integer teaching implementation, `clear()` is Θ(1).

## Required tests

The public test suite checks:

1. empty construction;
2. one-element transitions;
3. full state;
4. dequeue without shifting;
5. enqueue after dequeue;
6. wrap-around order;
7. return to empty after wrapped removals;
8. clearing and reuse.

A circular queue has not been meaningfully tested until the logical sequence wraps around physical index 0.

## Representation comparison

| Queue representation | Enqueue | Dequeue | Main advantage | Main cost |
|---|---:|---:|---|---|
| vector + erase at front | amortized Θ(1) append | Θ(n) | simple | shifts elements |
| linked queue with head + tail | Θ(1) | Θ(1) | flexible capacity | allocations, pointers, weak locality |
| fixed circular array | Θ(1) worst case | Θ(1) worst case | compact, no shifting, good locality | fixed capacity |
| resizable circular array | amortized Θ(1) | Θ(1) | flexible capacity | occasional Θ(n) relocation |

Complete the questions in `reflection.md` before submission.
