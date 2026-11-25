export const questions = [
  [
    "ADT",
    "Which describes an ADT? ",
    [
      "A particular byte layout",
      "Operations and their behaviour",
      "The name of a compiler"
    ],
    1,
    "An ADT specifies behaviour independently of implementation."
  ],
  [
    "ADT",
    "A spell checker repeatedly asks whether a word exists. Which operation matters most?",
    [
      "Membership",
      "Remove the first item",
      "Retrieve the largest item"
    ],
    0,
    "Membership is the key operation; choose representation after identifying the workload."
  ],
  [
    "ADT",
    "Access index 4 from the head of a singly linked sequence. How many nodes are visited?",
    [
      "1",
      "4",
      "5"
    ],
    2,
    "With zero-based indexing, visit indices 0 through 4."
  ],
  [
    "ADT",
    "Two representations implement the same ADT. Must their costs be identical?",
    [
      "Yes",
      "No"
    ],
    1,
    "The interface can be identical while representation and operation costs differ."
  ],
  [
    "Build",
    "A required function has a declaration but no definition. When is this usually detected?",
    [
      "Linking",
      "Output verification",
      "Editing only"
    ],
    0,
    "The compiler can accept the declaration; the linker needs a definition."
  ],
  [
    "Build",
    "A missing semicolon usually causes which problem?",
    [
      "Logical error",
      "Compilation error",
      "Runtime exception"
    ],
    1,
    "The source violates the grammar."
  ],
  [
    "Build",
    "The executable produces an incorrect answer without crashing. What is the problem?",
    [
      "Link error",
      "Syntax error",
      "Logical error"
    ],
    2,
    "Correctness must be checked against expected behaviour."
  ],
  [
    "Build",
    "Does an unused-variable warning necessarily prevent building an executable?",
    [
      "No",
      "Yes"
    ],
    0,
    "Warnings generally allow a build unless treated as errors."
  ],
  [
    "Types",
    "What is the type of a variable declared auto x = 7;?",
    [
      "It changes dynamically",
      "int",
      "std::string"
    ],
    1,
    "auto deduces a static type from the initializer."
  ],
  [
    "Types",
    "What is the value of C++ expression 7 / 2 with int operands?",
    [
      "3.5",
      "4",
      "3"
    ],
    2,
    "Integer division truncates toward zero."
  ],
  [
    "Types",
    "Can std::vector<int> directly store a std::string element?",
    [
      "No",
      "Yes"
    ],
    0,
    "The element type is int; a string cannot be implicitly converted to int."
  ],
  [
    "Vector",
    "A vector has size 4. Which is its last valid index?",
    [
      "4",
      "3",
      "5"
    ],
    1,
    "Indices begin at zero."
  ],
  [
    "Vector",
    "Which operation checks bounds and throws if the index is invalid?",
    [
      "v.at(i)",
      "v[i]",
      "v.size()"
    ],
    0,
    "at performs bounds checking; operator[] requires a valid index."
  ],
  [
    "Vector",
    "Insert at index 0 in a vector of six elements. How many existing elements change index?",
    [
      "0",
      "1",
      "6"
    ],
    2,
    "All six existing elements move one logical position to the right."
  ],
  [
    "Vector",
    "Does sizeof(v) measure the storage occupied by all elements of an arbitrary vector?",
    [
      "Yes",
      "No"
    ],
    1,
    "sizeof(v) measures the vector object itself, not its separately allocated element storage."
  ],
  [
    "Objects",
    "Given std::vector<int> a{8,3}; auto b = a; b[0]=1; what is a[0]?",
    [
      "8",
      "1",
      "Undefined"
    ],
    0,
    "b is an independent copy."
  ],
  [
    "Objects",
    "Given int a=4; int& b=a; ++b; what is a?",
    [
      "4",
      "5",
      "0"
    ],
    1,
    "b is an alias for a."
  ],
  [
    "Objects",
    "Given const auto& b=a; can a non-const a still be changed through its own name?",
    [
      "No",
      "Yes"
    ],
    1,
    "The const reference restricts access through b, not all other aliases."
  ],
  [
    "Objects",
    "In Python, a=[8,3]; b=a; b[0]=1. What is a[0]?",
    [
      "8",
      "3",
      "1"
    ],
    2,
    "Both names refer to the same list."
  ],
  [
    "Parameters",
    "Which parameter can change the caller's vector without copying it?",
    [
      "std::vector<int> v",
      "std::vector<int>& v",
      "const std::vector<int>& v"
    ],
    1,
    "A non-const lvalue reference aliases the original vector."
  ],
  [
    "Parameters",
    "Which parameter avoids a vector copy and prohibits modifying it through that parameter?",
    [
      "const std::vector<int>& v",
      "std::vector<int> v",
      "std::vector<int>& v"
    ],
    0,
    "A const reference is a read-only access path."
  ],
  [
    "Parameters",
    "void f(int x){ ++x; } int n=8; f(n); What is n afterwards?",
    [
      "9",
      "Undefined",
      "8"
    ],
    2,
    "The parameter is initialized as a separate object."
  ],
  [
    "Records",
    "What is an invariant?",
    [
      "A property that must hold whenever the structure is valid",
      "A private variable",
      "A compiler warning"
    ],
    0,
    "Operations must preserve the validity conditions of a representation."
  ],
  [
    "Records",
    "Does declaring fields private automatically guarantee that every method preserves an invariant?",
    [
      "Yes",
      "No"
    ],
    1,
    "Methods must enforce the invariant; privacy alone does not prove correctness."
  ]
];
