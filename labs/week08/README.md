# Week 8 Lab — Binary Heap and Priority Queue

Implement a max-oriented `BinaryHeap` backed by `std::vector`.

The lab focuses on the relationship between a complete binary tree and its contiguous array representation, plus the two repair operations:

```text
push -> sift up
pop  -> sift down
```

## Build and test

From the repository root:

```bash
cd labs/week08
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build
ctest --test-dir build --output-on-failure
```

The initial starter **compiles** but tests fail until students implement the TODOs in **`src/binary_heap.cpp`**. The supplied `include/binary_heap.hpp` declares the class and normally does not need editing. This lab uses integer priorities to keep declarations and definitions separate, consistent with earlier weeks.

After completing the lab:

```bash
bash scripts/check-week08.sh
```

This runs both a normal Debug build and a sanitizer build.

## Main files

```text
assignment.md
instructions.md
reflection.md
include/binary_heap.hpp       interface
src/binary_heap.cpp           TODO implementation
tests/test_binary_heap.cpp
scripts/check-week08.sh
```

Do not replace the implementation with `std::priority_queue`; comparing your finished heap with the standard adaptor is part of the reflection.
