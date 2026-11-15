# Week 13 — Reflection

1. Trace insertion of 10, 20, 5, 6 into a B-tree with minimum degree t=2. Which key is promoted and what do the resulting children contain?
2. Explain why an internal-node split must move **t child pointers** to the right sibling, not only t−1 pointers.
3. Calculate minimum and maximum nonroot key counts and maximum child counts for t=2 and t=8.
4. After inserting at least ten distinct keys, record height and some successful and unsuccessful page_visits results. What precisely do these logical visits count?
5. Compare B-tree and B+ tree range scans. Where do records or record references appear in a conventional B+ tree?
6. Explain the effect of checking for duplicates **after** rather than before a root split. Why does the lab contract reject duplicates first?
