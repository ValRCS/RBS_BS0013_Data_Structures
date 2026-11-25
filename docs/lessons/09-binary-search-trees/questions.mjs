export const questions=[
  {
    "q": "Root depth under our convention?",
    "options": [
      "0",
      "1",
      "Tree height"
    ],
    "correct": 0,
    "why": "Depth counts edges."
  },
  {
    "q": "Empty tree height?",
    "options": [
      "1",
      "0",
      "−1"
    ],
    "correct": 1,
    "why": "We count nodes on the longest path."
  },
  {
    "q": "A leaf has how many children?",
    "options": [
      "1",
      "2",
      "0"
    ],
    "correct": 2,
    "why": "A leaf has no children."
  },
  {
    "q": "Is every binary tree a BST?",
    "options": [
      "No",
      "Yes",
      "Only if complete"
    ],
    "correct": 0,
    "why": "BST adds global ordering."
  },
  {
    "q": "A max-heap guarantees what?",
    "options": [
      "Sorted inorder",
      "Parent ≥ children",
      "Logarithmic arbitrary search"
    ],
    "correct": 1,
    "why": "Heap order is local, not BST order."
  },
  {
    "q": "All keys in a BST left subtree are…",
    "options": [
      "At most equal",
      "Arbitrary",
      "Strictly smaller"
    ],
    "correct": 2,
    "why": "Duplicates are rejected in this model."
  },
  {
    "q": "A 40 below the right subtree of 50 is…",
    "options": [
      "Invalid",
      "Valid if parent is 70",
      "Valid if leaf"
    ],
    "correct": 0,
    "why": "All ancestor bounds apply."
  },
  {
    "q": "Can an unbalanced BST be valid?",
    "options": [
      "No",
      "Yes",
      "Only if empty"
    ],
    "correct": 1,
    "why": "Balance is not a BST invariant."
  },
  {
    "q": "Which bounds avoid integer overflow?",
    "options": [
      "key ± 1",
      "Always zero",
      "Exclusive optional bounds"
    ],
    "correct": 2,
    "why": "No arithmetic on extreme keys."
  },
  {
    "q": "Search at key 50 for 20 goes…",
    "options": [
      "Left",
      "Right",
      "Both"
    ],
    "correct": 0,
    "why": "The right subtree contains larger keys."
  },
  {
    "q": "Search ends absent when…",
    "options": [
      "A leaf is reached regardless",
      "A null link is reached",
      "Root is not equal"
    ],
    "correct": 1,
    "why": "The null subtree contains no keys."
  },
  {
    "q": "Duplicate insertion changes size by…",
    "options": [
      "1",
      "−1",
      "0"
    ],
    "correct": 2,
    "why": "Strict set semantics."
  },
  {
    "q": "First insertion changes which link?",
    "options": [
      "root_",
      "left of a leaf",
      "right of a leaf"
    ],
    "correct": 0,
    "why": "The empty tree has only a root link."
  },
  {
    "q": "Inorder order?",
    "options": [
      "Node, left, right",
      "Left, node, right",
      "Left, right, node"
    ],
    "correct": 1,
    "why": "BST inorder yields increasing keys."
  },
  {
    "q": "Preorder order?",
    "options": [
      "Left, node, right",
      "Right, left, node",
      "Node, left, right"
    ],
    "correct": 2,
    "why": "Visit the node before descendants."
  },
  {
    "q": "Postorder order?",
    "options": [
      "Left, right, node",
      "Node, left, right",
      "Left, node, right"
    ],
    "correct": 0,
    "why": "Children precede parent."
  },
  {
    "q": "Level order normally uses a…",
    "options": [
      "Stack only",
      "Queue",
      "Hash table"
    ],
    "correct": 1,
    "why": "FIFO processes earlier levels first."
  },
  {
    "q": "All full traversals take…",
    "options": [
      "Θ(log n)",
      "Θ(h)",
      "Θ(n)"
    ],
    "correct": 2,
    "why": "Every node is emitted once."
  },
  {
    "q": "Deleting a leaf replaces its owning link with…",
    "options": [
      "nullptr",
      "Root",
      "Its own address"
    ],
    "correct": 0,
    "why": "The allocation is released."
  },
  {
    "q": "Deleting a one-child node preserves…",
    "options": [
      "The deleted node",
      "The child subtree",
      "Neither"
    ],
    "correct": 1,
    "why": "Redirect the owning link."
  },
  {
    "q": "The inorder successor of a two-child node is…",
    "options": [
      "Maximum of right subtree",
      "Immediate parent",
      "Minimum of right subtree"
    ],
    "correct": 2,
    "why": "It is the next larger key."
  },
  {
    "q": "The successor can have…",
    "options": [
      "A right child",
      "A left child",
      "Two children"
    ],
    "correct": 0,
    "why": "A minimum cannot have a left child."
  },
  {
    "q": "Two-child key-copy deletion frees how many nodes?",
    "options": [
      "Two",
      "One",
      "Zero"
    ],
    "correct": 1,
    "why": "Target identity survives; successor is freed."
  },
  {
    "q": "Maximum height with 127 distinct keys?",
    "options": [
      "7",
      "126",
      "127"
    ],
    "correct": 2,
    "why": "A chain is a valid ordinary BST."
  },
  {
    "q": "Minimum height with 127 keys?",
    "options": [
      "7",
      "6",
      "127"
    ],
    "correct": 0,
    "why": "ceil(log2(n+1)) under the node convention."
  },
  {
    "q": "Sorted insertion construction cost?",
    "options": [
      "Θ(n log n)",
      "Θ(n²)",
      "Θ(n)"
    ],
    "correct": 1,
    "why": "Path lengths grow linearly."
  },
  {
    "q": "Iterative search auxiliary space?",
    "options": [
      "O(h)",
      "Θ(n)",
      "O(1)"
    ],
    "correct": 2,
    "why": "A current pointer suffices."
  },
  {
    "q": "Node*& allows a helper to…",
    "options": [
      "Replace the original pointer",
      "Copy the node",
      "Prevent any mutation"
    ],
    "correct": 0,
    "why": "A reference aliases the pointer variable."
  },
  {
    "q": "Why disable shallow copying an owning raw-pointer tree?",
    "options": [
      "Improve sorting",
      "Avoid shared ownership and double deletion",
      "Guarantee balance"
    ],
    "correct": 1,
    "why": "Two owners could free the same nodes."
  },
  {
    "q": "Which STL container supports ordered unique keys?",
    "options": [
      "std::unordered_set",
      "std::priority_queue",
      "std::set"
    ],
    "correct": 2,
    "why": "std::set offers ordered iteration and logarithmic operations."
  }
];
