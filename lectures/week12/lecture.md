# Week 12 — Tries and String-Oriented Structures
**BS0013 · RBS / RTU · Fall 2026**
## Learning outcomes
- Represent a string dictionary as a prefix tree and distinguish complete keys from prefixes.
- Trace insert, lookup, prefix enumeration, and deletion with pruning.
- Establish node ownership and invariants in C++20.
- Analyze operation costs using key length L, alphabet size A, and output size.
- Compare dense arrays, sparse child maps, and path-compressed radix tries.

## From graphs to tries
Week 11 treated general graph adjacency. A trie restricts the graph to a rooted, acyclic, character-labeled tree in which every path spells a prefix. Shared prefixes share nodes; a terminal flag indicates that a path spells a complete stored key.

## Worked dictionary
Insert `car`, `cart`, `cat`, `dog`. The path `c → a` is shared. The node `r` is terminal for `car` and has child `t` for `cart`. The path `ca` exists without representing a complete key.

## Operations
- **Insert:** validate the entire input first, follow or create edges, then mark terminal. Duplicate insertion does not increment size.
- **Exact search:** follow all characters; require terminal at the final node.
- **Prefix search:** follow characters; terminal marker is irrelevant. Empty prefix is valid.
- **Autocomplete:** locate prefix node, recursively enumerate terminal descendants in alphabetic child order. Cost includes traversal and emitted characters.
- **Delete:** clear terminal only if present; walk back and prune only nodes that are nonterminal and childless. Preserve any path needed by other keys.

## Invariants
Every child index corresponds to its lowercase letter; root is never deleted; each complete key has exactly one terminal node; size equals terminal count; no dangling child ownership; pruning never removes a node required by another key. `std::unique_ptr` gives deterministic recursive ownership without manual deletion.

## Complexity
For dense child arrays of size A, lookup and prefix traversal are Θ(L). Initializing a newly allocated child array costs Θ(A), so insertion is O(LA), or O(L) for fixed A=26. Deletion with pruning can inspect A slots per level, O(LA), or O(L) for fixed A. Memory is Θ(MA) child slots for M nodes. Enumeration is output-sensitive: traversal of visited nodes plus total output string lengths, with alphabet scans at each visited node.

## Alternative representations
Dense array: O(1) child lookup, predictable locality, wasted null pointers. Sparse map: memory proportional to actual children plus mapping overhead; ordered map lookup O(log d), hash map expected O(1) under assumptions. Radix/path compression merges unary paths into labeled edges; it reduces nodes but requires partial-edge matching and splitting.

## Application and transition
Autocomplete, dictionaries, prefix routing and token indexes motivate tries. Week 13 examines B-trees and page-sized nodes, where reducing pointer overhead and storage transfers becomes essential.
