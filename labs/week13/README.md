# Week 13 — B-tree page-oriented search index

**Student practical · C++20 · approximately 90 minutes.**

Start with [assignment.md](assignment.md) and read [instructions.md](instructions.md) before entering a Codespace opened from an old fork.

Work in `src/btree.cpp` (four TODOs). The starter compiles but its functional tests **intentionally fail** until implementation is finished.

~~~bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build
ctest --test-dir build --output-on-failure
~~~

Complete the [reflection](reflection.md) and commit your source and test changes in your own fork. The exercise simulates B-tree pages in RAM; it does **not** measure physical disk I/O.
