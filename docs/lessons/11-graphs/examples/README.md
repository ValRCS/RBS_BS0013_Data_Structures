# Week 11 — supplementary C++20 demonstrations

These are independent examples used by the collapsed implementation notes on the website. They are not the assessed graph classes or completed lab TODOs. All examples use the small dense vertex-ID graphs described in the lesson; where stated, validity of adjacency IDs is a precondition.

Compile a single program from this directory:

```sh
g++ -std=c++20 -Wall -Wextra -Wpedantic -O0 -g bfs.cpp -o /tmp/bs0013-bfs
/tmp/bs0013-bfs
```

The programs contain assertions, so do not define NDEBUG while learning/testing. Use a local C++20 compiler or existing Codespace; GitHub Pages serves source, not a C++ execution environment.

| Source | Demonstrates |
|---|---|
| representations.cpp | Three preconstructed representations of the lecture graph |
| memory-layout.cpp | size, capacity and illustrative reserved bytes |
| bfs.cpp | FIFO, distances, parents, reachable path |
| dfs.cpp | Recursive vs explicit frames, entry and exit timestamps |
| weighted-graphs.cpp | Named edge records and optional matrix cells |
| dijkstra-heap.cpp | Lazy min-heap, stale entries, nonnegative weights |
| dijkstra-linear.cpp | Linear selection and matrix row scans |
| components.cpp | Undirected connected components |
| cycle-detection.cpp | Directed and undirected cycles, including a self-loop |
| topological-sort.cpp | Kahn's queue, indegrees and cycle rejection |
| csr.cpp | Contiguous neighbor storage with offsets |

The two Dijkstra examples produce distances 0, 3, 2, 3, INF on the default interactive example. BFS uses the lecture graph plus one isolated vertex. Memory-layout output is implementation dependent. DFS recursion is intended only for small graphs; use explicit frames when stack depth may be large.

The formal 90-minute lab remains at [labs/week11](https://github.com/ValRCS/RBS_BS0013_Data_Structures/tree/main/labs/week11).
