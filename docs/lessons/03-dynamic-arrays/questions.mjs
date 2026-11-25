export const questions=[
  {
    "prompt": "Why is indexing contiguous storage constant time?",
    "options": [
      "Base plus index times element size",
      "Search from the start",
      "Every index is cached"
    ],
    "answer": 0,
    "explanation": "Base plus offset does not traverse earlier elements."
  },
  {
    "prompt": "If base is 1000, sizeof(int)=4, address of index 3?",
    "options": [
      "1003",
      "1016",
      "1012"
    ],
    "answer": 2,
    "explanation": "1000 + 3 × 4 = 1012."
  },
  {
    "prompt": "Does a fixed-size array grow in place?",
    "options": [
      "Only if full",
      "No",
      "Always"
    ],
    "answer": 1,
    "explanation": "Its length is fixed; a dynamic array can acquire new storage."
  },
  {
    "prompt": "Which indices are logical when size=3?",
    "options": [
      "0, 1, 2",
      "0, 1, 2, 3",
      "0 through capacity−1"
    ],
    "answer": 0,
    "explanation": "The logical range is [0,size)."
  },
  {
    "prompt": "Size 4, capacity 8: spare slots?",
    "options": [
      "8",
      "12",
      "4"
    ],
    "answer": 2,
    "explanation": "Capacity minus size."
  },
  {
    "prompt": "Can size exceed capacity?",
    "options": [
      "Only after reserve",
      "No",
      "Yes"
    ],
    "answer": 1,
    "explanation": "It violates the stable representation invariant."
  },
  {
    "prompt": "Capacity zero in the lab IntVector implies?",
    "options": [
      "nullptr",
      "An allocation of one",
      "A dangling pointer"
    ],
    "answer": 0,
    "explanation": "The lab specifies zero capacity iff nullptr."
  },
  {
    "prompt": "Does reserve(8) on size 3 add elements?",
    "options": [
      "Five",
      "Eight",
      "No"
    ],
    "answer": 2,
    "explanation": "Reserve changes available storage, not logical size."
  },
  {
    "prompt": "What does clear normally retain in std::vector?",
    "options": [
      "All element lifetimes",
      "Capacity",
      "Logical values"
    ],
    "answer": 1,
    "explanation": "Clear destroys logical elements without reducing capacity."
  },
  {
    "prompt": "Append at size 3, capacity 8: transfers?",
    "options": [
      "0",
      "3",
      "8"
    ],
    "answer": 0,
    "explanation": "A spare slot is available."
  },
  {
    "prompt": "Append at size 4, capacity 4, doubling: capacity?",
    "options": [
      "5",
      "4",
      "8"
    ],
    "answer": 2,
    "explanation": "Growth doubles the old capacity."
  },
  {
    "prompt": "Insert at front of 5 elements without growth: shifts?",
    "options": [
      "1",
      "5",
      "0"
    ],
    "answer": 1,
    "explanation": "All five existing elements must shift right."
  },
  {
    "prompt": "Erase index 2 from 5 elements: shifts?",
    "options": [
      "2",
      "3",
      "5"
    ],
    "answer": 0,
    "explanation": "Indices 3 and 4 shift left."
  },
  {
    "prompt": "Does grow itself increase size?",
    "options": [
      "Yes",
      "Only when full",
      "No"
    ],
    "answer": 2,
    "explanation": "Only the insertion/append changes logical size."
  },
  {
    "prompt": "Growth by one, n appends: transfer complexity?",
    "options": [
      "Θ(log n)",
      "Θ(n²)",
      "Θ(n)"
    ],
    "answer": 1,
    "explanation": "Transfers sum 0+1+…+(n−1)."
  },
  {
    "prompt": "Doubling, 9 appends: total old-element transfers?",
    "options": [
      "15",
      "8",
      "9"
    ],
    "answer": 0,
    "explanation": "1+2+4+8=15."
  },
  {
    "prompt": "Worst case for a growing append?",
    "options": [
      "Θ(1)",
      "Θ(log n)",
      "Θ(n)"
    ],
    "answer": 2,
    "explanation": "It transfers the existing n elements."
  },
  {
    "prompt": "Amortized append under geometric growth?",
    "options": [
      "Θ(log n)",
      "Θ(1)",
      "Θ(n)"
    ],
    "answer": 1,
    "explanation": "Total work over n appends is Θ(n)."
  },
  {
    "prompt": "Does amortized analysis require probabilities?",
    "options": [
      "No",
      "Yes",
      "Only for doubling"
    ],
    "answer": 0,
    "explanation": "It bounds total cost over a sequence."
  },
  {
    "prompt": "Peak buffer slots when growing from 8 to 16?",
    "options": [
      "16",
      "8",
      "24"
    ],
    "answer": 2,
    "explanation": "Both allocations coexist during transfer."
  },
  {
    "prompt": "Existing element pointer after reallocation?",
    "options": [
      "Always valid",
      "Invalid",
      "Automatically updated"
    ],
    "answer": 1,
    "explanation": "The old allocation lifetime ended."
  },
  {
    "prompt": "Append without reallocation: existing element references?",
    "options": [
      "Remain valid",
      "All invalid",
      "Move automatically"
    ],
    "answer": 0,
    "explanation": "Existing elements remain in place."
  },
  {
    "prompt": "Insert without reallocation: handles at or after insertion?",
    "options": [
      "All valid",
      "Only first invalid",
      "Invalidated"
    ],
    "answer": 2,
    "explanation": "The standard invalidates handles at or after insertion."
  },
  {
    "prompt": "Old end iterator after append without growth?",
    "options": [
      "Points to new end",
      "Invalidated",
      "Always valid"
    ],
    "answer": 1,
    "explanation": "The previous past-the-end iterator is invalidated."
  },
  {
    "prompt": "Shallow copy of raw owning pointer creates?",
    "options": [
      "Two owners of same storage",
      "Independent buffers",
      "A move"
    ],
    "answer": 0,
    "explanation": "This can lead to double deletion."
  },
  {
    "prompt": "Modify a deep copy: source changes?",
    "options": [
      "Yes",
      "Only for ints",
      "No"
    ],
    "answer": 2,
    "explanation": "Independent buffers isolate modifications."
  },
  {
    "prompt": "What should the destructor do?",
    "options": [
      "Increase capacity",
      "Release owned storage once",
      "Release all aliases"
    ],
    "answer": 1,
    "explanation": "RAII ties resource release to lifetime."
  },
  {
    "prompt": "Is full Rule of Five required in Week 3 lab?",
    "options": [
      "No",
      "Yes",
      "Only copy assignment"
    ],
    "answer": 0,
    "explanation": "The lab requires deep-copy construction and deletes copy assignment."
  },
  {
    "prompt": "Which traversal typically exploits spatial locality?",
    "options": [
      "Scattered",
      "Random pointer chasing",
      "Sequential"
    ],
    "answer": 2,
    "explanation": "Nearby addresses tend to share cache lines."
  },
  {
    "prompt": "Which workload favors a dynamic array?",
    "options": [
      "Frequent front insertion",
      "Frequent indexed reads and appends",
      "Stable addresses across growth"
    ],
    "answer": 1,
    "explanation": "Contiguous storage supports direct indexing and amortized append."
  }
];
