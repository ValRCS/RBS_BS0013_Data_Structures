# Week 10 — Balanced Search Trees: Rotations and AVL Invariants

**BS0013 Data Structures · Riga Business School, Riga Technical University · Fall 2026**

## 1. From Week 9 to Week 10

An ordinary BST maintains a global key-order invariant, but it makes no promise about its shape. Week 9 demonstrated that inserting 1,2,3,4,5,6,7 yields a right chain of height 7, whereas inserting 4,2,6,1,3,5,7 yields height 3. Searching follows one root-to-node path, so its cost is `O(h)`. The missing guarantee is **short height after every modification**.

A *self-balancing binary search tree* maintains additional state and performs local repairs during mutation. This week implements **AVL insertion balancing**. Red-Black Trees and splay trees are compared, not implemented in the required practical.

## 2. Unchanged dictionary contract, stronger representation invariant

The unique-key `IntAVL` provides `insert`, `contains`, `inorder`, `size`, `height`, and `check_invariant`. The BST condition remains strict: every key in a node's entire left subtree is smaller and every key in its right subtree is greater. Inorder traversal still produces sorted keys. Duplicate insertions return false and do not modify the size or topology.

**Height convention (same as Week 9):** empty subtree 0, leaf 1, and `h(node) = 1 + max(h(left), h(right))`.

For AVL nodes define `BF(node) = h(left) - h(right)`. The additional invariant is **BF belongs to {-1,0,+1} at every node**. Thus checking only the root is insufficient. Each node in our representation caches its own height, which must equal the height computed from its children.

## 3. Why height is logarithmic

Let `N(h)` be the minimum number of nodes in an AVL tree of height `h` under our node-count convention. Then `N(0)=0`, `N(1)=1`, and for `h≥2`, `N(h)=1+N(h-1)+N(h-2)`. The recurrence grows at least exponentially with height (Fibonacci-like), so `h=O(log n)`. This is a **worst-case** bound, not merely an expected or amortized claim.

## 4. A rotation is a local pointer rewrite

For a *left rotation*, let the old subtree root be X, its right child Y, and Y's left subtree B:

~~~text
       X                     Y
      / \                   / \
     A   Y       --->      X   C
        / \               / \
       B   C             A   B
~~~

The sorted relative order is `A < X < B < Y < C` both before and after. Only a constant number of owning child links change. A right rotation is the mirror image. A rotation therefore preserves the BST order invariant but changes subtree heights.

With `Node*& link`, the rotation helper can update either a parent child pointer or `root_`. During a left rotation: retain `old_root=link` and `pivot=old_root->right`; move `pivot->left` into `old_root->right`; make `old_root` the pivot's left child; recompute **old root first, then pivot**; finally assign `link=pivot`. No allocation or deletion occurs.

## 5. Four insertion cases

Insert as in Week 9, then recompute heights and rebalance while returning through the recursive call stack. Let BF = left height minus right height.

| Case | Trigger at current node | Repair |
|:---|:---|:---|
| LL | BF > +1; left child's BF ≥ 0 | Rotate right |
| RR | BF < -1; right child's BF ≤ 0 | Rotate left |
| LR | BF > +1; left child's BF < 0 | Rotate left on left child, then right at current node |
| RL | BF < -1; right child's BF > 0 | Rotate right on right child, then left at current node |

For insertion, a single rebalance location suffices to restore the height of the affected ancestor subtree. An implementation that returns through ancestors may check each ancestor, but no further rotation should be necessary after the first insertion repair.

~~~text
LL: insert 30,20,10         LR: insert 30,10,20

      30                          30
     /                           /
    20           => 20          10       => 20
   /               / \            \        / \
  10              10 30           20     10 30
~~~

The two other cases mirror these geometries. **Do not confuse these four insertion cases with the three BST deletion cases from Week 9.**

## 6. C++ implementation boundaries

~~~cpp
struct Node {
    int key;
    int height = 1;
    Node* left = nullptr;
    Node* right = nullptr;
};

static int height_of(const Node* p) noexcept {
    return p ? p->height : 0;
}
static int balance_factor(const Node* p) noexcept {
    return p ? height_of(p->left) - height_of(p->right) : 0;
}
~~~

The educational `IntAVL` owns all nodes and disables copying/moving. Its destructor performs postorder deletion. The reference implementation provides the dictionary interface and asks students to implement height maintenance, rotations, rebalancing, and validation. A production program should normally prefer `std::set` or `std::map` unless a custom representation is justified.

## 7. Operation complexity and what is *not* implied

| Operation | AVL worst-case time | Auxiliary memory |
|:--|:--|:--|
| Iterative search | O(log n) | O(1) |
| Recursive insertion | O(log n) | O(log n) stack |
| One rotation | O(1) | O(1) |
| Inorder traversal | Θ(n) | O(log n) stack + Θ(n) for returned vector |
| Validation of every node | Θ(n) | O(log n) recursion stack |
| Postorder destruction | Θ(n) | O(log n) recursion stack |

These bounds assume the AVL invariants are maintained. Insertion allocates one node for a new key; rotations do not allocate. AVL deletion also admits logarithmic worst-case time but its rebalancing can propagate through multiple ancestors; it is **not** a required Week 10 implementation.

## 8. Comparing balancing strategies

**AVL:** explicit tight height-difference bound, cached heights or balance factors, logarithmic worst-case operations; more stringent balance maintenance.

**Red-Black:** node colors and equal black-height constraints enforce logarithmic worst-case height with a looser shape restriction; `std::set` and `std::map` promise logarithmic operations but the C++ standard does not prescribe Red-Black implementation.

**Splay:** accessed nodes are moved toward the root; logarithmic **amortized** cost over operation sequences, but an individual operation can take Θ(n). Splay trees do not maintain the AVL balance bound. This is optional enrichment.

## 9. Testing representation invariants

An AVL invariant checker should validate **all** of (a) ancestral exclusive key bounds, (b) stored height equality with recursively measured subtree height, (c) absolute balance factor ≤1, and (d) visited-node count equal to `size_`. Use `std::optional<int>` for absent key bounds to handle `INT_MIN` and `INT_MAX` safely.

Tests should include all four three-key insertion cases, sorted insertion (a plain BST's worst case), duplicate insertions, extreme keys, size preservation, changing roots after rotation, and randomized differential comparisons against `std::set<int>`. Run sanitizers to identify memory errors; sanitizers alone cannot establish AVL invariant correctness.

## 10. From trees to graphs

Week 11 broadens explicit pointer-like relationships beyond a parent/children hierarchy. Graph representations may have many neighbours, cycles, and no unique root. Our recurring questions remain: representation, invariants, operation costs, and testing.

### References

- Open Data Structures (C++), Binary Search Trees: https://opendatastructures.org/ods-cpp/6_Binary_Search_Trees.html
- OpenDSA, AVL Trees: https://opendsa-server.cs.vt.edu/
- cppreference, std::set: https://en.cppreference.com/w/cpp/container/set.html
- cppreference, std::map: https://en.cppreference.com/w/cpp/container/map.html
