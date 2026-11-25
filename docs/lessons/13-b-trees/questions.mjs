export const questions = [
  [
    "Memory",
    "A logical node visit always requires a physical disk read.",
    [
      "True",
      "False"
    ],
    1,
    "A cached page may need no storage transfer."
  ],
  [
    "Memory",
    "Which cost does a wide external-memory index primarily target?",
    [
      "Physical page transfers",
      "Number of distinct keys",
      "Compilation time"
    ],
    0,
    "Wide nodes can reduce the number of levels to visit."
  ],
  [
    "Memory",
    "A cold-cache model assumes what?",
    [
      "Every visited page is already cached",
      "Every newly visited page requires a transfer",
      "All nodes fit in registers"
    ],
    1,
    "This is an idealization; actual caches change I/O."
  ],
  [
    "Memory",
    "What can grow when a node stores more keys?",
    [
      "In-node work",
      "Number of levels necessarily",
      "Number of records necessarily"
    ],
    0,
    "Larger arrays may require more comparisons or shifts."
  ],
  [
    "Anatomy",
    "For t=3, maximum keys in a node?",
    [
      "3",
      "5",
      "6"
    ],
    1,
    "2t−1 = 5."
  ],
  [
    "Anatomy",
    "For t=4, minimum nonroot keys?",
    [
      "3",
      "4",
      "7"
    ],
    0,
    "t−1 = 3."
  ],
  [
    "Anatomy",
    "An internal node with four keys has how many children?",
    [
      "4",
      "5",
      "8"
    ],
    1,
    "An internal node partitions the domain into k+1 intervals."
  ],
  [
    "Anatomy",
    "Which structural property is required?",
    [
      "All leaves have equal depth",
      "Every node is full",
      "Every node has two children"
    ],
    0,
    "Equal leaf depth maintains balance."
  ],
  [
    "Anatomy",
    "Can a nonempty root have just one key when t=8?",
    [
      "Yes",
      "No"
    ],
    0,
    "The root has a special minimum occupancy."
  ],
  [
    "Anatomy",
    "What is the height of the empty lab tree?",
    [
      "0",
      "1",
      "−1"
    ],
    0,
    "The course counts levels."
  ],
  [
    "Search",
    "For [10,20], where does key 17 go?",
    [
      "Child 0",
      "Child 1",
      "Child 2"
    ],
    1,
    "17 is strictly between the separators."
  ],
  [
    "Search",
    "In a B-tree, an exact internal separator match does what?",
    [
      "Stops successfully",
      "Always descends",
      "Splits the node"
    ],
    0,
    "Internal keys are stored keys."
  ],
  [
    "Search",
    "What happens when a leaf lacks the search key?",
    [
      "Insert it",
      "Return absent",
      "Continue to a sibling"
    ],
    1,
    "Membership search terminates at the leaf."
  ],
  [
    "Search",
    "Binary in-node search uses what worst-case comparison bound?",
    [
      "O(t)",
      "O(log t)",
      "O(n²)"
    ],
    1,
    "The node has at most 2t−1 sorted keys."
  ],
  [
    "Insertion",
    "Split [4,8,12,16,20] at t=3. Which key is promoted?",
    [
      "8",
      "12",
      "16"
    ],
    1,
    "Median index t−1 = 2."
  ],
  [
    "Insertion",
    "How many keys remain on each side after splitting a full t=4 node?",
    [
      "3",
      "4",
      "7"
    ],
    0,
    "Seven keys become three, one promoted, three."
  ],
  [
    "Insertion",
    "A full internal t=3 node has six children. How many move right?",
    [
      "2",
      "3",
      "4"
    ],
    1,
    "Each resulting node retains exactly t children."
  ],
  [
    "Insertion",
    "What is special about splitting a full root?",
    [
      "Height decreases",
      "Height grows by one",
      "Height stays constant"
    ],
    1,
    "A new root is created above the previous root."
  ],
  [
    "Insertion",
    "When does top-down insertion split a full child?",
    [
      "Before descending",
      "Only after inserting a duplicate",
      "After returning to the root"
    ],
    0,
    "Do not descend into a full child."
  ],
  [
    "Insertion",
    "What must a duplicate insertion do under the lab contract?",
    [
      "Split if needed",
      "Increment size",
      "Leave structure and size unchanged"
    ],
    2,
    "Reject before any mutation."
  ],
  [
    "Complexity",
    "Worst-case logical visits for membership in a tree of height h?",
    [
      "O(h)",
      "O(n) always",
      "O(1) always"
    ],
    0,
    "At most one node per level."
  ],
  [
    "Complexity",
    "Worst-case split cost for contiguous key and child arrays?",
    [
      "O(1) for variable t",
      "O(t)",
      "O(n²)"
    ],
    1,
    "Keys and child references may be moved."
  ],
  [
    "Complexity",
    "If a page holds 100 records, how many leaf pages hold 1,000,000 records at full occupancy?",
    [
      "100",
      "1,000",
      "10,000"
    ],
    2,
    "Ceiling of records / leaf capacity."
  ],
  [
    "Complexity",
    "Does larger minimum degree always improve runtime?",
    [
      "Yes",
      "No"
    ],
    1,
    "Height, locality, comparisons and shifts trade off."
  ],
  [
    "B+ trees",
    "Where are record keys stored in the illustrated B+ tree?",
    [
      "Leaves",
      "Only root",
      "Every separator is a separate record"
    ],
    0,
    "Internal separators route searches."
  ],
  [
    "B+ trees",
    "Why link leaves?",
    [
      "To make ordered range scans sequential",
      "To remove sorting",
      "To avoid all initial searches"
    ],
    0,
    "Locate the first leaf, then follow links."
  ],
  [
    "B+ trees",
    "When a B+ internal separator matches the target, what happens?",
    [
      "Return an internal record",
      "Route to the appropriate leaf",
      "Delete the separator"
    ],
    1,
    "Internal separators are routing values."
  ],
  [
    "Selection",
    "A large persistent ordered index needs range scans. Best candidate?",
    [
      "Stack",
      "B+ tree",
      "Unordered set"
    ],
    1,
    "Wide nodes and linked leaves support page-oriented ranges."
  ],
  [
    "Selection",
    "A dictionary needs exact lookups only, in RAM. Good candidate?",
    [
      "Hash table",
      "Queue",
      "Segment tree"
    ],
    0,
    "Expected efficient point lookup under suitable assumptions."
  ],
  [
    "Selection",
    "Repeated range-sum queries and point updates on an array suggest what?",
    [
      "Trie",
      "Segment tree",
      "Stack"
    ],
    1,
    "Hierarchical aggregates support logarithmic updates and queries."
  ]
];
