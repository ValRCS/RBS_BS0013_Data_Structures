# Free Data Structures and C++ Resources

Student reference list for **BS0013 Data Structures**. All resources below are freely accessible on the web. Links were checked on **2026-09-02**.

The course uses C++, but the central subject is **data structures and algorithms**: representations, operations, invariants, complexity, memory behavior, and choosing an appropriate structure. Some excellent algorithm resources use another programming language; use those for the concepts, then connect the ideas to our C++ implementations.

## Recommended starting points

| Resource | Best use | Notes |
|---|---|---|
| [cppreference — C++ reference](https://en.cppreference.com/w/cpp/) | Precise C++ and standard-library reference | The main reference to use when you need exact information about `std::vector`, `std::list`, `std::map`, `std::unordered_map`, iterators, algorithms, language rules, etc. It is a reference, not a beginner tutorial. |
| [LearnCpp](https://www.learncpp.com/) | Refreshing modern C++ | Free structured tutorial. Useful when a C++ language issue, rather than the data-structure concept itself, is blocking you. |
| [VisuAlgo](https://visualgo.net/en) | Interactive data-structure and algorithm visualizations | Particularly useful for linked lists, stacks, queues, sorting, heaps, search trees, hashing, and graph algorithms. Step through operations rather than only watching animations. |
| [OpenDSA](https://opendsa-server.cs.vt.edu/) | Data-structure explanations, visualizations, and exercises | Interactive open educational material covering data structures and algorithms. Useful for independent practice. |
| [David Galles — Data Structure Visualizations](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html) | Operation-by-operation visualization | University of San Francisco visualizations for stacks, queues, lists, BST/AVL/red-black trees, hash tables, heaps, sorting, graphs, and more. |

## C++ language and standard library

### cppreference

**Link:** <https://en.cppreference.com/w/cpp/>

Use cppreference as the course's primary technical reference for C++. In particular, consult the **Containers**, **Algorithms**, **Iterators**, and **Memory management** sections. When comparing a data structure implemented in class with its standard-library counterpart, check the documented interface, iterator behavior, invalidation rules, and complexity guarantees.

Do not try to read cppreference sequentially like a textbook. Search it when you have a concrete question.

### LearnCpp

**Link:** <https://www.learncpp.com/>

A free, actively maintained modern C++ tutorial. Relevant topics for this course include:

- compilation and debugging;
- references and pointers;
- object lifetime and ownership;
- classes and value semantics;
- dynamic memory;
- templates;
- standard-library containers and algorithms.

Use it selectively to fill C++ knowledge gaps. The course itself will concentrate on data structures rather than reteaching all of C++.

### C++ Core Guidelines

**Link:** <https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines.html>

Guidelines led by Bjarne Stroustrup and Herb Sutter for writing modern C++ effectively and safely. Particularly relevant later in the course when thinking about interfaces, ownership, resource management, containers, value semantics, and performance.

This is not required reading from beginning to end. Treat it as a source of design rationale and good practice.

## Data structures and algorithms

### VisuAlgo

**Link:** <https://visualgo.net/en>

Interactive visualizations developed for computer-science education. The site covers many topics directly relevant to BS0013, including:

- linked lists, stacks, queues, and deques;
- sorting;
- binary search trees and balanced trees;
- heaps;
- hash tables;
- graph representations and traversal;
- shortest paths and minimum spanning trees.

A productive way to use it is to predict the next state of the structure **before** advancing the animation.

### OpenDSA

**Link:** <https://opendsa-server.cs.vt.edu/>

OpenDSA provides interactive textbooks, visualizations, and practice exercises for data structures and algorithms. It is especially useful when you want a second explanation of a concept plus an interactive representation.

Public OpenDSA books are listed here:

<https://opendsa-server.cs.vt.edu/home/books>

### David Galles: Data Structure Visualizations

**Link:** <https://www.cs.usfca.edu/~galles/visualization/Algorithms.html>

A long-running set of interactive visualizations from the University of San Francisco. Coverage includes array- and linked implementations of stacks and queues, search trees, AVL and red-black trees, open/closed hashing, heaps, sorting, BFS, DFS, Dijkstra, topological sorting, minimum spanning trees, and disjoint sets.

These visualizations are especially useful for checking whether you understand an **operation trace** or a structure's invariant.

### MIT OpenCourseWare 6.006 — Introduction to Algorithms

**Link:** <https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/>

A complete undergraduate algorithms course with freely accessible lecture videos, lecture notes, practice problems, assignments, and quizzes. It covers dynamic arrays, heaps, balanced binary search trees, hash tables, sorting, graph searching, and algorithm analysis.

MIT 6.006 is not a C++ course. Use it for the underlying algorithms, data structures, mathematical models, and complexity analysis rather than for C++ syntax.

### Princeton Algorithms, 4th Edition — free booksite

**Link:** <https://algs4.cs.princeton.edu/home/>

Robert Sedgewick and Kevin Wayne's companion site contains substantial freely accessible material on:

- algorithm analysis;
- stacks and queues;
- sorting;
- priority queues and heaps;
- binary and balanced search trees;
- hash tables;
- graphs;
- union-find;
- string algorithms.

The implementations are primarily Java, but the conceptual material, diagrams, exercises, and performance analysis transfer directly to this course. Focus on the algorithm and representation rather than translating Java mechanically into C++.

## Tools for investigating C++ behavior

### Compiler Explorer

**Link:** <https://godbolt.org/>

Compiler Explorer lets you compile small C++ examples in the browser using many compiler versions and inspect compiler output. It is useful for:

- checking whether a small example compiles;
- comparing compiler diagnostics;
- experimenting with language features;
- seeing generated assembly when investigating performance or memory-level behavior.

For normal lab work, use the course Codespace/build environment. Compiler Explorer is best for small isolated experiments.

## How to use these resources in BS0013

1. **Start with the operation and invariant.** Ask what the structure must guarantee and which operations matter.
2. **Trace the structure visually.** Use VisuAlgo, OpenDSA, or the Galles visualizations when pointer or tree/graph relationships are difficult to picture.
3. **Analyse complexity yourself.** Predict the time and auxiliary-space complexity before checking another source.
4. **Implement and test.** The purpose of external resources is to improve understanding, not to replace the lab work.
5. **Compare with the STL.** After implementing a structure manually, use cppreference to study the corresponding standard container and its guarantees.
6. **Use C++ resources for C++ questions.** If ownership, references, constructors, templates, or another language issue becomes the obstacle, consult LearnCpp and cppreference.

## Resource map by course topic

| Topic | Particularly useful resources |
|---|---|
| Complexity / asymptotic analysis | MIT 6.006, Princeton Algorithms, OpenDSA |
| Arrays / dynamic arrays / `std::vector` | cppreference, OpenDSA, MIT 6.006 |
| Pointers, references, lifetime | LearnCpp, cppreference, C++ Core Guidelines |
| Linked lists | VisuAlgo, Galles, OpenDSA |
| Stacks / queues / deques | VisuAlgo, Galles, OpenDSA, cppreference |
| Sorting | VisuAlgo, Galles, Princeton Algorithms, MIT 6.006 |
| Heaps / priority queues | VisuAlgo, Galles, Princeton Algorithms, MIT 6.006 |
| Binary search trees | VisuAlgo, Galles, OpenDSA, MIT 6.006 |
| Balanced trees | VisuAlgo, Galles, MIT 6.006 |
| Hash tables | VisuAlgo, Galles, Princeton Algorithms, MIT 6.006 |
| Graphs / BFS / DFS | VisuAlgo, Galles, Princeton Algorithms, MIT 6.006 |
| STL containers and algorithms | cppreference |
| Modern C++ design / ownership | C++ Core Guidelines, LearnCpp |

---

**Link status:** verified reachable on 2026-09-02. External sites can change; report a broken or substantially changed resource to the instructor.