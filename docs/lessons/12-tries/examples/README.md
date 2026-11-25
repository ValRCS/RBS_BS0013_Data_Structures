# Week 12 independent C++20 demonstrations

These programs are isolated concept demonstrations, not the assessed trie lab solution. Compile individually, e.g. `g++ -std=c++20 -Wall -Wextra -pedantic character-index.cpp -o demo && ./demo`.

- [character-index.cpp](character-index.cpp) — Validate a–z before indexing. Expected output: `a=0, z=25`.
- [terminal-marker.cpp](terminal-marker.cpp) — Distinguish a terminal marker from path existence. Expected output: `ca: prefix only; car: key`.
- [node-ownership.cpp](node-ownership.cpp) — Observe recursive ownership of a tiny tree. Expected output: `Only root remains`.
- [prefix-walk.cpp](prefix-walk.cpp) — Follow preconstructed edges without implementing the dictionary. Expected output: `Two indexed edges followed`.
- [allocation-count.cpp](allocation-count.cpp) — Count unique prefixes with a set, not a trie implementation. Expected output: `6 distinct prefix nodes including root`.
- [safe-pruning.cpp](safe-pruning.cpp) — Test the pruning predicate in isolation. Expected output: `Only nonroot unused leaves may be pruned`.
- [child-representations.cpp](child-representations.cpp) — Compare slot and entry counts, not total object sizes. Expected output: `26 slots vs 2 entries (not total bytes)`.
- [lexicographic-order.cpp](lexicographic-order.cpp) — Observe ordered map iteration. Expected output: `art`.
