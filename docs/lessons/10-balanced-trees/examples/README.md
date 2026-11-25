# Standalone C++20 examples

Compile each independently: `g++ -std=c++20 -Wall -Wextra -pedantic rotation-demo.cpp -o demo && ./demo`. These are not the assessed IntAVL implementation.

| File | Expected output | Conceptual cost |
|---|---|---|
| bst-degeneration | 7 3 | O(h) search |
| node-metadata | height 4, BF 2 | constant |
| rotation-demo | root 30, transferred 40 | constant links |
| inorder-preservation | 20 30 40 50 70 | traversal Θ(n) |
| ordered-containers | 10 20 30; 20 | logarithmic lookup |
| invariant-examples | true false | full validation Θ(n) |
