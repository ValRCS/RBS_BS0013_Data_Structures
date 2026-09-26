# BS0013 Week 5 Lab — Circular Queue

## Start here

Read **`instructions.md` first**. It covers updating your fork, building the Week 5 workspace, implementing the circular queue, running the public tests, sanitizer verification, and Moodle submission.

Use `assignment.md` for the detailed conceptual and implementation specification.

Week 5 continues in the **same fork and Codespace** used in previous weeks.

## Quick update reminder

From the repository root:

```bash
git status
git switch main
git fetch upstream
git merge upstream/main
git push origin main
```

If `upstream` is not configured yet, see `instructions.md`.

## Quick build

```bash
cd labs/week05
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build
```

The starter code compiles but intentionally contains TODO operations.

Implement the required functions in:

```text
src/int_circular_queue.cpp
```

## Test your implementation

```bash
ctest --test-dir build --output-on-failure
bash scripts/check-week05.sh
```

The verification script repeats the public tests with AddressSanitizer and UndefinedBehaviorSanitizer enabled.

## Main Week 5 files

```text
instructions.md                    complete workflow and submission instructions
assignment.md                      detailed practical specification
include/int_circular_queue.hpp     public interface and representation
src/int_circular_queue.cpp         TODO implementation
tests/public_tests.cpp             student-visible correctness checks
scripts/check-week05.sh            normal + sanitizer verification
reflection.md                      short conceptual reflection
```

Week 5 focuses on restricted-access ADTs, logical versus physical order, circular indexing, representation invariants, wrap-around, and the distinction between worst-case, amortized, and expected complexity.
