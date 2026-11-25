# Week 9 standalone C++20 examples

Compile from this directory: `g++ -std=c++20 -Wall -Wextra -pedantic NAME.cpp -o /tmp/demo && /tmp/demo`. These independent demonstrations are not the assessed IntBST solution.

- [tree-representation.cpp](tree-representation.cpp): Explicit links with a non-owning three-node view; constant-time child access. Expected: 50: 30 70.
- [search-trace.cpp](search-trace.cpp): Directional search in a fixed index-based tree; O(h) time, O(1) auxiliary space. Expected: 50 70 60 found.
- [reference-to-pointer.cpp](reference-to-pointer.cpp): Reference aliases an existing pointer; one pointer assignment, O(1). Expected: 2.
- [traversal-orders.cpp](traversal-orders.cpp): Visit a fixed tree represented by indices; Θ(n) time and O(h) recursive stack. Expected: In: 20 30 40 | Pre: 30 20 40 | Post: 20 40 30.
- [postorder-lifetime.cpp](postorder-lifetime.cpp): RAII members release owned child allocations; Θ(n) destruction, O(h) nested calls. Destructor body logs before member destruction; explicit reset demonstrates child-first reclamation. Expected: 20 40 30.
- [successor-selection.cpp](successor-selection.cpp): Minimum of a right subtree in an index representation; O(h) time, O(1) space. Expected: 60.
- [ancestor-bounds.cpp](ancestor-bounds.cpp): Demonstrate inherited exclusive bounds without arithmetic on keys; constant-time single-node predicate. Expected: local valid, global invalid.
- [ordered-containers.cpp](ordered-containers.cpp): Ordered unique keys and key/value associations; logarithmic insert/find guarantees. Expected: 10 20 30 | Ada.
