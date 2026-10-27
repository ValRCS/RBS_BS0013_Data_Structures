# Week 9 — Trees and Binary Search Trees

**BS0013 Data Structures · Riga Business School, Riga Technical University**

## Purpose and relation to previous work

Week 8 used a complete binary tree **implicitly stored in an array**: its heap-order invariant guarantees access to the maximum element but not efficient arbitrary-key search. In Week 9 we connect explicit **Node pointers** (Week 4) with a *global* search-order invariant to produce a binary search tree (BST). Week 10 will add balancing because the BST ordering condition alone cannot guarantee logarithmic height.

## Tree representation and vocabulary

~~~text
         50             root
       /    \
     30      70          children of root
    /  \    /  \
  20   40  60   80      leaves
~~~

Nodes have at most two child links. A subtree is the node and all reachable descendants. A node's depth is its distance from root; **this course lab defines tree height as the number of nodes along the longest root-to-leaf path**, so empty height is 0 and singleton height is 1.

~~~cpp
struct Node {
    int key;
    Node* left = nullptr;
    Node* right = nullptr;
};
Node* root = nullptr;
~~~

The implementation's owner is the tree object: every allocated node is reached from the root and freed by the destructor unless deleted earlier. Copy/move is disabled in the educational implementation to prevent accidental shallow pointer aliasing.

## Global ordering invariant

For **every** node with key k, all values in its **entire left subtree** are smaller than k and all values in its entire right subtree greater than k. Duplicate insertion is rejected. Local child comparisons alone are not enough: a node 20 stored in the right subtree of root 50 is invalid even if its immediate parent is 70.

## Search and insertion

To search for k, start at root and compare k with the current node: equality succeeds, a smaller key selects left, a larger key selects right; a missing child means failure. This visits at most one path.

~~~cpp
const Node* p = root_;
while (p) {
    if (key == p->key) return true;
    p = key < p->key ? p->left : p->right;
}
return false;
~~~

Insertion follows that same path until the first null link, where it allocates a new node. A reference-to-pointer, Node*&, allows a recursive helper to replace either a child pointer or root_. On a duplicate key nothing is allocated and size is unchanged.

## Traversals and recursive reasoning

**Inorder:** left subtree, current node, right subtree; outputs BST keys in ascending order. **Preorder:** current, left, right. **Postorder:** left, right, current; useful for safe recursive reclamation. Null subtree is the base case.

~~~cpp
void inorder_at(const Node* n, std::vector<int>& result) {
    if (!n) return;
    inorder_at(n->left, result);
    result.push_back(n->key);
    inorder_at(n->right, result);
}
~~~

Every full traversal visits all n nodes in **Θ(n)** time. Recursive traversal needs O(h) stack space, and a returned vector of n keys additionally needs Θ(n) result space.

## Deletion: three cases

Deleting a leaf clears its parent/root link and frees the leaf. Deleting a node with exactly one child redirects its parent/root link to that child and frees the old node.

Deleting a node with **two** children requires finding the **inorder successor** (the minimum key in its right subtree), replacing the target key with the successor key, then deleting the successor at its original location. The successor has no left child, so its physical deletion is a zero/one-child case.

~~~text
erase 50 using successor 60

Before:                    After:
      50                      60
     /  \                    /  \
   30    70                30    70
  / \   / \               / \     \
20  40 60 80             20  40    80
~~~

Exactly one physical node is freed and the size decreases by one. Updating the owning parent/root pointer through Node*& avoids dangling links.

## Height and asymptotic analysis

The BST invariant does not constrain shape. Inserting [4,2,6,1,3,5,7] gives height 3 whereas inserting [1,2,3,4,5,6,7] gives height 7. Define h as actual tree height.

| Operation | Time | Auxiliary memory |
|:--|:--|:--|
| Iterative contains | O(h) | O(1) |
| Recursive insert, erase | O(h) | O(h) call stack |
| Inorder | Θ(n) | O(h) stack plus Θ(n) returned values |
| Destructor | Θ(n) | O(h) recursive stack |

For well-shaped trees h=Θ(log n); for an unbalanced worst-case chain h=Θ(n). Claiming *worst-case* O(log n) for this plain BST is incorrect.

## Testing and validity

An invariant checker should propagate an exclusive lower/upper bound from **all** ancestors; optional integer bounds handle INT_MIN and INT_MAX without arithmetic overflow. Count reached nodes to cross-check the stored size. Tests should cover empty tree, duplicate key, root deletion, all three deletion shapes, sorted insertion degeneration, extreme keys, sanitizer execution, and comparison of behavior against std::set<int>.

## STL comparison and next week

std::set and std::map expose ordered associative operations with **logarithmic complexity guarantees** and automatic ownership. The raw-pointer BST is a pedagogical implementation, not the recommended production container. **Week 10** introduces balancing and rotations to keep tree height logarithmic while maintaining BST order.

### References

- [Open Data Structures — Binary Search Trees](https://opendatastructures.org/ods-cpp/6_Binary_Search_Trees.html)
- [cppreference — std::set](https://en.cppreference.com/w/cpp/container/set.html)
- [cppreference — std::map](https://en.cppreference.com/w/cpp/container/map.html)
