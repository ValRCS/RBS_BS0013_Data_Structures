export const questions=[
  [
    "What does a root-to-node path spell?",
    [
      "A prefix",
      "A hash bucket",
      "A sorted integer"
    ],
    0,
    "Each edge extends the prefix by one character."
  ],
  [
    "What marks a stored key?",
    [
      "A leaf only",
      "A terminal marker",
      "A parent pointer"
    ],
    1,
    "Internal nodes can be terminal."
  ],
  [
    "Incoming edges of a nonroot node?",
    [
      "Zero",
      "One",
      "Any number"
    ],
    1,
    "A trie is a rooted tree."
  ],
  [
    "Insert cart when car exists. New nodes?",
    [
      "Four",
      "Three",
      "One"
    ],
    2,
    "Only t is missing."
  ],
  [
    "Insert an existing key. Size?",
    [
      "Increases",
      "Unchanged",
      "Decreases"
    ],
    1,
    "Size counts distinct keys."
  ],
  [
    "Insert cat when car exists. Shared prefix?",
    [
      "ca",
      "car",
      "cat"
    ],
    0,
    "Both share c and a."
  ],
  [
    "Dictionary car, cart: contains ca?",
    [
      "True",
      "False"
    ],
    1,
    "Path exists but is not terminal."
  ],
  [
    "Same dictionary: starts_with ca?",
    [
      "True",
      "False"
    ],
    0,
    "Prefix lookup ignores terminal status."
  ],
  [
    "Is empty prefix valid?",
    [
      "Yes",
      "No"
    ],
    0,
    "It identifies the permanent root."
  ],
  [
    "Which yields sorted completion?",
    [
      "DFS with ordered children, terminal first",
      "BFS",
      "Reverse alphabetical DFS"
    ],
    0,
    "Shorter matching keys precede extensions."
  ],
  [
    "complete(car) for car, cart, cat?",
    [
      "car only",
      "car, cart",
      "cart, cat"
    ],
    1,
    "Both keys begin with car."
  ],
  [
    "Why can completion be expensive?",
    [
      "It emits results",
      "Prefix always long",
      "Root always terminal"
    ],
    0,
    "Traversal and output contribute to cost."
  ],
  [
    "Delete car when cart exists. Pruned nodes?",
    [
      "Zero",
      "One",
      "Three"
    ],
    0,
    "r still owns t."
  ],
  [
    "Delete cart after car, with cat remaining. Pruned nodes?",
    [
      "Zero",
      "Two",
      "Four"
    ],
    1,
    "t and r go; ca remains."
  ],
  [
    "When can a nonroot node be pruned?",
    [
      "Whenever nonterminal",
      "Whenever childless",
      "Nonterminal and childless"
    ],
    2,
    "Both conditions are necessary."
  ],
  [
    "Delete a missing key. Size?",
    [
      "Unchanged",
      "Decreases"
    ],
    0,
    "No stored key was removed."
  ],
  [
    "Successful dense exact search costs?",
    [
      "Θ(L)",
      "Θ(N)",
      "Θ(MA)"
    ],
    0,
    "One child access per character."
  ],
  [
    "Variable-alphabet insertion worst case?",
    [
      "O(LA)",
      "O(A) regardless of L",
      "O(1)"
    ],
    0,
    "New arrays initialize A slots."
  ],
  [
    "Unsuccessful lookup always examines L characters?",
    [
      "Yes",
      "No"
    ],
    1,
    "Stop at first missing edge."
  ],
  [
    "Edges in M-node trie?",
    [
      "M",
      "M−1",
      "MA"
    ],
    1,
    "One incoming edge per nonroot."
  ],
  [
    "Dense node child slots?",
    [
      "A",
      "d",
      "L"
    ],
    0,
    "One slot for every alphabet symbol."
  ],
  [
    "Sparse ordered map lookup for d children?",
    [
      "O(log d)",
      "Guaranteed O(1)",
      "O(MA)"
    ],
    0,
    "Balanced ordered map searches by label."
  ],
  [
    "Natural choice for autocomplete?",
    [
      "Trie",
      "Unindexed hash set",
      "Stack"
    ],
    0,
    "Locate a subtree directly."
  ],
  [
    "Why is string hashing not free?",
    [
      "Hashing may process characters",
      "Hash tables always sort keys",
      "Each key needs a trie"
    ],
    0,
    "Hashing and equality depend on string length."
  ]
];
