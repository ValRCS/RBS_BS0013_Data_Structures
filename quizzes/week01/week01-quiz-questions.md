# Week 1 Self-Check Quiz

**Course:** BS0013 Data Structures  
**Format:** Single-answer multiple choice  
**Questions:** 10

Choose the best answer for each question. This public practice set intentionally does not include an answer key or explanations.

## Q01 — Choosing a representation

Two programs store exactly the same one million integers but perform different operations on them. Which information should most directly guide the choice of representation?

- A. The order in which the source files were created
- B. The operations used most often and the constraints they must satisfy
- C. The number of comments in the implementation
- D. The programming language's file extension

## Q02 — ADT versus data structure

Which statement best distinguishes an abstract data type (ADT) from a data structure?

- A. An ADT specifies memory addresses, while a data structure specifies only function names.
- B. An ADT is always slower because it hides implementation details.
- C. An ADT specifies behavior and operations; a data structure provides a concrete representation.
- D. An ADT exists only in C++, while data structures are language-independent.

## Q03 — Identifying an invariant

A class stores its elements in `data_` and also stores the element count separately in `size_`. Which condition must remain true after every valid operation?

- A. `size_` is always equal to `data_.capacity()`
- B. `size_` is always greater than `data_.size()`
- C. `data_` must never reallocate its storage
- D. `size_` is equal to `data_.size()`

## Q04 — Pass by value and pass by reference

What value is printed by the following code?

```cpp
void add_one(int x) {
    ++x;
}

void add_two(int& x) {
    x += 2;
}

int value = 10;
add_one(value);
add_two(value);
std::cout << value;
```

- A. `10`
- B. `12`
- C. `13`
- D. The code does not compile because a reference cannot modify an `int`.

## Q05 — Inspecting a large vector

A function must inspect a very large vector without copying it and must not modify it through the parameter. Which declaration best expresses that contract?

- A. `int maximum(std::vector<int> values);`
- B. `int maximum(std::vector<int>& values);`
- C. `int maximum(const std::vector<int>& values);`
- D. `int maximum(const std::vector<int> values);`

## Q06 — Copying and aliasing

Consider the following code:

```cpp
std::vector<int> a{1, 2, 3};
auto b = a;
auto& c = a;

b[0] = 10;
c[1] = 20;
a.push_back(4);
```

Which final state is correct?

- A. `a` is `[1, 20, 3, 4]`, `b` is `[10, 2, 3]`, and `c` aliases `a`.
- B. `a`, `b`, and `c` are all `[10, 20, 3, 4]`.
- C. `a` is `[1, 2, 3, 4]`, while `b` and `c` are both `[10, 20, 3]`.
- D. `a` is `[10, 2, 3]`, `b` is `[1, 20, 3, 4]`, and `c` aliases `b`.

## Q07 — Contiguous storage and insertion

For a large `std::vector<int>`, which operation is most likely to require moving many existing elements because the elements are stored contiguously?

- A. Reading the element at a valid index
- B. Replacing the element at a valid index
- C. Asking for the current number of elements
- D. Inserting a new element at index 0

## Q08 — Same interface, different cost

Two sequence implementations provide the same public operations: `append`, `size`, and `at`. One uses a dynamic array and the other uses linked nodes. Which conclusion is correct?

- A. Client code may use the same interface, but the operation complexities can differ.
- B. The common interface guarantees identical time and memory costs.
- C. The implementations must use the same memory layout because their method names match.
- D. The linked representation cannot implement an `at` operation at all.

## Q09 — The original name of C++

What was Bjarne Stroustrup's language initially called when he began the work at Bell Labs in 1979?

- A. Objective-C
- B. C with Classes
- C. Simula++
- D. Classes with C

## Q10 — Historical design motivation

Which statement best summarizes the design motivation behind early C++?

- A. Replace compiled systems languages with a purely interpreted language.
- B. Remove low-level control so that all memory decisions become invisible.
- C. Combine C's efficiency and systems control with Simula-inspired classes and abstraction.
- D. Reproduce Python's dynamic typing while preserving only C's syntax.
