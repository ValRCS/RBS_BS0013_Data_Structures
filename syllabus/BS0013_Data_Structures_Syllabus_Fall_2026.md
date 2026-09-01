# BS0013 Data Structures

**Fundamental data structures using modern C++**

**Riga Technical University | Riga Business School**

Academic year 2026/2027 | Fall semester

| **Course code**   | BS0013                                                     |
|-------------------|------------------------------------------------------------|
| **Credit points** | 7 CP                                                       |
| **Language**      | English                                                    |
| **Weekly format** | 2 academic hours lecture + 2 academic hours practical work |
| **Instructor**    | Valdis Saulespurēns                                        |

Syllabus version: 30 August 2026 (revised)

[Course repository](https://github.com/ValRCS/RBS_BS0013_Data_Structures)

Course focus: representation, invariants, implementation, memory, operation complexity, and data-structure selection.

## 1. Course Overview

**Data Structures** is an implementation-oriented computer science course that develops a deep understanding of how fundamental data structures are represented, maintained, analyzed, and selected. C++ is used as the implementation language because it makes memory layout, object lifetime, ownership, pointers, references, templates, and value semantics explicit.

**The course is not intended to repeat a general algorithms course.** Students may already have studied searching, sorting, graph algorithms, dynamic programming, recurrence relations, and other algorithm-design topics in Python. In this course, algorithms are used mainly as workloads that reveal how data representation changes time and space costs. The central question is not merely “Which algorithm should we use?” but also “Which representation makes the required operations efficient and reliable?”

**The course follows the current RTU BS0013 course framework:** C++ implementation, asymptotic reasoning, linear data structures, priority queues, trees, hashing, graphs, and advanced data structures. The official RTU catalogue defines the course as 7 CP and assesses it through written/programming assignments, a midterm, and a final examination.

## 2. Course Positioning and Prerequisites

Prerequisite: Completion of a general programming course in any programming language. Prior C++ coursework is not required.

Programming background expected: Students should already understand variables, expressions, conditionals, loops, functions, collections, basic classes/objects, and elementary debugging. Prior experience may be in Python, Java, JavaScript, C#, C/C++, or another general-purpose programming language.

**C++ bridge:** The first two units establish the minimum C++ model needed to begin implementing data structures: compilation, static types, values and references, basic classes, memory, pointers, and object lifetime. Additional C++ mechanisms—including resource-owning classes, RAII, copying and moving, templates, and iterators—are introduced progressively when required by the data structures studied later in the course. The course does not spend time re-teaching introductory programming concepts such as what a loop or function is.

**Relationship to PBM771 Algorithms:** Many students may previously have taken the Algorithms course taught using Python. BS0013 is designed to complement that course rather than duplicate it. Algorithmic techniques such as Dijkstra shortest paths, dynamic programming, or full sorting-algorithm surveys are not separate lecture units here. When such algorithms appear, they are used to motivate or test a data representation.

## 3. Course Goals

- Develop a practical and conceptual understanding of fundamental abstract data types and their concrete implementations.

- Teach students to create non-trivial data structures in C++ while reasoning correctly about memory ownership, object lifetime, and invariants.

- Develop the ability to analyze the time and space complexity of individual data-structure operations and to recognize trade-offs between alternative representations.

- Connect hand-written implementations with the C++ Standard Library so students understand both how common containers work and when library containers should be preferred in production code.

- Develop sound engineering judgment when selecting data structures for realistic computational workloads.

## 4. Learning Outcomes

After successfully completing the course, a student should be able to:

1. Distinguish an abstract data type from a concrete data-structure implementation and specify the operations and invariants of common ADTs.

2. Use modern C++ constructs required for data-structure implementation, including references, pointers, classes, templates, RAII, object lifetime, iterators, and standard containers.

3. Implement and test dynamic arrays, linked structures, stacks, queues, heaps, search trees, hash tables, graph representations, tries, and selected advanced structures.

4. Explain and maintain structural invariants for linked structures, heaps, binary search trees, balanced trees, and hash tables.

5. Analyze the time and space complexity of data-structure operations using asymptotic notation and, where appropriate, average-case or amortized reasoning.

6. Explain how representation affects algorithmic complexity, memory usage, locality, and practical performance.

7. Compare alternative data structures for the same abstract problem and justify a selection using workload requirements and complexity guarantees.

8. Relate custom implementations to C++ Standard Library containers and understand relevant complexity guarantees and iterator/ownership implications.

9. Read, debug, modify, and explain non-trivial C++ implementations of data structures.

10. Defend design and implementation choices orally or in writing, including code produced with the assistance of external tools.

## 5. Teaching and Learning Format

**Semester structure:** 14 weeks: 13 instructional units plus one dedicated midterm/assessment week.

**Typical weekly pattern:** 2 academic hours of lecture followed by 2 academic hours of practical programming work.

The course uses a lecture-to-implementation cycle:

- Lecture: motivation, ADT, representation, invariants, operation costs, and implementation strategy.

- Practical: students implement, repair, extend, test, or benchmark the structure in C++.

- Reflection: compare the custom implementation with an STL equivalent or with an alternative representation.

Recurring analytical pattern: problem → ADT → representation → invariant → operations → complexity → implementation → tests → library equivalent → engineering choice.

C++ is developed as a vertical implementation-language theme rather than completed as a prerequisite block. Students first acquire the minimum language model needed for the next structure, then revisit ownership, RAII, genericity, copying/moving, and iteration in increasingly concrete contexts.

## 6. Weekly Course Plan

The schedule below is the intended 2026 course sequence. Small adjustments may be made based on cohort progress, public holidays, or timetable constraints; any changes will be announced in Moodle. The Week 7 midterm assesses the fixed instructional scope of Weeks 1–6; if the assessment must be rescheduled for technical or timetable reasons, later material does not automatically enter the midterm scope.

| **Week** | **Instructional Unit**                       | **Lecture Focus**                                                                                                                                                               | **Practical Focus**                                                                                                                 |
|----------|----------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| 1        | C++ Foundations: From Python to C++          | Course model; ADTs and representation; compilation/toolchain; static typing; values and references; `const`; functions; simple structs/classes; `std::string`; `std::vector`.  | Short translation and debugging tasks in Codespaces; compare Python and C++ representations; basic vector experiments.             |
| 2        | Memory, Pointers, and Lifetime               | Objects and addresses; pointers; dereferencing; `nullptr`; automatic vs dynamic storage; object lifetime; dangling pointers; leaks; ownership as a concept; memory-error tools. | Pointer/lifetime traces and memory diagrams; create and repair lifetime errors; use sanitizers/debugger; inspect a tiny node chain.  |
| 3        | Arrays and Dynamic Arrays                    | Contiguous storage; size vs capacity; resizing; amortized append; locality; dynamic arrays; resource-owning classes; constructors/destructors; RAII; copy semantics; move intuition. | Implement a simplified dynamic array/vector-like structure; test resizing and ownership; use sanitizers; compare with `std::vector`. |
| 4        | Linked Structures                            | Nodes; singly and doubly linked lists; head/tail; insertion/deletion; ownership; pointer rewiring; sentinel nodes; locality; first simple generic node/container abstractions. | Implement a linked list; draw before/after pointer states; validate structural and lifetime invariants.                             |
| 5        | Stacks, Queues, and Deques                   | Restricted-access ADTs; array vs linked implementations; circular buffers; adapter pattern; operation guarantees; generic interfaces consolidated.                             | Implement stack/queue/deque operations or a circular queue; apply an ADT in a compact task; compare representations.                |
| 6        | Hash Tables                                  | Dictionary ADT; hash functions; collisions; separate chaining; open addressing; probing; load factor; resizing; expected vs worst-case complexity.                            | Implement a hash table and compare behavior with `std::unordered_map`; experiment with collisions and load factor.                 |
| 7        | MIDTERM / ASSESSMENT UNIT                    | No new instructional topic. Fixed assessment scope: Weeks 1–6 only—C++ implementation fundamentals, memory/lifetime, invariants, representation, complexity, and code reasoning. | Individual supervised programming and reasoning assessment in the official course environment.                                     |
| 8        | Heaps and Priority Queues                    | Complete binary trees stored in arrays; heap invariant; insertion; removal; sift-up/down; heapify; priority-queue interface; O(log n) update operations; first tree-shaped representation. | Implement `BinaryHeap<T>`; test invariant preservation; connect array indices to logical parent/child relationships; compare with `std::priority_queue`. |
| 9        | Trees and Binary Search Trees                | Tree terminology; explicit recursive representation; traversal; BST ordering invariant; search/insert/delete; height; degeneration; O(h) operations.                          | Implement a BST with traversals and deletion; reason about ownership and recursive lifetime; measure balanced vs degenerate cases. |
| 10       | Balanced Search Trees                        | Why balancing matters; rotations; AVL invariants and height maintenance; Red-Black Tree concepts; comparison of balancing strategies; splay trees as enrichment.             | Implement rotations and AVL rebalancing or repair a partially completed implementation; validate BST and balance invariants.       |
| 11       | Graph Data Structures                        | Graph ADT; edge lists; adjacency matrices; adjacency lists; directed/undirected and weighted representations; sparse vs dense graphs; storage and mutation costs.             | Implement at least two graph representations and compare neighbour/edge operations. Known algorithms may be used as workloads.     |
| 12       | Tries and String-Oriented Structures         | Trie/prefix-tree representation; branching and character mapping; prefix operations; compressed/radix variants; alternative child representations; memory trade-offs.        | Implement a trie-based dictionary/prefix index and evaluate alternative child representations and memory/performance trade-offs.   |
| 13       | External-Memory and Advanced Structures      | B-trees and B+ trees; branching factor; node/page design; secondary-storage motivation; locality; selected comparison with skip lists, treaps, or segment/interval trees.     | Guided B-tree operations, page-access analysis, or a restricted implementation exercise; optional advanced-structure comparison.    |
| 14       | STL, Iterators, Synthesis, and Selection     | C++ container taxonomy; vector/list/deque; set/map; unordered containers; priority_queue; iterators and invalidation; RAII/copy/move synthesis; complexity guarantees.        | Comparative benchmark/design task; container selection; portfolio/code defence; cumulative synthesis.                              |

The first six instructional weeks intentionally form a coherent pre-midterm block built around fundamental representations and mostly linear/indexed structures: essential C++, memory/lifetime, contiguous and linked storage, restricted-access ADTs, and hash-based associative lookup. Hashing is not itself a linear data structure, but it naturally synthesizes the earlier array, resizing, linked-storage, and complexity concepts before the midterm.

After the midterm, the course moves into hierarchical and non-linear representations. Week 8 introduces heaps as tree-shaped structures represented implicitly in contiguous storage; Weeks 9–10 then move to explicit pointer-linked binary search trees and balancing. Graphs, tries, and external-memory structures extend the representation theme before the whole course is synthesized through the C++ Standard Library in Week 14.

## 7. Complexity Analysis as a Vertical Theme

Asymptotic analysis is integrated throughout the course rather than isolated in a single algorithms lecture. For every major structure, students are expected to identify and justify the cost of its core operations and the conditions under which those costs hold.

| **Structure**        | **Key operations**                         | **Typical analysis**                                      | **Additional trade-off**             |
|----------------------|--------------------------------------------|-----------------------------------------------------------|--------------------------------------|
| Dynamic array        | index, append, insert, erase               | O(1) indexed access; amortized O(1) append                | reallocation and locality            |
| Linked list          | insert, erase, traverse, find              | O(1) link updates when position known; O(n) search/access | pointer overhead and poor locality   |
| Heap                 | insert, top, remove-top                    | O(1) top; O(log n) updates                                | compact array representation         |
| BST / AVL            | find, insert, erase                        | O(h); O(log n) when balanced                              | ordering vs balancing cost           |
| Hash table           | find, insert, erase                        | expected O(1) under suitable assumptions                  | load factor, collisions, resize cost |
| Graph representation | edge lookup, neighbour iteration, mutation | cost depends strongly on representation                   | sparse vs dense storage              |

## 8. Data-Structure Invariants

A major conceptual objective is learning to state, preserve, and debug invariants. Students should be able to explain not only what an operation does, but what must remain true after the operation finishes.

**Dynamic array:** 0 ≤ size ≤ capacity; live elements occupy the valid logical range.

**Linked list:** Links form a valid chain; head/tail are consistent; size matches reachable nodes.

**Heap:** The tree remains complete and the heap-order relation holds between every parent and child.

**Binary search tree:** All keys in the left subtree precede the node key; all keys in the right subtree follow it, according to the chosen ordering policy.

**AVL tree:** The BST invariant holds and every node satisfies the allowed balance-factor bound.

**Hash table:** Every stored key remains reachable through the table’s collision-resolution strategy.

**Graph representation:** Vertex/edge records and adjacency information remain mutually consistent after updates.

## 9. Practical Work and Programming Assignments

Practical sessions are workshops rather than secondary lectures. Most sessions begin with a concise task briefing and starter code or tests, followed by individual implementation work and a short review/comparison period.

Where appropriate, tasks may be offered in three levels:

- Core: minimum functionality that demonstrates the central concept.

- Standard: the expected complete implementation for the unit.

- Extension: optional or bonus work for deeper genericity, iterators, copy/move behavior, benchmarking, or advanced operations.

The assignment portfolio is expected to include substantial work in the following areas:

- C++ foundations and memory/lifetime exercises (primarily formative).

- Dynamic array / vector-like structure.

- Linked structure and restricted linear ADT implementation.

- Hash table.

- Binary heap / priority queue.

- Binary search tree and balanced-tree work.

- Graph representation.

- Trie or another selected advanced structure.

- Final comparison, benchmark, or code-defence task.

Exact assignment specifications, deadlines, point values, and submission instructions will be published in Moodle. Programming assignments account for 40% of the final course grade. Weekly quizzes and participation account for an additional 10%, bringing the total coursework component to 50%.

## 10. Assessment and Grading

The grading structure for this course offering preserves the overall 50% coursework, 20% midterm, and 30% final-examination framework. The coursework and final-examination components are subdivided as shown below.

| **Assessment component**                    | **Weight** | **Primary evidence**                                                                                   |
|---------------------------------------------|------------|--------------------------------------------------------------------------------------------------------|
| Programming assignments                     | 40%        | Implementation, testing, complexity analysis, design explanations, and practical portfolio             |
| Weekly quizzes and participation            | 10%        | Short cumulative knowledge checks and active participation in instructional/practical work             |
| Midterm examination                         | 20%        | Weeks 1–6 only: C++ fundamentals, memory/lifetime, arrays, linked structures, stacks/queues/deques, hashing, invariants, and complexity |
| Final examination - comprehensive component | 20%        | Cumulative understanding with emphasis on second-half structures, comparison, selection, and synthesis |
| Final examination - timed cumulative quiz   | 10%        | Time-limited cumulative quiz covering the semester quiz question set; graded on a curve                |
| Total                                       | 100%       |                                                                                                        |

### 10.1 Weekly Quizzes and Participation

Weekly quizzes and participation account for 10% of the final course grade. Short quizzes are used throughout the instructional weeks to reinforce terminology, invariants, operation costs, C++ concepts, and comparisons among data structures. Participation may include active engagement in practical tasks and brief in-class checks.

The weekly quiz questions also form the basis of the cumulative timed quiz included in the final examination. Exact quiz timing and participation procedures will be published in Moodle.

### 10.2 Midterm

Week 7 is reserved for the midterm and does not introduce new material. Its **fixed instructional scope is Weeks 1–6**. Heaps, trees, balanced trees, and other post-midterm non-linear structures begin in Week 8 and are not part of the midterm.

If the midterm must be moved to Week 8, Week 9, or another nearby date because of timetable, technical, or institutional constraints, the assessed content remains Weeks 1–6 unless a separate course announcement explicitly changes the scope. Material taught after Week 6 is therefore not automatically added merely because the assessment date moves.

The midterm is expected to combine:

- short reasoning questions about representation, invariants, and complexity;

- code reading/debugging or completion;

- an individual programming task in the official course environment;

- a small design/selection question requiring justification.

### 10.3 Final Examination

The final examination accounts for 30% of the final course grade and is cumulative. It consists of two components:

- Comprehensive final component (20% of the course grade): emphasizes the ability to connect structures rather than reproduce isolated implementations. Students may be asked to compare alternatives, reason about complexity guarantees, identify broken invariants, interpret code, or design a representation for a stated workload.

- Timed cumulative quiz (10% of the course grade): a strictly time-limited speed quiz covering the full set of quiz questions used during the semester. This component is graded on a curve based on cohort performance.

The timed cumulative quiz therefore represents one-third of the final-examination grade.

### 10.4 Code Defence / Show-and-Tell

Selected programming work may be discussed individually near the end of the course. Students may begin with a submission they consider representative of their best work, but the instructor may ask about other submitted assignments. A student must be able to explain significant design choices, invariants, memory behavior, complexity, and relevant implementation details.

## 11. Official Development Environment: GitHub Codespaces

**GitHub Codespaces is the official supported development and assessment environment for the course.** The course repository will provide a Linux-based development container configured for C++ work in Visual Studio Code. The intention is to give every student the same compiler/tooling baseline and minimize time lost to operating-system-specific setup problems.

The reference environment is expected to include:

- Ubuntu Linux development container

- GCC/G++ or another designated C++20-capable compiler

- Visual Studio Code

- Git

- debugging tools such as GDB

- compiler warnings and sanitizers where appropriate

- CMake or simple command-line build tooling where needed

**Local development is permitted but not officially supported.** Students may use Visual Studio, CLion, VS Code, WSL, native Linux, macOS, or other suitable tools on their own computers. However, local installation and configuration problems are the student’s responsibility, and assessed code must compile and run correctly in the official course Codespaces environment.

**Target language standard:** portable C++20 unless an assignment explicitly states otherwise.

## 12. Coding and Submission Expectations

Submitted code should:

- compile in the official course environment without errors;

- be reasonably warning-clean under the compiler flags specified for the assignment;

- use meaningful names and coherent decomposition;

- preserve the required data-structure invariants;

- avoid memory leaks, invalid accesses, double deletion, and other undefined behavior;

- use const-correctness and appropriate value/reference semantics;

- include tests or demonstrate tests when requested;

- state or justify the complexity of important operations;

- use templates where genericity is a learning objective;

- follow assignment-specific restrictions on library containers.

**Implementation assignments versus application assignments:** When the purpose is to learn how a structure works, using an STL container that directly implements the required structure may be prohibited. When the purpose is to solve an application problem, appropriate Standard Library use is generally encouraged. The pedagogical principle is: first understand the structure; then learn when not to reimplement it.

## 13. Role of the C++ Standard Library

The STL is integrated throughout the course rather than postponed to a single late-semester lecture. After implementing a structure, students compare it with the corresponding library abstraction, where applicable:

| **Custom structure / ADT**         | **Relevant C++ library abstraction**           |
|------------------------------------|------------------------------------------------|
| Dynamic array                      | std::vector, std::array                        |
| Linked list                        | std::list, std::forward_list                   |
| Stack / queue / deque              | std::stack, std::queue, std::deque             |
| Priority queue / heap              | std::priority_queue and heap algorithms        |
| Ordered tree-based map/set         | std::map, std::set                             |
| Hash table                         | std::unordered_map, std::unordered_set         |
| General algorithms over containers | iterators, ranges/algorithms where appropriate |

## 14. Learning Resources

**No student is required to purchase a commercial textbook.** RTU students may use O’Reilly Learning titles where access is available, while free/open resources provide a complete fallback if subscription access is unavailable.

### 14.1 Primary Data-Structures Text (O’Reilly Learning)

**Michael T. Goodrich, Roberto Tamassia, David M. Mount —** Data Structures and Algorithms in C++, Second Edition. Wiley, 2011. [O’Reilly Learning](https://www.oreilly.com/library/view/data-structures-and/9780470383278/)

Used primarily for data-structure concepts and implementation patterns. Because the book predates modern C++ standards, its language idioms are supplemented by newer C++ sources and course examples.

### 14.2 Modern C++ Companion Resources (O’Reilly Learning)

**Marc Gregoire — Professional C++, 6th Edition (Wiley, 2024).** Selected reference for modern C++23-era language/library practice, memory management, classes, and STL. [O’Reilly](https://www.oreilly.com/library/view/professional-c-6th/9781394193172/)

**Josh Lospinoso — C++ Crash Course (No Starch Press, 2019).** Useful bridge/reference for the C++ core language, toolchain, classes, pointers, templates, containers, and debugging. [O’Reilly](https://www.oreilly.com/library/view/c-crash-course/9781098122553/)

### 14.3 Free / Open Resources

**Pat Morin — Open Data Structures (C++ edition):** Free open textbook with C++ implementations covering array-based lists, linked lists, skip lists, hashing, trees, heaps, graphs, and external-memory searching. [Link](https://opendatastructures.org/ods-cpp/)

**OpenDSA:** Free interactive data-structures and algorithms material, including visualizations and exercises. [Link](https://opendsa.org/)

**cppreference:** Primary day-to-day technical reference for C++ language and Standard Library container semantics and complexity guarantees. [Link](https://en.cppreference.com/w/cpp/container.html)

**LearnCpp:** Free C++ tutorial/reference useful for students who need additional language support as C++ concepts are introduced progressively throughout the course. [Link](https://www.learncpp.com/)

**VisuAlgo:** Interactive visualizations for many data structures and operations. [Link](https://visualgo.net/en)

Specific weekly readings and optional supplementary materials will be linked from Moodle. Students should treat course examples, assignment specifications, and lecture notes as authoritative for implementation conventions used in assessment.

## 15. Generative AI, External Assistance, and Academic Integrity

Modern programming tools, including generative AI systems, can be useful for explanation, experimentation, and debugging. Their use does not remove the requirement that assessed work demonstrate the student’s own understanding.

Unless an individual assignment states stricter rules:

- AI tools may be used for learning, explanation, brainstorming, and debugging during formative/practical work.

- Students remain fully responsible for every submitted line of code and every written claim.

- Substantial AI-generated or externally obtained code should be disclosed when requested by the assignment.

- Students must be able to explain, debug, modify, and extend submitted work during a code defence.

- Copying another student’s assessed solution or submitting work that the student cannot explain is not acceptable.

- During supervised midterm/final assessments, external AI assistance is not permitted unless the assessment instructions explicitly allow it.

Collaboration on concepts is encouraged. Collaboration on assessed implementation is subject to the rules stated for each assignment. When in doubt, students should ask before sharing code.

## 16. Moodle, Repository, Communication, and Course Changes

**Moodle:** is the authoritative location for weekly materials, assignment statements, deadlines, grades, announcements, and assessment instructions.

**GitHub repository:** contains course code examples, environment configuration, starter code, and selected supporting files.

**Codespaces:** is the official supported coding environment for practical work and programming assessments.

**Course adjustments:** may be made when necessary to account for cohort progress, technical issues, calendar changes, or pedagogical needs. Material changes will be announced in Moodle.

[Course repository: https://github.com/ValRCS/RBS_BS0013_Data_Structures](https://github.com/ValRCS/RBS_BS0013_Data_Structures)

## 17. Course-at-a-Glance

| **Dimension**               | **BS0013 approach**                                                                                                                            |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| Programming language        | Modern C++ (portable C++20 target)                                                                                                             |
| Prior programming           | General programming course in any language; prior C++ is not required                                                                          |
| C++ fundamentals            | Minimum foundation in Weeks 1–2; ownership, RAII, genericity, copying/moving, and iterators introduced progressively in context                 |
| Main emphasis               | Data representation, invariants, implementation, memory, operation complexity, selection                                                       |
| Algorithm overlap           | Minimized; known algorithms are used as workloads rather than retaught as lecture topics                                                       |
| Instructional structure     | 13 instructional units + Week 7 midterm; fixed midterm scope is Weeks 1–6                                                                      |
| Weekly delivery             | 2 academic hours lecture + 2 academic hours practical                                                                                          |
| Official environment        | GitHub Codespaces / Linux / VS Code                                                                                                            |
| Local environments          | Permitted but not officially supported                                                                                                         |
| Assessment                  | Programming assignments 40%; weekly quizzes/participation 10%; midterm 20%; final comprehensive component 20%; final timed cumulative quiz 10% |
| Core implementations        | Dynamic array, linked list, stack/queue, hash table, heap, BST, AVL work, graph representation, trie                                           |
| Advanced comparative topics | Red-Black trees, B/B+ trees, splay/skip/treap/segment structures as selected enrichment                                                        |
| Commercial text purchase    | Not required                                                                                                                                   |
| Open fallback               | Open Data Structures (C++), OpenDSA, cppreference, LearnCpp, VisuAlgo                                                                          |

## 18. Administrative and Technical References

Official RTU BS0013 course catalogue entry: [BS0013 Data Structures](https://stud.rtu.lv/rtu/discpub/o.34799/BS0013_Datu_strukturas)

GitHub Codespaces development-container documentation: [Introduction to dev containers](https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/adding-a-dev-container-configuration/introduction-to-dev-containers)

This syllabus is the proposed teaching implementation for the Fall 2026 delivery of BS0013. The approved RTU course catalogue remains authoritative for formal course status and credit points; this syllabus specifies the planned prerequisite expectations, detailed grading breakdown, teaching organization, and assessment implementation for this offering.

