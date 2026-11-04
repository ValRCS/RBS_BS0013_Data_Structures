# Week 11 — Graph Representations

**BS0013 Data Structures · RBS / RTU · Fall 2026**

Week 10 maintained strict BST order and AVL height constraints in a rooted hierarchy. A graph generalizes relationships: vertices may have many neighbours, cycles, and no root. The **graph ADT** is independent of its representation.

## Learning outcomes
1. Model directed/undirected graphs with explicit vertex and edge contracts.
2. Derive edge-list, adjacency-matrix and adjacency-list representations from the same diagram.
3. Implement fixed-vertex, unweighted simple graphs in C++20.
4. Explain storage and operation bounds under stated representation assumptions.
5. Check invariants and compare sparse/dense workloads without confusing empirical timing with asymptotic guarantees.

## ADT contract
Vertices are integers `0..V-1`. The required lab has a fixed vertex set and no parallel edges. Self-loops are allowed and counted as one edge. Directed graphs store ordered pairs; undirected graphs store unordered pairs and require symmetric representation. `add_edge` returns true only for a newly inserted edge; `remove_edge` returns true only if an edge existed. Invalid vertex IDs throw `std::out_of_range`. `neighbors(u)` returns **ascending vertex IDs** for deterministic comparison; output sorting may affect its time complexity. `edge_count` counts logical edges, not stored adjacency entries.

## Worked graph
Directed edges: (0,1), (0,3), (1,2), (2,0). Adjacency lists:
```text
0: [1,3]
1: [2]
2: [0]
3: []
```
Adjacency matrix (rows are sources, columns are destinations):
```text
    0 1 2 3
0 | 0 1 0 1
1 | 0 0 1 0
2 | 1 0 0 0
3 | 0 0 0 0
```
The cycle 0→1→2→0 means a traversal must track visited vertices. A directed matrix is not necessarily symmetric.

## Representations
- Edge list: vector of (u,v) pairs; Θ(E) edge storage plus vertex metadata. Lookup typically O(E) without an index.
- Matrix: V×V booleans or bytes, Θ(V²) memory, O(1) edge membership/insertion/removal, Θ(V) scanning neighbours. A byte matrix is not a bit-packed matrix.
- Adjacency list: vector of vectors, Θ(V+E) storage for directed graphs (Θ(V+2E) adjacency entries for undirected nonloop edges). Membership and duplicate-safe insertion in an **unsorted** vector cost O(deg(u)); removal also O(deg(u)). Enumerating stored neighbours is Θ(deg(u)) before output normalization.

## Crucial interface trade-off
The teaching API returns neighbours in ascending order. The implementation uses unsorted vectors internally and sorts the returned copy, so **`neighbors(u)` costs O(deg(u) log deg(u))** for the list and Θ(V) for the matrix (ignoring output allocation); for degree zero/one the sort is constant. This deliberately distinguishes the cost of visiting adjacency entries from the cost of a deterministic sorted interface. Inserting into an unsorted vector after a duplicate scan is O(deg(u)); removing by swap-with-last is O(deg(u)) and changes internal order without affecting semantics.

## Invariants and edge cases
- Matrix dimensions V×V; every entry represents exactly one possible directed edge; undirected matrix symmetric.
- Lists have exactly V buckets; each neighbour is valid; no duplicates; undirected non-loop edge appears in both lists.
- A self-loop appears once in the list of its vertex; in an undirected graph its degree contributes two under standard graph-theoretic degree, although `neighbors` lists the vertex once.
- Edge count is the number of distinct logical edges, independent of representation.
- Empty graph, isolated vertices, duplicate insertion, missing removal, self-loops, out-of-range IDs and cycles must be tested.

## Complexity table
| Operation | Byte matrix | Unsorted vector adjacency list |
|---|---|---|
| Has edge | O(1) | O(deg(u)) |
| Add distinct edge (checking duplicate) | O(1) | O(deg(u)) |
| Remove edge | O(1) | O(deg(u)) |
| Enumerate raw adjacency | Θ(V) | Θ(deg(u)) |
| Return sorted neighbours (this API) | Θ(V) | O(deg(u) log deg(u)) |
| Storage | Θ(V²) | Θ(V+E) |

For undirected graphs, insertions/removals touch both endpoints (except self-loops). Fixed vertex count avoids matrix resizing. Dynamic matrix vertex insertion would require Θ(V²) reallocation/copying in a flat representation.

## Workload comparison
For sparse graphs E=O(V), lists usually save memory and speed up raw neighbour iteration. For dense graphs E=Θ(V²), matrices offer compact contiguous byte storage and constant-time membership, though bit-packing can improve memory further. Cache locality, allocator overhead, and degree distributions affect measurements. A benchmark measures a particular machine and input, not an asymptotic proof.

## Traversal as workload
Breadth-first search uses a queue and visited flags, taking Θ(V+E) over adjacency lists and Θ(V²) over matrices when scanning every row. BFS is an **optional extension** here; Week 11 is about representation, not shortest-path algorithms.

## Transition
Week 12 specializes graph-like branching into prefix tries, where edge labels and string-prefix operations determine representation choices.

## References
- Open Data Structures, Graphs: https://opendatastructures.org/ods-cpp/12_Graphs.html
- cppreference, std::vector: https://en.cppreference.com/w/cpp/container/vector.html
- cppreference, std::out_of_range: https://en.cppreference.com/w/cpp/error/out_of_range.html
