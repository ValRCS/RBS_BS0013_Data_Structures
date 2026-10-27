# Week 9 — Codespaces Student Instructions

Use the existing C++20 / two-core course Codespace. Fork or update the official public student repository before beginning.

From the repository root:

~~~bash
cd labs/week09
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build
ctest --test-dir build --output-on-failure
~~~

The initial starter **builds** but the tests fail intentionally until you implement the TODOs in src/int_bst.cpp. Work incrementally: trace pointer changes, implement one helper, recompile, test, then check the BST invariant.

After completing your implementation:

~~~bash
bash scripts/check-week09.sh
~~~

This runs ordinary and sanitizer builds. The script expects Linux GCC/Clang (Codespaces); other development environments are permitted but not supported by the course.

Change src/int_bst.cpp, add tests to tests/test_int_bst.cpp, and write answers in reflection.md. Do not remove the provided destructor, bypass tests, substitute std::set for the implementation, or commit build/ and build-sanitize/ directories.

~~~bash
git status
git add labs/week09/src/int_bst.cpp labs/week09/tests/test_int_bst.cpp labs/week09/reflection.md
git commit -m "Complete Week 9 BST lab"
~~~
