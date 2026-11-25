export const questions = [
  [
    "What is a vertex?",
    [
      "A relationship",
      "An entity in a graph",
      "A matrix row only"
    ],
    1,
    "A vertex models an entity; edges model relationships."
  ],
  [
    "In an undirected graph, (2,4) and (4,2) are…",
    [
      "The same logical edge",
      "Always two edges",
      "Invalid"
    ],
    0,
    "Undirected endpoints are unordered."
  ],
  [
    "A tree with 7 vertices has how many edges?",
    [
      "6",
      "7",
      "8"
    ],
    0,
    "A connected acyclic undirected graph has V−1 edges."
  ],
  [
    "An undirected graph with V−1 edges must be a tree.",
    [
      "True",
      "False"
    ],
    1,
    "It may be disconnected and contain a cycle."
  ],
  [
    "For a directed edge 0→3, which matrix cell is set?",
    [
      "A[3][0]",
      "A[0][3]",
      "Both always"
    ],
    1,
    "Rows are sources; columns are destinations."
  ],
  [
    "A graph has an isolated vertex. What is its list bucket?",
    [
      "Missing",
      "Empty",
      "Self-loop"
    ],
    1,
    "Each vertex still has a bucket."
  ],
  [
    "A full byte matrix for 100 vertices has how many cells?",
    [
      "100",
      "10,000",
      "5,000"
    ],
    1,
    "V² cells, regardless of edge count."
  ],
  [
    "A directed graph has 12 edges. How many stored outgoing entries?",
    [
      "12",
      "24",
      "144"
    ],
    0,
    "Each directed edge appears once."
  ],
  [
    "An undirected graph has 12 edges, including 2 loops. Stored entries?",
    [
      "12",
      "22",
      "24"
    ],
    1,
    "2(12−2)+2 = 22."
  ],
  [
    "What does duplicate-safe add_edge return for an existing edge?",
    [
      "true",
      "false",
      "A new ID"
    ],
    1,
    "The logical graph did not change."
  ],
  [
    "What is required of an undirected matrix?",
    [
      "All ones",
      "Symmetry",
      "No diagonal cells"
    ],
    1,
    "A[u][v] equals A[v][u]."
  ],
  [
    "An undirected loop contributes how much to mathematical degree?",
    [
      "0",
      "1",
      "2"
    ],
    2,
    "A loop contributes two incidences but one stored entry here."
  ],
  [
    "Which operation directly checks one indexed cell?",
    [
      "Matrix membership",
      "Unsorted list membership",
      "Edge list scan"
    ],
    0,
    "The matrix gives direct indexed access."
  ],
  [
    "Why sort a copied adjacency bucket?",
    [
      "To keep raw storage sorted",
      "To satisfy the sorted output API",
      "To increase E"
    ],
    1,
    "The lab separates internal order from returned order."
  ],
  [
    "Matrix storage complexity?",
    [
      "Θ(V+E)",
      "Θ(V²)",
      "Θ(E)"
    ],
    1,
    "All V² positions exist."
  ],
  [
    "List storage for a sparse graph E=O(V)?",
    [
      "Θ(V)",
      "Θ(V²)",
      "Θ(E²)"
    ],
    0,
    "Θ(V+E) simplifies to Θ(V)."
  ],
  [
    "Worst-case membership in unsorted bucket of degree d?",
    [
      "O(1)",
      "O(d)",
      "O(log d)"
    ],
    1,
    "Linear scan may examine all d entries."
  ],
  [
    "Sorted neighbors API adds what possible cost?",
    [
      "O(d log d)",
      "O(V²) always",
      "None"
    ],
    0,
    "Sorting a copied bucket requires extra work."
  ],
  [
    "Do abstract position counts measure wall-clock time?",
    [
      "Yes",
      "No"
    ],
    1,
    "Cache, allocation, hardware and constant factors also matter."
  ],
  [
    "BFS frontier uses which ADT?",
    [
      "LIFO stack",
      "FIFO queue",
      "Min-heap"
    ],
    1,
    "FIFO explores distance layers."
  ],
  [
    "When should BFS mark a vertex discovered?",
    [
      "On enqueue",
      "Only after finish",
      "Never"
    ],
    0,
    "Marking on enqueue prevents duplicate discovery."
  ],
  [
    "BFS minimizes what in an unweighted graph?",
    [
      "Edge count",
      "Weight sum regardless of weights",
      "Vertex IDs"
    ],
    0,
    "Every edge has equal unit cost."
  ],
  [
    "DFS normally explores what next?",
    [
      "An unexplored neighbour of the current frame",
      "All vertices at distance 1",
      "Minimum weight"
    ],
    0,
    "DFS pursues a branch before backtracking."
  ],
  [
    "Why track discovery on a cyclic graph?",
    [
      "Prevent repeated exploration",
      "Sort vertex IDs",
      "Resize the matrix"
    ],
    0,
    "Without visited state cycles can repeat indefinitely."
  ],
  [
    "DFS parent edge in undirected graph necessarily indicates a cycle.",
    [
      "True",
      "False"
    ],
    1,
    "The reciprocal adjacency of the tree edge is not a new cycle."
  ],
  [
    "Can zero be used for absent weighted edges if zero weights are allowed?",
    [
      "Yes",
      "No"
    ],
    1,
    "Use a distinct absence marker."
  ],
  [
    "Dijkstra's correctness assumes…",
    [
      "Nonnegative weights",
      "All edges weight 1",
      "An acyclic graph"
    ],
    0,
    "Negative weights can invalidate settled distances."
  ],
  [
    "Why can a lazy priority queue contain a stale entry?",
    [
      "A shorter tentative distance was inserted later",
      "All weights are zero",
      "Vertex has no neighbours"
    ],
    0,
    "Old entries remain until popped and checked."
  ]
];
