# Week 9 — Binary Search Trees (C++20)

Implement an explicitly linked unique-key integer BST: search, insertion, inorder traversal, height, global-invariant validation and all deletion cases. The provided destructor frees nodes, and copy/move are disabled.

~~~bash
cd labs/week09
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build
ctest --test-dir build --output-on-failure
# when finished
bash scripts/check-week09.sh
~~~

Read assignment.md and instructions.md; implement src/int_bst.cpp, extend tests/test_int_bst.cpp and complete reflection.md. The starter builds but TODO operations make tests fail until completed. Use your course fork and Codespaces.
