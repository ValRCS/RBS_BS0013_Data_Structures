# Week 11 Lab — Graph Representations

**90 minutes · C++20 · existing Codespace.** Implement both a byte adjacency matrix and an unsorted-vector adjacency list. Complete eight TODOs in `src/graph.cpp`. Do not modify the interface or replace the structures with a graph library.

## Contract
Fixed vertices 0..V−1; directed or undirected; no parallel edges; self-loops allowed; one logical edge counted once. Invalid vertex IDs throw `std::out_of_range`. `neighbors(u)` returns ascending unique vertex IDs. `add_edge`/`remove_edge` report whether the edge set changed.

## Tasks
1. Implement matrix membership, insertion, removal and neighbour scanning.
2. Implement list membership, insertion, removal and sorted neighbour output.
3. Add two meaningful tests, including a directed cycle and an undirected self-loop.
4. Run public tests and sanitizers; complete `reflection.md`.

## Verify
```bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build
ctest --test-dir build --output-on-failure
bash scripts/check-week11.sh
```
The starter builds but fails assertions until TODOs are completed. Do not commit generated build directories.

**Optional:** implement BFS using `std::queue` to compare traversal workloads; not required for the 90-minute core.
