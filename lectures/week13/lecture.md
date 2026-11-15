# Week 13 — External-Memory and Advanced Data Structures
**BS0013 · RBS/RTU · Fall 2026 · 90-minute lecture + 90-minute lab**

## Learning outcomes

After this week you should be able to (1) motivate page-oriented indexes using a memory-hierarchy cost model; (2) state B-tree ordering and occupancy invariants; (3) trace search and insertion with node splitting; (4) distinguish B-tree and B+ tree storage and range scans; (5) analyze height, CPU comparisons, and logical page transfers separately; and (6) choose an index structure for a specified workload.

## 1. Why change representation?

Weeks 9–10 used binary search trees (including AVL balancing), Week 11 compared graph adjacency layouts, and Week 12 used tries to exploit shared prefixes. Those structures expose a recurring trade-off: **many small individually allocated nodes** are convenient, but pointer chasing can scatter accesses across memory.

An external-memory index optimizes a different objective. Data may be divided into pages (or blocks), while loading an uncached page from storage is much more expensive than inspecting several keys already in memory. A good index therefore stores many separator keys together and reduces the number of page transfers. This is a model, not a claim that a particular in-memory C++ node automatically causes a disk read. Modern systems also involve OS page caches, buffer pools, SSDs, prefetching, and CPU caches.

**Cost model:** CPU comparison work plus logical page visits plus page-transfer cost. A page visit and a physical I/O are not synonyms. In a cold-cache idealization each visited page may require a transfer; with caching several visits may involve none.

## 2. The B-tree ADT and representation

A B-tree stores ordered **keys in multiple positions per node**. For a node containing `[10 | 20]`, three children represent keys `(-∞,10)`, `(10,20)`, and `(20,+∞)`. There is at most one occurrence of a key in our set-style exercise. Internal separator keys are themselves stored keys in this B-tree variant.

Use the CLRS *minimum degree* convention: `t ≥ 2`. A node can hold at most `2t−1` keys and at most `2t` children. Every **nonroot** node has at least `t−1` keys. An internal node holding `k` keys has `k+1` children; the root may be smaller; every leaf is at the same depth. All node keys are strictly increasing and every child subtree falls within its separator-defined open interval. For t=2, nonroot nodes have 1–3 keys, and internal nodes have 2–4 children.

These invariants keep the height logarithmic: `h = Θ(log_t(n+1))` for fixed t and growing n, counting levels and ignoring the empty-tree special case. More precisely, fanout/occupancy determine upper and lower bounds. Nodes at larger fanout can reduce height but also require searches within larger key arrays and consume more bytes per node.

## 3. Search

Within a node, locate the first separator not smaller than the target (a linear or binary search in a sorted array). If it equals the target, stop successfully; if the node is a leaf, stop unsuccessfully; otherwise follow the corresponding child. For `[10 | 20]`, searching 17 chooses the middle child. With binary search inside nodes, worst-case comparison work is `O(h log t) = O(log n)`; for fixed t it is `O(h)`. Logical node visits are `O(h)`. The in-memory lab records *logical* page visits, not actual storage I/O.

## 4. Top-down insertion and splitting

Use split-before-descent insertion: **never descend into a full child**. For a full child with `2t−1` keys, promote the median key at index `t−1` into its parent; retain the first `t−1` keys on the left; move the final `t−1` keys into a new right sibling. If the child is internal, distribute its `2t` existing children evenly: `t` stay left and `t` move right. Then choose the child appropriate for the new key.

**Trace, t=2:** Insert 10, 20, 5 to obtain `[5 | 10 | 20]`. Before inserting 6, split this full root: new root `[10]` with leaf children `[5]` and `[20]`. Descend left, producing `[5 | 6]`. The height grows from one to two levels. Duplicate insertion must be rejected **before changing the tree** in our set contract; adding the same key again does not change size or structure.

A second trace illustrates a nonroot split. If an internal root `[10]` has a full left child `[5 | 6 | 7]`, splitting that child promotes 6 to the root, yielding root `[6 | 10]` and children `[5]`, `[7]` and the original right child. Insertion of 8 continues into the `[7]` child and produces `[7 | 8]`.

**Deletion (concept only):** Deletion may need borrowing/rotation from a sibling or merging nodes to restore minimum occupancy. Full deletion, B+ rebalancing, and storage serialization are outside the 90-minute lab.

## 5. B+ trees and ordered ranges

A **B+ tree** commonly keeps actual records or record references at the *leaf level* and uses internal keys as routing/separator values. Leaves are in key order and are typically linked, allowing a range scan to find the first leaf and then advance sequentially through subsequent leaves. Separator keys in internal nodes can duplicate values from leaves: unlike the simple B-tree set model, internal separators need not represent separate stored records.

For a range query `[a,b]`, a B+ tree performs `O(h)` logical node visits to find the first matching leaf and then accesses as many consecutive leaf pages as cover the output. Transfer cost depends on caching and output pages. A hash table supports expected efficient point membership under suitable hashing assumptions but does not directly provide ordered range traversal.

| Structure | Strong workload | Main qualification |
|---|---|---|
| AVL/BST | Ordered in-memory key operations | Small nodes, pointer locality concerns |
| Hash table | Expected fast exact lookup | No natural ordered range scan |
| Trie | Prefix lookup, autocomplete | Character paths and per-node child overhead |
| B-tree | Ordered key lookup with wide nodes | Split/merge complexity; layout matters |
| B+ tree | Point lookup and ordered range scans | Leaf-level records and linked pages |
| Skip list | Ordered operations with simpler probabilistic balancing | Expected logarithmic, not the same worst-case guarantee |
| Treap | Ordered operations with randomized priorities | Expected height depends on randomization |

## 6. Page size, branching factor, and complexity

A node/page can store approximately as many key-plus-pointer pairs as fit in its available bytes after headers and metadata. For example, a **hypothetical** leaf capacity of 100 records and internal fanout of 100 can organize 1,000,000 records into about 10,000 leaf pages, 100 intermediate pages, and one root: **three page levels** under ideal full occupancy. This illustration is not an empirical claim about a database engine.

For a B-tree of n keys and minimum degree t, height is `O(log_t(n+1))`. A point search visits up to one node per level. In-node binary search uses `O(log t)` comparisons per level. A top-down insertion traverses `O(h)` levels, possibly splitting at multiple levels; moving keys/child pointers within nodes takes `O(t)` work per split, yielding a simple worst-case CPU bound `O(t log_t(n+1))` for insertion using contiguous vectors. The auxiliary recursive stack in the lab is `O(h)`, and newly allocated nodes across a single insertion are `O(h)` in the worst case. These are **RAM-model bounds**, not directly measured disk transfers.

A larger node may reduce tree height while increasing in-node search and update costs. On real hardware, cache locality, SSD behavior, synchronization, concurrent access, and page layout affect performance. Avoid claiming one universal optimal fanout.

## 7. Applied engineering choice

For each proposed workload, specify (i) required operations, (ii) expected number of keys, (iii) ordering and range needs, (iv) where data resides, (v) latency/I/O constraints, and (vi) correctness guarantees. The selection is not only about quoting Big-O.

**Lab handoff:** Implement B-tree set lookup and insertion with t configurable, inspect root and child splits, run the provided invariant checker, and compare logical node visits for t=2 versus t=8. Week 14 returns to these trade-offs through standard C++ containers, iterators, ownership, and design synthesis.
