# BS0013 Data Structures

Public student materials for **BS0013 Data Structures** at Riga Business School, Riga Technical University.

## Course materials

- `syllabus/` — overall course syllabus;
- `lectures/` — weekly lecture reading as released (including Week 9 BSTs);
- `quizzes/` — student self-check materials where published;
- `labs/week01/` — Week 1 practical;
- `labs/week02/` — Week 2 practical;
- `labs/week03/` — Week 3 dynamic-array practical;
- `labs/week04/` — Week 4 linked-structures practical;
- `labs/week05/` — Week 5 circular-queue practical;
- `labs/week06/` — Week 6 linear-probing hash-map practical;
- `labs/week08/` — Week 8 binary-heap / priority-queue practical;
- `labs/week09/` — Week 9 binary-search-tree practical;
- `labs/week10/` — Week 10 AVL-tree practical.
- `labs/week11/` — Week 11 graph representation practical.
- `labs/week12/` — Week 12 trie practical.
- `labs/week13/` — Week 13 B-tree practical.
- `labs/week14/` — Week 14 capstone and benchmark.

## Use GitHub Codespaces

1. Fork this repository to your GitHub account.
2. Select **Code → Codespaces → Create codespace on main** in your fork.
3. Wait for the terminal to report `BS0013 environment ready.`
4. Weekly practicals are self-contained under `labs/weekNN/`.

The root development container provides Ubuntu, GCC, GDB, CMake, Git, and C++20 tooling for the course.

## Keep your fork up to date

Before starting a new week, commit any work you want to keep:

```bash
git status
git add .
git commit -m "Save work before course update"
```

If there is nothing to commit, Git will simply report that the working tree is clean.

Your fork normally has `origin` pointing to your own GitHub repository. Add the official course repository as `upstream` **once**:

```bash
git remote -v
git remote add upstream https://github.com/ValRCS/RBS_BS0013_Data_Structures.git
```

If `upstream` is already listed by `git remote -v`, do not add it again.

To bring newly released course material into your fork while preserving your commits:

```bash
git switch main
git fetch upstream
git merge upstream/main
git push origin main
```

A normal weekly update should merge cleanly because new material is usually added in new week folders. If Git reports a merge conflict, inspect `git status` and resolve the conflict before continuing; do not discard your previous lab work merely to obtain the update.

## Current practical: Week 14

Update your fork using the [Week 14 Codespaces instructions](labs/week14/instructions.md). Then follow the [assignment](labs/week14/assignment.md), implement four membership indexes, run tests, benchmark in Release mode and complete the reflection.

[Week 14 lecture — STL, Iterators and Selection](lectures/week14/lecture.md)

[Week 13 — B-trees and B+ trees](lectures/week13/lecture.md)

## Interactive course website

The [BS0013 interactive website](docs/index.html) contains overview pages for all 14 weeks and the interactive Week 11 graph lesson (Version 4), with 27 categorized presets, explicit graph imports, synchronized operation comparisons, guided invariant repairs, 22 optional C++ notes and eleven standalone C++20 demonstrations. The site is published at https://valrcs.github.io/RBS_BS0013_Data_Structures/. See [website setup](docs/README.md) for local preview instructions.
