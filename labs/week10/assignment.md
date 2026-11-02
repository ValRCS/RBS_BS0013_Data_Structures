# Week 10 Lab — AVL Insertion Repair

**Time:** approximately 90 minutes of practical work in C++20. Building on Week 9, preserve BST order while guaranteeing logarithmic AVL height. This lab focuses on *new* work, not rewriting search, traversal, or destructor code.

## Your five TODOs in src/int_avl.cpp

1. `refresh(Node*)`: update cached subtree height using the node-count convention (empty 0, leaf 1).
2. `rotate_left(Node*&)`: preserve pivot's middle subtree, rewire both child links, refresh old root then pivot, replace owning link.
3. `rotate_right(Node*&)`: mirror the left rotation.
4. `rebalance(Node*&)`: distinguish LL, RR, LR, RL; apply child pre-rotation in inside cases.
5. `validate(...)`: finish the supplied recursive global BST/size traversal, checking **actual** versus cached height and absolute balance factor no greater than one at every node.

`insert_at` is already implemented and calls `refresh` and `rebalance` during recursive unwind. Do not replace it; duplicate insertion returns false without increasing size.

## Verification

~~~bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build
ctest --test-dir build --output-on-failure
bash scripts/check-week10.sh
~~~

The starter compiles but initially fails. Public tests exercise the four three-key insertion cases, sorted insertion, duplicates, extreme integer keys and randomized comparison with `std::set<int>`. Add **two additional meaningful tests**, including one longer insertion sequence with nonempty middle subtrees. Run ordinary and sanitizer builds; submit your source, tests and `reflection.md` according to Moodle instructions.

**Extension:** AVL deletion and its possible multiple ancestor repairs, or linear-time balanced construction from sorted unique keys.
