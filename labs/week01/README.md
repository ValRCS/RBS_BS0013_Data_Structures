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
| `reflection.md` | Short conceptual answers |
| `build/` | Generated executables; ignored by Git |

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
