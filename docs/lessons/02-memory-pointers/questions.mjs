export const questions = [
  [
    "What does &x produce?",
    "An address of x",
    "The value of x",
    "A copy of x",
    "Address-of produces a pointer to the object."
  ],
  [
    "What does *p denote for a valid int*?",
    "The int object designated by p",
    "The pointer's own address",
    "The number of bytes allocated",
    "Dereferencing designates the target."
  ],
  [
    "Two distinct live int objects contain 7. Must they have the same address?",
    "No",
    "Yes",
    "Only if both are automatic",
    "Equal values do not imply identical objects."
  ],
  [
    "What does sizeof(p) measure for int* p?",
    "Size of the pointer object",
    "Size of the pointed-to allocation",
    "Number of reachable objects",
    "Pointer size is independent of target allocation size."
  ],
  [
    "Are addresses of separate local variables guaranteed consecutive?",
    "No",
    "Yes",
    "Only with int",
    "The language does not guarantee this layout."
  ],
  [
    "What does nullptr represent?",
    "A null pointer value",
    "A live zero-valued integer",
    "An automatically allocated object",
    "Null means no designated object."
  ],
  [
    "int x=3; int* r=&x; *r=12; What is x?",
    "12",
    "3",
    "Undefined",
    "The write modifies x."
  ],
  [
    "int a=4,b=9; int* r=&a; int* s=r; r=&b; What does *s read?",
    "4",
    "9",
    "nullptr",
    "The pointer copy is independent of later reassignment."
  ],
  [
    "int a=2; int b=a; b=5; What is a?",
    "2",
    "5",
    "Undefined",
    "Ordinary int copying creates a distinct object."
  ],
  [
    "int a=2; int& b=a; b=5; What is a?",
    "5",
    "2",
    "Undefined",
    "A reference aliases its original object."
  ],
  [
    "Can a C++ reference be reseated by assignment?",
    "No",
    "Yes",
    "Only if non-const",
    "Assignment through a reference changes its target, not binding."
  ],
  [
    "When does a block-local int normally end its lifetime?",
    "When its block exits",
    "When an observer becomes null",
    "Only on delete",
    "Automatic storage duration is tied to its block."
  ],
  [
    "Does a pointer to a local object extend that object's lifetime?",
    "No",
    "Yes",
    "Only if copied",
    "Raw pointers do not extend target lifetime."
  ],
  [
    "Can a non-null pointer be dangling?",
    "Yes",
    "No",
    "Only for arrays",
    "A non-null address does not prove a live target."
  ],
  [
    "After a target dies, does an external raw pointer automatically become nullptr?",
    "No",
    "Yes",
    "Only after scope exit",
    "The pointer object and target are distinct."
  ],
  [
    "What is necessary before reading *p?",
    "A live compatible target and valid access",
    "Only p != nullptr",
    "Only p was initialized once",
    "Lifetime and access validity matter."
  ],
  [
    "What does new int{6} create?",
    "A dynamically allocated initialized int",
    "A local automatic pointer only",
    "A copy of the pointer variable",
    "new creates an object and returns its address."
  ],
  [
    "What does delete p end for a valid scalar allocation?",
    "The target object's lifetime",
    "The lifetime of the pointer variable",
    "All enclosing scopes",
    "The pointer variable itself remains."
  ],
  [
    "What happens when delete is applied to nullptr?",
    "No effect",
    "A guaranteed crash",
    "A new allocation",
    "Deleting null is allowed."
  ],
  [
    "Does p=nullptr release the allocation?",
    "No",
    "Yes",
    "Only when p owns it",
    "Raw pointer assignment does not release resources."
  ],
  [
    "Does copying a raw pointer automatically transfer ownership?",
    "No",
    "Yes",
    "Only for int*",
    "Ownership is a design responsibility."
  ],
  [
    "What is wrong with delete &x for a local int x?",
    "x was not allocated by compatible new",
    "x is not initialized",
    "x is too small",
    "Automatic storage is not released with delete."
  ],
  [
    "What does heap-use-after-free report?",
    "Access after a dynamic allocation was released",
    "A memory leak only",
    "A compile-time syntax error",
    "The report identifies an invalid access after release."
  ],
  [
    "A program with undefined behavior prints the expected number. Is it proven safe?",
    "No",
    "Yes",
    "Only in debug mode",
    "Observed output does not establish correctness."
  ],
  [
    "What should you inspect in an ASan use-after-free report?",
    "Access, release and allocation sites",
    "Only the last output line",
    "Only the program exit code",
    "The sites explain the lifetime violation."
  ],
  [
    "What is the correct counterpart to new int[5]?",
    "delete[]",
    "delete",
    "free",
    "Array allocation requires matching array deletion."
  ],
  [
    "What does current->next access?",
    "The next pointer member of the designated node",
    "The following array index",
    "A copied node",
    "Arrow syntax accesses a member through a pointer."
  ],
  [
    "A→B→C becomes A→C. Is B automatically destroyed?",
    "No",
    "Yes",
    "Only if B is a struct",
    "Rewiring changes reachability, not lifetime."
  ],
  [
    "Time for iterative traversal of n live null-terminated nodes?",
    "Θ(n)",
    "Θ(1)",
    "Θ(log n)",
    "Every node is visited once."
  ],
  [
    "Auxiliary space for ordinary iterative traversal with one current pointer?",
    "Θ(1)",
    "Θ(n)",
    "Θ(n²)",
    "The existing nodes are representation storage, not traversal auxiliary space."
  ]
];
export const challenges = [
  [
    "Null dereference",
    "int* p = nullptr;\nstd::cout << *p;",
    "Guard against null before dereferencing.",
    "A pointer must designate a live object; nullptr designates none.",
    "Allocate memory on every read.",
    "Delete the pointer variable."
  ],
  [
    "Use after scope",
    "int* p = nullptr;\n{ int x = 8; p = &x; }\nstd::cout << *p;",
    "Use x only while its lifetime is active.",
    "An external pointer does not extend an automatic object's lifetime.",
    "Check only p != nullptr.",
    "Use a larger int."
  ],
  [
    "Use after free",
    "int* r = new int{9};\ndelete r;\nstd::cout << *r;",
    "Read before releasing the allocation.",
    "Deletion ends the target lifetime.",
    "Print twice.",
    "Set r to nullptr then read."
  ],
  [
    "Double deletion",
    "int* r = new int{6};\ndelete r;\ndelete r;",
    "Release exactly once; reset the responsible pointer.",
    "The second delete has an invalid pointer value.",
    "Allocate a larger value initially.",
    "Delete again through an alias."
  ],
  [
    "Lost allocation",
    "int* r = new int{7};\nr = nullptr;",
    "Release the allocation before losing its last handle.",
    "Null assignment changes a pointer, not object lifetime.",
    "Call delete r after nulling it.",
    "Make r const after the assignment."
  ],
  [
    "Overwrite owner",
    "int* r = new int{1};\nr = new int{2};",
    "Release or transfer the first allocation before overwriting r.",
    "The first allocation remains live but unreachable.",
    "Delete the second allocation twice.",
    "Replace new with address-of a temporary."
  ],
  [
    "Dangling observer",
    "int* r = new int{3};\nint* s = r;\ndelete r;\nr = nullptr;\nstd::cout << *s;",
    "Stop using s before the allocation is released.",
    "Resetting r does not reset s.",
    "Check only r for null.",
    "Copy s into another pointer."
  ],
  [
    "Automatic object deletion",
    "int x = 7;\nint* r = &x;\ndelete r;",
    "Do not delete an automatic object.",
    "delete requires a compatible dynamically allocated target (or nullptr).",
    "Set x to zero first.",
    "Use delete[] r."
  ],
  [
    "Wrong array release",
    "int* r = new int[3];\ndelete r;",
    "Use delete[] for storage obtained with new[].",
    "Allocation and deallocation forms must match.",
    "Use three scalar deletes.",
    "Reset r before deleting."
  ],
  [
    "Lost responsibility",
    "int* r = new int{2};\nint* s = r;\nr = nullptr;",
    "Assign responsibility to s and release once when finished.",
    "Reachability remains; ownership must be clear.",
    "Delete both r and s twice.",
    "Assume assignment deletes the object."
  ]
];
export const diagnostics = [
  {
    "title": "Heap use after free",
    "report": "ERROR: AddressSanitizer: heap-use-after-free\nREAD of size 4 at sample.cpp:12\nfreed by thread T0 at sample.cpp:10\npreviously allocated at sample.cpp:7",
    "prompt": "Which line performs the invalid access?",
    "options": [
      "7",
      "10",
      "12"
    ],
    "correct": 2,
    "explanation": "Line 12 reads after line 10 released the allocation created on line 7."
  },
  {
    "title": "Double free",
    "report": "ERROR: AddressSanitizer: attempting double-free\nat sample.cpp:9\nfreed by thread T0 at sample.cpp:8\npreviously allocated at sample.cpp:5",
    "prompt": "Which line performed the first release?",
    "options": [
      "5",
      "8",
      "9"
    ],
    "correct": 1,
    "explanation": "Line 8 releases the allocation; line 9 attempts the second release."
  },
  {
    "title": "Heap buffer overflow",
    "report": "ERROR: AddressSanitizer: heap-buffer-overflow\nWRITE of size 4 at sample.cpp:11\n0 bytes after a 12-byte region\nallocated at sample.cpp:6",
    "prompt": "What failed?",
    "options": [
      "Access outside allocated bounds",
      "Pointer copy",
      "Scope entry"
    ],
    "correct": 0,
    "explanation": "The write is outside the 12-byte allocation; lifetime alone is not enough."
  },
  {
    "title": "Stack use after scope",
    "report": "ERROR: AddressSanitizer: stack-use-after-scope\nREAD of size 4 at sample.cpp:13\naddress is located in stack frame of main\nobject x at sample.cpp:8",
    "prompt": "What condition failed?",
    "options": [
      "Allocation size",
      "Object lifetime",
      "Pointer size"
    ],
    "correct": 1,
    "explanation": "The automatic object x is no longer alive at the read."
  }
];
