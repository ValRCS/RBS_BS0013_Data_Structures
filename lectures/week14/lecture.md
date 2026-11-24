# Week 14 — STL, Iterators, Synthesis, and Selection
**BS0013 · Fall 2026 · C++20**

## Learning objectives
Choose containers based on an ADT and workload; distinguish average, amortized and worst-case bounds; predict iterator invalidation; explain value semantics and ownership; design a fair experiment; justify a representation beyond Big-O.

## 1. From implementation to engineering
Week 13 B-trees showed how branching and page layout change costs; node visits are not physical I/O. Week 12 tries exploit shared prefixes; Week 11 graphs require explicit representation decisions. Earlier labs implemented arrays, lists, restricted ADTs, hash tables, heaps and search trees. The standard library provides many corresponding abstractions, but no direct graph, trie or persistent B+ tree. We now choose existing components where their contracts suffice instead of rebuilding them.

| Prior structure | Library abstraction | Main invariant or contract |
|---|---|---|
| Dynamic array | std::vector | Contiguous elements (except vector<bool>); size <= capacity |
| Linked list | std::list, std::forward_list | Valid chain, stable surviving nodes |
| Circular queue/deque | std::queue, std::deque | FIFO or both-end operations |
| Stack | std::stack | LIFO |
| Hash table | std::unordered_map, std::unordered_set | Unique keys (non-multi), hash/equality consistency |
| Binary heap | std::priority_queue, heap algorithms | Highest-priority element accessible |
| BST/AVL | std::map, std::set | Ordered keys; logarithmic lookup |
| Graph | Composed containers | Consistent vertex/edge representation |
| Trie/B-tree | Custom or external library | Prefix paths / multiway separators and occupancy |

The standard specifies observable guarantees, not a mandatory red-black tree for map/set or a particular hash collision strategy. Adapters restrict an underlying container's interface; priority_queue does not expose general search or traversal.

## 2. Workload and complexity
Assume n elements, constant-cost key comparison/hash, ordinary allocator and element operations. Bounds below are asymptotic; copying large keys can change costs. Sequence search is by value, associative search by key. List insertion assumes an already located valid position.

| Container | Access | Search | Insert | Erase |
|---|---|---|---|---|
| vector | O(1) index | O(n) | end amortized O(1), worst O(n); middle O(n) | O(n) middle |
| deque | O(1) index | O(n) | ends O(1); middle O(n) | ends O(1); middle O(n) |
| list | O(n) traversal | O(n) | O(1) known position | O(1) known position |
| sorted vector | O(1) index | O(log n) binary search | O(n) incremental | O(n) |
| set/map | no index | O(log n) | O(log n) ordinary insertion | O(log n) by key |
| unordered set/map | no index | average O(1), worst O(n) | average O(1), worst O(n) | average O(1), worst O(n) by key |
| priority_queue | O(1) top | not exposed | O(log n) heap comparisons plus underlying insertion | O(log n) heap comparisons for pop |

Amortized means a bound on total cost across a sequence, not a probability distribution. Average hash performance depends on hashing and workload; rehash costs can be substantial. Vector capacity growth is implementation-dependent. A sorted vector can beat a tree on read-mostly data because it avoids per-node allocation and benefits from locality, despite equal logarithmic lookup bounds. No timing ratio is guaranteed. Map's operator[] inserts a missing key; use find, contains (C++20) or at when appropriate.

## 3. Iterators and algorithms
A range [first,last) includes first and excludes last. An end iterator is not dereferenceable. Iterator category constrains available operations: input/output are single-pass as applicable; forward supports multipass; bidirectional adds decrement; random-access adds constant-time arithmetic; contiguous additionally represents adjacent objects. Vector iterators are random-access and normally contiguous; deque random-access but not contiguous; list and map/set bidirectional; unordered associative iterators forward. std::sort needs random-access iterators; list.sort uses its own interface. std::lower_bound on a sorted list may perform logarithmically many comparisons but linearly many iterator increments; map.lower_bound uses the container's search structure.

```cpp
std::vector<int> v{4, 1, 3};
std::sort(v.begin(), v.end());
auto it = std::lower_bound(v.begin(), v.end(), 3);
if (it != v.end() && *it == 3) { /* found */ }
```

