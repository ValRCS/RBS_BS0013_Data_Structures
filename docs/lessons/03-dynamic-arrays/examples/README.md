# Week 3 independent C++20 demonstrations

Compile each with `g++ -std=c++20 -Wall -Wextra -pedantic FILE.cpp -o demo` and run `./demo`. These examples do not implement the assessed IntVector.

- [contiguous-addressing.cpp](contiguous-addressing.cpp): Observe actual element spacing. Expected: Four consecutive addresses spaced by sizeof(int); addresses vary.
- [size-capacity.cpp](size-capacity.cpp): Reserve storage without creating logical elements. Expected: 3 followed by capacity at least 8.
- [growth-trace.cpp](growth-trace.cpp): Observe capacity changes; exact policy is implementation-dependent. Expected: 12 rows showing size, capacity and whether capacity changed.
- [reserve-experiment.cpp](reserve-experiment.cpp): Count capacity changes with and without reserve. Expected: First count implementation-dependent; second count zero.
- [shift-cost.cpp](shift-cost.cpp): Observe element shifts without growth. Expected: 1 9 2 3 4 then 1 2 3 4.
- [invalidation.cpp](invalidation.cpp): Never inspect or dereference a saved pointer after reallocation. Expected: 10 twice; the second pointer is reacquired.
- [copy-independence.cpp](copy-independence.cpp): Value semantics with independent vector storage. Expected: 10 999
- [move-semantics.cpp](move-semantics.cpp): Move construction transfers resources; do not assume a general moved-from value. Expected: 2 10, then 30.
- [ownership-raii.cpp](ownership-raii.cpp): A unique owner releases its allocation automatically. Expected: 42
