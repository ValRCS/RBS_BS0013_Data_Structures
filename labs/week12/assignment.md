# Week 12 Lab — Prefix Dictionary (Trie)
**90 minutes · C++20 · existing Codespace.** Implement a lowercase ASCII trie in `src/trie.cpp`. Complete seven TODOs. Keep the interface and node ownership model unchanged.

## Contract
Keys are nonempty strings of lowercase `a`–`z`; inserting an empty key or invalid characters throws `std::invalid_argument`. For nonempty query strings, invalid characters also throw. `contains("")` and `erase("")` return false. Empty prefix is valid and `starts_with("")` returns true. Duplicate insertion returns false. Erasing a missing key returns false. `complete(prefix)` returns all matching keys, sorted lexicographically. `size()` counts distinct complete keys, not nodes. Invalid keys must never partially modify the trie.

## Core tasks
1. Implement insertion and exact lookup, preserving shared paths and terminal markers.
2. Implement prefix existence and lexicographically ordered completion.
3. Implement deletion with safe pruning, retaining shared prefixes.
4. Add two additional tests, including deletion of a key that prefixes another.
5. Run the public tests and complete `reflection.md`.

## Verify
```bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build
ctest --test-dir build --output-on-failure
bash scripts/check-week12.sh
```
Starter compiles but fails assertions until TODOs are implemented. Optional: compare dense 26-slot nodes with a sparse map-based representation; report node allocation and memory estimates. Do not implement radix compression as a core requirement.
