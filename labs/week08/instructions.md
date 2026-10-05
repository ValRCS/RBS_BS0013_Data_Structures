# Week 8 Lab Instructions

## Start in Codespaces

The repository-wide devcontainer already provides C++20, CMake, and a 2-core environment.

From the repository root:

```bash
cd labs/week08
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build
ctest --test-dir build --output-on-failure
```

The initial starter is designed to compile, but several tests will fail until you implement the TODOs in `include/binary_heap.hpp`.

## Recommended workflow

For each operation:

```text
predict the tree state
        ↓
draw/trace the array indices
        ↓
implement one TODO
        ↓
build
        ↓
run tests
        ↓
check the invariant
```

Do not begin by rewriting the whole class.

## Sanitizer verification

```bash
cmake -S . -B build-sanitize -DCMAKE_BUILD_TYPE=Debug -DENABLE_SANITIZERS=ON
cmake --build build-sanitize
ctest --test-dir build-sanitize --output-on-failure
```

Or run the convenience script after your implementation is complete:

```bash
bash scripts/check-week08.sh
```

## What you may change

You should normally change:

- `include/binary_heap.hpp`;
- `tests/test_binary_heap.cpp` to add your own tests;
- `reflection.md`.

Do not replace the class with `std::priority_queue` and do not remove public tests.

## Before submission

Check:

```bash
git status
```

Do not commit `build/`, `build-sanitize/`, executables, or editor-generated files.

Be prepared to explain:

- the array/tree index relationship;
- the two heap invariants;
- why sift-up/down are logarithmic in the logical tree height;
- why bottom-up heapify is better than repeated insertion for bulk construction;
- why `top()` is constant time but arbitrary-value search is not.
