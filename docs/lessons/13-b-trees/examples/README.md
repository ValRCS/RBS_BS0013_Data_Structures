# Week 13 standalone C++20 examples

These are supplementary, independent demonstrations, not lab solutions. Compile one file at a time: `g++ -std=c++20 -Wall -Wextra -pedantic FILE.cpp -o demo && ./demo`.

- [01_node_layout.cpp](01_node_layout.cpp) — Multi-key node representation. A sorted key array defines one more child interval than key slots.
- [02_separator_intervals.cpp](02_separator_intervals.cpp) — Separator intervals. This fixed example uses nonmatching keys; exact equality is a stored-key match in the course B-tree.
- [03_lower_bound.cpp](03_lower_bound.cpp) — In-node binary search primitive. Observe the standard-library search primitive on an ordinary vector, without implementing tree lookup.
- [04_median_position.cpp](04_median_position.cpp) — Median position. Identify the median without implementing a split.
- [05_unique_ptr_ownership.cpp](05_unique_ptr_ownership.cpp) — Unique ownership transfer. Moving transfers ownership; it does not duplicate the owned object.
- [06_occupancy_checks.cpp](06_occupancy_checks.cpp) — Local occupancy check. Check a nonroot occupancy condition in isolation.
- [07_page_capacity.cpp](07_page_capacity.cpp) — Hypothetical page capacity. The layout is hypothetical, not sizeof a C++ node.
- [08_range_lookup.cpp](08_range_lookup.cpp) — Ordered range query in STL. A standard ordered container supplies range operations; std::set is not required to be a B-tree.
