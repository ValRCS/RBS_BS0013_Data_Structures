# Week 14 Lab — Riga Information Index
**90 minutes · C++20 · existing Codespace**

## Scenario
A catalogue needs exact integer-ID membership queries, new records, and possibly ordered ranges. Compare four interchangeable representations instead of reimplementing containers.

## Contract
Each index exposes insert(int), contains(int) const, and size(). Empty indexes have size zero; every int including negative values is valid. insert returns true only for a new key; duplicates do not change size. contains never mutates. All four indexes implement identical set semantics.

## Core work
Edit src/indexes.cpp (eight functions grouped into four TODOs).
1. LinearIndex: unsorted vector, linear search, reject duplicates before append.
2. SortedIndex: maintain strictly increasing unique keys; use lower_bound and binary_search.
3. TreeIndex: use std::set member operations.
4. HashIndex: use std::unordered_set member operations.
Do not change public contracts or the provided benchmark to bypass checks. Add at least two meaningful assertions to tests/test_indexes.cpp. Run Debug tests, then run the Release benchmark (see instructions).

## Experiment
The provided harness uses the same shuffled even integer keys, 2,000 queries (exactly half hits), and 200 new negative keys for every implementation. It checks individual outcomes before timing; reports median microseconds across three independent trials; excludes data generation and printing. Default sizes are 1,000, 5,000 and 10,000; optionally provide a single size from 1 to 50,000. The construction workload uses incremental insertion for every implementation; it is NOT optimal bulk construction for sorted vectors. Timings include duplicate-check semantics, not allocation-free comparisons. Fixed execution order and shared Codespace load may bias observations. Record the compiler/build and input sizes, not just timing numbers.

## Deliverables
Commit working code, added tests and reflection.md including at least two input sizes and a justified selection for read-heavy and update-heavy cases. Prepare to explain one earlier lab's invariant, complexity and ownership. Submit through the established Moodle process.

## Extensions (optional)
Investigate hash reserve, sorted-vector bulk sort/unique, ordered range query, shuffled execution order, or compare one earlier custom structure. No previous lab is required to build this one. Never grade on a particular timing ranking.
