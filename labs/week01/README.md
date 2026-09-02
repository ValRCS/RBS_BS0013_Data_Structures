# Week 1 Practical — C++ Toolchain and Codespaces

This folder contains the Week 1 practical for BS0013 Data Structures. It introduces the course development environment and small C++20 programs involving compilation, diagnostics, values, references, and `std::vector`.

## Start here

From the repository root:

```bash
cd labs/week01
bash scripts/check-environment.sh
```

Then open `assignment.md` and complete it in order. The setup script checks GCC, GDB, CMake, and Git, then builds every starter program that is expected to compile. `src/broken.cpp` is intentionally excluded from the normal build because diagnosing its compiler errors is part of the practical.

## Files

| Path | Purpose |
|---|---|
| `assignment.md` | Full practical instructions |
| `src/hello.cpp` | First manual compilation |
| `src/broken.cpp` | Intentional compiler errors to diagnose |
| `src/warning.cpp` | Warning-versus-error exercise |
| `src/value_reference.cpp` | Pass-by-value/reference prediction |
| `src/vector_basics.cpp` | Basic `std::vector` modifications |
| `src/copy_alias.cpp` | Copy-versus-alias prediction |
| `src/sequence.cpp` | Main TODO-based mini-task |
| `src/bonus-week1.cpp` | Optional stretch task: workload, representation, search, and sorted insertion |
| `reflection.md` | Short conceptual answers |
| `build/` | Generated executables; ignored by Git |

## Optional bonus task

If the core Week 1 practical is not challenging enough, work on `src/bonus-week1.cpp`.

The bonus keeps the same Week 1 themes but goes further: compare two `std::vector` representations of the same records, implement linear and binary search, count comparisons, preserve a sorted invariant during insertion, and reason about the resulting complexity trade-offs.

Do the search algorithms yourself rather than replacing the exercise with associative containers or standard-library search helpers.

The terminal commands in `assignment.md` are authoritative. If you leave this folder, return with `cd labs/week01` before running the lab commands.

## Preserve your work

Before finishing, review and commit only your source and reflection changes:

```bash
git status
git diff
git add src reflection.md
git status
git commit -m "Complete week 01 lab"
git push
```

Generated files under `labs/week01/build/` should not appear in the commit.
