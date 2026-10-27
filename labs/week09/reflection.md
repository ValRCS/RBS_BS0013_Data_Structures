# Week 9 Reflection — BST

1. **Global invariant:** Give one tree that passes immediate parent/child ordering checks but violates the BST invariant.
2. **Pointer semantics:** Explain why Node*& is useful when inserting into an empty tree or deleting the root.
3. **Deletion trace:** Start with 50,30,70,20,40,60,80. Delete 50 using the inorder successor. Identify exactly which node is freed.
4. **Complexity:** State contains, insert and erase costs in h and in n for a well-shaped versus degenerate BST. Distinguish iterative search space from recursive operation space.
5. **Height:** Compare insertion orders [4,2,6,1,3,5,7] and [1,2,3,4,5,6,7]; why does a plain BST not guarantee logarithmic time?
6. **Ownership and production:** Why is this raw-pointer tree noncopyable? Explain one benefit of std::set<int> in production C++.
