# Week 14 reflection
Name your compiler/version, build mode and environment:

| n | Index | Median build (µs) | Median lookup (µs) | Median insertion (µs) |
|---|---|---|---|---|
| | | | | |

Record all four indexes for at least two sizes. How many operations does each timing include?

1. State membership and incremental insertion bounds (including average/worst distinctions) for each index; what invariant enables binary search?
2. Compare observed timings with theory. Explain locality, allocation, cache and shared-machine noise. Why is this not proof of a complexity class?
3. Which index would you choose for read-mostly exact membership, frequent updates, or ordered ranges? What assumptions could change your answer?
4. How would bulk sorting change construction? What happens to a saved vector iterator on reallocation?
5. Identify one earlier lab and describe its representation, invariant, ownership, operation complexity and one test you can defend.
