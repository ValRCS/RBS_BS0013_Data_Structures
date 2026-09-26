# Week 5 Student Instructions — Circular Queue

## 1. Update your fork

Before starting Week 5, save your existing work and update your fork.

```bash
git status
git switch main
git remote -v
```

If no `upstream` remote exists yet, add the official public course repository once:

```bash
git remote add upstream https://github.com/ValRCS/RBS_BS0013_Data_Structures.git
```

Then update your branch:

```bash
git fetch upstream
git merge upstream/main
git push origin main
```

If you have uncommitted local changes, commit or stash them before merging.

## 2. Open the Week 5 lab

```bash
cd labs/week05
```

Configure and build:

```bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build
```

The starter implementation compiles, but operations marked TODO throw `std::logic_error` until you implement them.

## 3. Recommended implementation order

Work in `src/int_circular_queue.cpp`.

1. Read the fields in `include/int_circular_queue.hpp`.
2. Implement `check_invariant()`.
3. Implement `physical_index()`.
4. Implement both `front()` overloads.
5. Implement both `back()` overloads.
6. Implement `enqueue()`.
7. Implement `dequeue()`.
8. Implement `clear()`.
9. Run the public tests after each small group of changes.

Do **not** implement dequeue by shifting all remaining elements. The purpose of the lab is to avoid that Θ(n) work.

## 4. Run the public tests

```bash
cmake --build build
ctest --test-dir build --output-on-failure
```

For a complete verification pass, including sanitizers:

```bash
bash scripts/check-week05.sh
```

## 5. Required conceptual check

Before submitting, be able to explain:

```cpp
(front_ + logical_index) % capacity()
```

using a queue state that wraps across the end of the physical array.

You should also be able to distinguish:

- logical queue order from physical storage order;
- Θ(1) worst-case enqueue in this fixed-capacity queue;
- amortized Θ(1) enqueue in a resizable circular queue.

## 6. Commit your work

From the repository root:

```bash
git status
git add labs/week05
git commit -m "Complete week 05 circular queue lab"
git push origin main
```

## 7. Moodle submission

Submit:

- your forked repository URL;
- the files you changed;
- what you implemented and tested;
- any blockers or unresolved questions;
- your answers from `reflection.md`.

Do not submit only screenshots. Your repository should contain the completed work.
