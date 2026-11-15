# Week 13 Lab — Page-Oriented Search Index (B-tree)

**90 minutes · C++20 · existing GitHub Codespace**

## Goal

Implement an ordered-set B-tree using multi-key nodes and unique ownership. The theme is how a wider branching factor reduces **logical node visits**. This is an **in-memory teaching model**: there is no disk persistence, buffer pool, or B+ tree implementation.

## Contract

- `BTree(t)` takes minimum degree `t >= 2`; smaller degrees throw `std::invalid_argument`.
- Each node contains at most `2t−1` sorted unique integer keys. Each nonroot node contains at least `t−1` keys. The root has special occupancy rules.
- An internal node with `k` keys has precisely `k+1` children covering the open separator-key intervals. All leaves occur at the same depth.
- `insert(key)` returns true only when a new key is inserted. Duplicates return false without changing the tree or its size. Negative keys are valid.
- `contains(key)` tests membership; `size()` counts distinct keys.
- `height()` counts levels (empty tree = 0). `page_visits(key)` counts logical nodes inspected, not actual physical disk reads.
- `keys_in_order()` and `invariants_hold()` are provided diagnostic helpers.

## Four implementation TODOs

Work in `src/btree.cpp`. The project already compiles, but tests fail until core behavior is implemented.

1. **TODO 1 — contains:** search sorted keys within the current node, and follow the correct child when no key matches.
2. **TODO 2 — split_child:** split a full child (exactly `2t−1` keys). Promote the key at index `t−1`; retain `t−1` keys in the original node; create a right sibling for the remaining `t−1` keys. If internal, move exactly `t` child pointers into the new sibling, preserving ownership.
3. **TODO 3 — insert_non_full:** insert at the correct sorted leaf position, or split a full child **before** descending, then choose the appropriate side of the promoted separator.
4. **TODO 4 — insert:** reject duplicates first; when root is full, create a new root and split; complete insertion; increment the distinct-key count exactly once.

Do not implement deletion, persistence, or full B+ tree functionality.

## Worked trace

For `t=2`, insert 10, 20, 5 to produce root `[5 | 10 | 20]`. Inserting 6 requires first splitting the full root. Promote 10, create two children `[5]` and `[20]`, then insert 6 into the left child. Result: root `[10]` and children `[5 | 6]` and `[20]`.

## Build and verify

Run from `labs/week13/`:

~~~bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build
ctest --test-dir build --output-on-failure
bash scripts/check-week13.sh
~~~

Make at least two additional assertions in `tests/test_btree.cpp`, covering duplicate behavior and a structural split or invariant. Run tests after each step. Then fill out `reflection.md`.

**Optional extension:** insert the same 100 distinct keys with `t=2` and `t=8`; compare tree height and the maximum observed logical `page_visits`. Explain why real I/O and CPU comparison time may not follow identical trends.

## Submission

Commit your changes to your fork, push to GitHub, and submit via the course Moodle process. If using a fork created early in the semester, read `instructions.md` to update safely.