## 4. Invalidation: separate iterator, pointer and reference lifetime
| Operation | Iterator impact | Reference/pointer impact |
|---|---|---|
| vector push_back with reallocation | all, including old end | all |
| vector push_back without reallocation | old end only | existing elements remain valid |
| vector erase | erased position and following, including end | at/after position invalidated |
| list insert | existing iterators remain valid | existing elements remain valid |
| list erase | erased elements only | erased elements only |
| map/set insert | existing iterators remain valid | existing elements remain valid |
| map/set erase | erased elements only | erased elements only |
| unordered rehash | all iterators | surviving element references/pointers remain valid |
| deque push_front/back | all iterators | existing element references remain valid |

Deque erasure and middle insertion have additional rules; consult the specific operation contract rather than generalizing. Unordered insert may rehash; reserve can trigger rehash. Do not dereference or compare invalidated iterators. A reference to a container object differs from a reference to an element.

Safe erasure while iterating:
```cpp
for (auto it = v.begin(); it != v.end();) {
    if (*it < 0) it = v.erase(it);
    else ++it;
}
```
For vectors with many removals, prefer std::erase_if(v, predicate) (C++20) to avoid repeated shifts. Explain why incrementing an erased iterator is wrong. Draw size/capacity 4, append fifth element, relocate storage, discard old handles. Without reallocation the old end is still invalidated.

## 5. Resource ownership and value semantics
RAII binds resource lifetime to an owning object. Standard containers release resources automatically and manage element lifetime. Rule of Zero: compose resource-owning members instead of manually writing special members.
```cpp
std::vector<int> a{10, 20, 30};
auto b = a;            // independent element values
auto c = std::move(a); // moved-from a remains valid, unspecified state
```
Copying a vector of pointers copies pointer values, not pointees. A vector of unique_ptr owns pointees and is not element-copyable. std::move is a cast enabling move operations, not itself a transfer. Move costs depend on container and allocator/operation; do not assume every move is constant time. Review Week 3 copy/move and Week 13 unique_ptr child transfer.

## 6. Selection framework
Specify required operations, frequency, ordering, key distribution, input size, memory, mutation and handle stability. Compare candidates with guarantees and measured evidence.
- Indexed traversal: vector; both-end mutation: deque; FIFO: queue.
- Frequent top priority: priority_queue; ordered ranges: map/set or sorted vector for batch/read-heavy use.
- Exact membership: unordered_set if average performance and unordered iteration are acceptable.
- Known-position stable node mutation: list, only if traversal and allocation costs justify it.
- Prefix queries: trie; persistent ordered ranges: B+ tree; sparse graph: adjacency list; dense graph with frequent edge tests: matrix.

Example: a read-mostly catalogue may sort once and use binary search; repeated incremental insertion into the middle shifts elements. A scheduler needing both lookup by identifier and priority extraction may combine two structures; maintaining consistency is an additional invariant.

## 7. Performance engineering
Compare identical data and queries, including hits and misses. Generate data outside timed regions; measure construction, lookup, and insertion separately. Use Release mode, a fixed seed, repeated trials and medians; consume results and verify correctness before timing. Avoid I/O in measured regions; report environment, sizes, units and number of operations. Wall-clock observations reflect caches, allocator, compiler and shared VM load. They neither prove asymptotic bounds nor guarantee a universal winner.

Lab: implement four interchangeable set-membership indexes (unsorted vector, sorted vector, set, unordered_set). Explain incremental insertion costs and bulk construction alternatives. Benchmark and defend one choice; no earlier lab is a build dependency.

## 8. Cumulative study guide
For every structure, rehearse ADT -> representation -> invariant -> operation trace -> time/space complexity -> memory/ownership -> tests -> appropriate workload. Review arrays/resizing, linked rewiring, circular buffers, collision/probing, heap sift, BST delete, AVL rotation, graph density, trie terminal markers, B-tree splits. Be able to identify broken invariants, distinguish expected/amortized/worst-case guarantees and justify a design under constraints. Final assessment is cumulative; no actual exam questions are provided here.

## References
- https://en.cppreference.com/w/cpp/container
- https://en.cppreference.com/w/cpp/iterator
- https://en.cppreference.com/w/cpp/algorithm/lower_bound
- https://en.cppreference.com/w/cpp/language/rule_of_three
