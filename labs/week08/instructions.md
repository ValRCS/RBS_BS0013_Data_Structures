# Week 8 Lab Instructions

## 1. Update your existing fork before starting Week 8

If you forked the course repository at the beginning of the semester, **keep using that fork and its Codespace**. A normal `git pull` from your fork's `origin` does not necessarily bring in changes made later to the instructor's repository. You need to fetch from the course repository (the `upstream` remote).

Open the terminal in your existing Codespace, at the repository root. First inspect and save your work:

```bash
git status
git remote -v
```

If `git status` shows uncommitted changes, commit your source and reflection files **before updating**. For example, if your changes are in the labs directory:

```bash
git add labs/
git commit -m "Save earlier lab work before Week 8"
```

Only commit files you intend to keep; do not stage build directories or generated executables. If there are no changes to commit, skip these two commands.

Your `origin` should point to **your own fork**. Check the output of `git remote -v`. If `upstream` is **not listed**, add the official public course repository **once**:

```bash
git remote add upstream https://github.com/ValRCS/RBS_BS0013_Data_Structures.git
```

If `upstream` already exists, **do not add it again**. Then synchronize your fork:

```bash
git switch main
git fetch upstream
git merge upstream/main
git push origin main
```

This brings newly published labs into your Codespace's `main` branch and pushes the merged result back to your GitHub fork. It preserves your existing commits. A successful update should make `labs/week08/` available.

If Git reports uncommitted changes, a merge conflict, or a rejected push, **do not run `git reset --hard`, force-push, or delete your fork**. Inspect `git status` and ask the instructor for help if needed.

## 2. Open the Week 8 lab

The repository-wide devcontainer already provides C++20, CMake, and a 2-core environment.

From the repository root:

```bash
cd labs/week08
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build
ctest --test-dir build --output-on-failure
```

The initial starter is designed to compile, but several tests will fail until you implement the TODOs in `src/binary_heap.cpp`.

The header `include/binary_heap.hpp` supplies the interface; do not change it for the core tasks. Implement method definitions in `src/binary_heap.cpp`, as in earlier C++ labs. No new file needs to be created.

## 3. Recommended workflow

For each operation:

```text
predict the tree state
        ↓
draw/trace the array indices
        ↓
implement one TODO
        ↓
build
        ↓
run tests
        ↓
check the invariant
```

Do not begin by rewriting the whole class.

## 4. Sanitizer verification

```bash
cmake -S . -B build-sanitize -DCMAKE_BUILD_TYPE=Debug -DENABLE_SANITIZERS=ON
cmake --build build-sanitize
ctest --test-dir build-sanitize --output-on-failure
```

Or run the convenience script after your implementation is complete:

```bash
bash scripts/check-week08.sh
```

## 5. What you may change

You should normally change:

- `src/binary_heap.cpp`;
- `tests/test_binary_heap.cpp` to add your own tests;
- `reflection.md`.

Do not replace the class with `std::priority_queue` and do not remove public tests.

## 6. Before submission

Check:

```bash
git status
```

Do not commit `build/`, `build-sanitize/`, executables, or editor-generated files.

Be prepared to explain:

- the array/tree index relationship;
- the two heap invariants;
- why sift-up/down are logarithmic in the logical tree height;
- why bottom-up heapify is better than repeated insertion for bulk construction;
- why `top()` is constant time but arbitrary-value search is not.
