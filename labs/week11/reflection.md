# Week 11 — Reflection

1. State worst-case time for edge lookup, insertion and removal for both representations; justify the duplicate-check cost.
2. Explain why sorted `neighbors` output costs more than raw list iteration. Compare with matrix row scanning.
3. For V=10,000 and E=20,000, estimate byte-matrix cell memory and directed-list adjacency entries (ignore container overhead). Which representation would you choose for frequent neighbour scans?
4. What invariant fails if an undirected insertion updates only one endpoint? How does a self-loop affect logical edge count?
5. Describe one test that distinguishes a directed graph from an undirected graph.
