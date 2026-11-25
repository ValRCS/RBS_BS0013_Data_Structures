# Week 2 standalone C++20 examples

Run from this directory with `g++ -std=c++20 -Wall -Wextra -Wpedantic pointer-basics.cpp -o /tmp/week02-demo && /tmp/week02-demo`. Each file has its own main. These are supplemental examples, not assessed lab solutions.

| File | Expected output (whitespace normalized) |
|---|---|
| `object-addresses.cpp` | `7 7 1` |
| `pointer-basics.cpp` | `19` |
| `pointer-aliasing.cpp` | `8 14` |
| `references-vs-pointers.cpp` | `9 4` |
| `scope-lifetime.cpp` | `23 1` |
| `dynamic-allocation.cpp` | `13 1` |
| `ownership-responsibility.cpp` | `31` |
| `node-chain.cpp` | `9` |
| `node-traversal.cpp` | `15` |
| `node-rewiring.cpp` | `9 6` |

## Intentionally unsafe examples

`unsafe/` contains programs deliberately exhibiting undefined behavior. Never run them as normal tests. Compile individually with `g++ -std=c++20 -g -O0 -fsanitize=address,undefined -fno-omit-frame-pointer unsafe/use-after-free.cpp -o /tmp/week02-unsafe` and run in an isolated process. Expect a sanitizer report and nonzero exit. Repeat for `double-delete.cpp`. Exact addresses and report formatting vary.
