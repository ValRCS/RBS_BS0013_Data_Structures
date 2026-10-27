# Week 9 Practical — Implement a Binary Search Tree

**BS0013 · RBS / RTU · approximately 90 minutes**

## Objective

Implement an integer-key **binary search tree (BST)** using separately allocated nodes. Unlike Week 8's vector-backed complete binary heap, BST shape is not fixed; instead, every node obeys this **global invariant**:

- All keys anywhere in its left subtree are strictly smaller.
- All keys anywhere in its right subtree are strictly larger.
- Duplicate insertion is rejected; all surviving nodes remain reachable.

~~~text
              50
            /    \
          30      70
         /  \    /  \
       20   40  60   80
~~~

**Height convention:** number of nodes along the longest path; empty = 0, one node = 1.

## Starter interface

Read include/int_bst.hpp and complete TODOs in src/int_bst.cpp. The public interface is:

~~~cpp
bool contains(int key) const;
bool insert(int key);             // false for a duplicate
bool erase(int key);              // false if absent
std::vector<int> inorder() const; // sorted keys
int height() const noexcept;      // empty = 0
bool check_invariant() const;
~~~

The Node type, root pointer, stored size and postorder destructor are provided. Copy and move operations are **deleted** deliberately: this raw-pointer teaching tree owns its nodes exclusively.

## Timeline and core tasks

| Minutes | Task |
|---:|:--|
| 0–10 | Trace BST search and sketch pointer links |
| 10–25 | contains() and insert_at(Node*& link, int key) |
| 25–38 | inorder_at() and height_at() |
| 38–52 | validate() using ancestor lower/upper bounds |
| 52–78 | erase_at(): leaf, one child, two children |
| 78–90 | Added tests, sanitizer run, reflection |

### 1. Search and insertion

Search selects only one child according to key comparison, stopping at a match or null link. For insertion descend to the first null link and allocate there. A reference to pointer, Node*&, permits changing a parent's actual left/right link **or root_** itself. Increment size_ only on successful allocation. Return false on duplicate keys.

Trace inserting 65 into the illustrated tree. State every comparison and the final modified link.

### 2. Traversal and height

Inorder traversal uses left → node → right; verify it returns keys in increasing order. Compute height recursively from the given convention. Compare insertion order:

~~~text
4,2,6,1,3,5,7  → well-shaped
1,2,3,4,5,6,7  → degenerates to a chain
~~~

Explain why the two trees have different heights although they have the same keys.

### 3. Global invariant checker

validate(node, lower, upper, count) must enforce **all ancestor bounds**: left descendants inherit an upper bound = current key; right descendants a lower bound = current key. The optional bounds avoid overflow problems for INT_MIN and INT_MAX. Count visited nodes and compare with size_. Merely checking immediate children is not sufficient.

### 4. Three deletion cases

1. Leaf: clear parent/root link; delete node.
2. One child: redirect parent/root link to surviving child; delete node.
3. Two children: find **inorder successor** (smallest key in the right subtree), copy that key to target, then delete the original successor node from the right subtree.

The successor cannot have a left child; its physical removal reduces to case 1 or 2. Only **one** node is physically freed and size decreases once. Confirm deletion of the root, absent keys, and deletion of an internal node with two children.

### 5. Verification and reflection

The starter compiles, but public tests fail until TODOs are implemented. Run Debug tests and then scripts/check-week09.sh (which also enables AddressSanitizer and UndefinedBehaviorSanitizer). Add at least two new tests: a root-deletion case and one duplicate/extreme-key case. Complete reflection.md.

**Extension:** additional traversal orders, randomized differential tests against std::set<int>, or an iterative height calculation.

Commit your source, tests and reflection in your fork. Moodle supplies official deadline and submission settings.
