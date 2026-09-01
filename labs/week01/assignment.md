# Week 1 Practical — C++ Toolchain and Codespaces

**BS0013 Data Structures**  
Riga Business School, Riga Technical University

## Purpose

This first practical is primarily about becoming comfortable with the development environment that we will use throughout the course.

Today you will work with:

- GitHub Codespaces;
- Visual Studio Code;
- an Ubuntu Linux environment;
- the terminal;
- the GNU C++ compiler;
- compiler warnings and errors;
- a debugger;
- Git;
- small C++ programs using `std::vector`, functions and references.

This is not intended to be a difficult programming assignment.

The objective is to make sure that you can independently:

> edit → compile → diagnose → run → debug → modify → commit

A C++ program.

---

# 1. Starting a Codespace

Open the student repository link provided by the instructor. Work in **your own fork**
unless the instructor explicitly gives different instructions.

1. Confirm that the repository owner shown on GitHub is your GitHub username.
2. Select **Code → Codespaces → Create codespace on main**.
3. Use the default 2-core machine configuration.
4. Wait until the terminal reports `BS0013 environment ready.`

If that root setup message does not appear, run this from the repository root:

```bash
bash scripts/check-environment.sh
```

Now enter the Week 1 practical folder and run its setup check:

```bash
cd labs/week01
bash scripts/check-environment.sh
```

Wait until the terminal reports `Week 1 environment ready.` Then open `assignment.md` and continue below.

A Codespace gives you a development environment running on a remote Linux system.

Your browser displays the interface, but your C++ programs do **not** execute inside the browser.

Conceptually:

```text
your computer
    |
    | browser
    v
Visual Studio Code interface
    |
    | network
    v
GitHub Codespace
    |
    +-- Linux
    +-- files
    +-- compiler
    +-- debugger
    +-- Git
    +-- your program
```

This distinction becomes important later when we work with memory, processes and debugging.

---

# 2. Orient yourself in Visual Studio Code

Identify these parts of the interface:

- Explorer;
- editor;
- integrated terminal;
- Source Control;
- Run and Debug;
- Extensions.

You will use the **Explorer**, **editor** and **terminal** constantly.

Open a terminal if one is not already visible.

Typical shortcut:

```text
Ctrl + `
```

The terminal is a command-line interface to the Linux system running inside your Codespace.

The provided starter repository already contains the files used below:

```text
src/hello.cpp
src/broken.cpp
src/warning.cpp
src/value_reference.cpp
src/vector_basics.cpp
src/copy_alias.cpp
src/sequence.cpp
reflection.md
```

You will edit these files rather than spending the practical session creating a project layout.

---

# 3. A very small Ubuntu/Linux survival kit

You do not need to become a Linux administrator.

For this course, however, you should understand a few basic shell commands.

Try:

```bash
pwd
```

`pwd` means **print working directory**.

It tells you where you currently are.

Now:

```bash
ls
```

This lists files and directories.

Try:

```bash
ls -la
```

The `-l` and `-a` options display more information, including normally hidden files.

Try:

```bash
whoami
```

and:

```bash
uname -a
```

You are working in Linux even if your own computer runs Windows or macOS.

### Moving between directories

```bash
cd directory_name
```

Move upward:

```bash
cd ..
```

Return to the repository directory if necessary before continuing.

### Useful commands

You will gradually encounter:

```text
pwd      where am I?
ls       what is here?
cd       change directory
cat      display a text file
mkdir    create directory
cp       copy
mv       move/rename
rm       remove
clear    clear terminal
```

Be especially careful with `rm`.

Linux normally does not move terminal-deleted files into a Recycle Bin.

---

# 4. Inspect the development tools

Run:

```bash
g++ --version
```

This is the GNU C++ compiler.

Also try:

```bash
git --version
```

and:

```bash
gdb --version
```

You do not need to memorize the version numbers.

The important point is that our course environment already contains the tools required to develop C++ programs.

---

# 5. Your first compilation

Open:

```text
src/hello.cpp
```

Use:

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, data structures!\n";
    return 0;
}
```

Compile it manually:

```bash
mkdir -p build/manual
g++ -std=c++20 -Wall -Wextra -Wpedantic src/hello.cpp -o build/manual/hello
```

If compilation succeeds, run:

```bash
./build/manual/hello
```

Expected output:

```text
Hello, data structures!
```

## What just happened?

The command:

```text
g++
```

runs the compiler.

```text
-std=c++20
```

asks the compiler to use the C++20 language standard.

```text
-Wall -Wextra -Wpedantic
```

enable useful compiler warnings.

```text
src/hello.cpp
```

is our source file.

```text
-o build/manual/hello
```

says that the resulting executable should be called `hello`.

So:

```text
src/hello.cpp
    |
    | compiler
    v
build/manual/hello
    |
    | execute
    v
program output
```

### Question

Why does the command name include an explicit path:

```bash
./build/manual/hello
```

rather than:

```bash
hello
```

We will discuss the answer briefly in class.

---

# 6. Source code is not the executable

Run:

```bash
ls -l src/hello.cpp build/manual/hello
```

You should see both:

```text
src/hello.cpp
build/manual/hello
```

These are different things.

`src/hello.cpp` is text containing C++ source code.

`build/manual/hello` is a compiled executable program.

Try:

```bash
file src/hello.cpp
```

and:

```bash
file build/manual/hello
```

Compare the results.

This distinction matters:

```text
source code ≠ executable program
```

---

# 7. Break the program

Programming involves errors.

Understanding diagnostics is more useful than trying never to make mistakes.

Make this deliberate error:

```cpp
std::cout << "Hello, data structures!\n"
```

Remove the semicolon.

Compile again.

Do not immediately fix it.

Read the diagnostic.

Try to identify:

1. the file;
2. the line;
3. the position on the line;
4. the error message.

Now fix the program and compile again.

---

# 8. Compiler diagnostics exercise

Open the provided file:

```text
src/broken.cpp
```

It contains several errors.

Your task is to make it compile correctly.

Use:

```bash
g++ -std=c++20 -Wall -Wextra -Wpedantic src/broken.cpp -o build/manual/broken
```

Work iteratively.

Do **not** attempt to fix everything before recompiling.

Use this cycle:

```text
compile
   ↓
read first useful diagnostic
   ↓
inspect code
   ↓
make one correction
   ↓
compile again
```

Possible problems may include:

- syntax errors;
- incorrect types;
- missing headers;
- incorrect names;
- warnings;
- logical mistakes.

## Important principle

The compiler is not merely rejecting your program.

It is giving you information.

Learning to read compiler diagnostics is part of learning C++.

---

# 9. Warning versus error

Open `src/warning.cpp`. It contains:

```cpp
#include <iostream>

int main() {
    int value = 42;
    int unused = 100;

    std::cout << value << '\n';
}
```

Compile with:

```bash
g++ -std=c++20 -Wall -Wextra -Wpedantic src/warning.cpp -o build/manual/warning
```

The program may compile successfully but still produce a warning.

Discuss:

- Did compilation succeed?
- What is the compiler warning about?
- Why might warnings matter even if the program runs?

Our course code should normally be reasonably warning-clean.

---

# 10. Predict → compile → explain

For the next exercises, do not immediately run the program.

Use the following workflow:

```text
1. Predict
2. Compile
3. Run
4. Compare
5. Explain
```

Being able to predict program behavior is more important than merely obtaining output.

---

# 11. Pass by value

Open `src/value_reference.cpp`. It initially contains:

```cpp
#include <iostream>

void increment(int x) {
    ++x;
}

int main() {
    int value = 10;

    increment(value);

    std::cout << value << '\n';
}
```

Before running it:

**What will it print?**

Write down your prediction.

Now compile and run it.

Explain why the result occurs.

---

# 12. Pass by reference

Change:

```cpp
void increment(int x)
```

to:

```cpp
void increment(int& x)
```

Predict again.

Compile and run.

What changed?

Explain the difference between:

```cpp
int x
```

and:

```cpp
int& x
```

---

# 13. Working with `std::vector`

Open `src/vector_basics.cpp`. It initially contains:

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> values{10, 20, 30};

    values.push_back(40);

    for (int value : values) {
        std::cout << value << ' ';
    }

    std::cout << '\n';
}
```

Compile and run it.

Now modify the program so the vector contains:

```text
10 20 30 40 50
```

Print:

1. all values;
2. the number of elements;
3. the first element;
4. the last element.

---

# 14. Copy or alias?

Open `src/copy_alias.cpp`. It contains this experiment:

```cpp
std::vector<int> a{1, 2, 3};

auto b = a;
auto& c = a;

b[0] = 10;
c[1] = 20;

a.push_back(4);
```

Without running the program, predict:

```text
a = ?
b = ?
c = ?
```

Then write code to print all three containers and test your prediction.

## Explain

What happened when we wrote:

```cpp
auto b = a;
```

What happened when we wrote:

```cpp
auto& c = a;
```

This distinction will become increasingly important when our structures become larger and more complicated.

---

# 15. Mini-task — analysing a sequence

Open `src/sequence.cpp`. Its starter code contains:

```cpp
std::vector<int> values{12, 7, 18, 4, 21, 9};
```

Implement:

```cpp
void print_values(const std::vector<int>& values);
```

The function should print all values.

Implement:

```cpp
int sum(const std::vector<int>& values);
```

The function should return their sum.

Implement:

```cpp
void add_to_all(std::vector<int>& values, int amount);
```

The function should add `amount` to every element.

For example:

```cpp
add_to_all(values, 5);
```

should transform:

```text
12 7 18 4 21 9
```

into:

```text
17 12 23 9 26 14
```

Your program should:

1. print the original vector;
2. print its sum;
3. add `5` to every value;
4. print the modified vector;
5. print the new sum.

---

# 16. Experiment: deliberately use the wrong parameter type

Change:

```cpp
void add_to_all(std::vector<int>& values, int amount)
```

to:

```cpp
void add_to_all(std::vector<int> values, int amount)
```

Compile and run again.

What happens?

The function itself still modifies something.

So why does the vector in `main()` remain unchanged?

Restore the correct version afterwards.

---

# 17. Using the debugger

Running a program tells us what happened.

A debugger helps us observe **how** it happened.

Open the **Run and Debug** panel in Visual Studio Code.

Make sure `src/sequence.cpp` is the active editor file. Press **F5** or select
**C++: debug active file**. The repository task compiles the active file with debugging
information before launching GDB.

Set a breakpoint inside:

```cpp
add_to_all(...)
```

Run the program under the debugger.

When execution stops:

1. inspect `values`;
2. inspect `amount`;
3. step through one loop iteration;
4. observe one element changing;
5. continue execution.

The exact buttons are less important than understanding the idea:

```text
breakpoint
    ↓
pause execution
    ↓
inspect state
    ↓
execute one step
    ↓
inspect changed state
```

Later we will use this extensively for pointers, linked structures, trees and memory errors.

---

# 18. Useful ways to get help

Professional programmers do not memorize every command and every library function.

They know how to find information.

## Compiler help

Try:

```bash
g++ --help
```

You do not need to read all of it.

## Linux manual

For some commands:

```bash
man ls
```

Press:

```text
q
```

to exit.

## VS Code

Useful features include:

- hover information;
- syntax highlighting;
- autocomplete;
- Go to Definition;
- error/warning underlining;
- debugger variable inspection.

## C++ reference

For details about the C++ standard library, **cppreference** is one of the main reference sources used in this course.

For example, search for:

```text
cppreference vector push_back
```

Do not attempt to memorize the entire `std::vector` interface.

Learn how to find the operation you need.

---

# 19. AI assistants and external help

AI tools can be useful for:

- explaining compiler diagnostics;
- explaining unfamiliar syntax;
- generating small examples;
- suggesting possible debugging steps;
- comparing two pieces of code.

They are much less useful if you simply copy code that you do not understand.

A useful question is:

```text
Explain this compiler error and identify what part of my code
I should inspect. Do not rewrite the entire program.
```

Less useful:

```text
Do my assignment.
```

For assessed work you must be able to explain the code you submit, regardless of which tools helped you produce it.

---

# 20. Check your repository state

Run:

```bash
git status
```

You should see the files you created or modified.

Inspect your changes:

```bash
git diff
```

If this lab uses your personal course repository, commit your completed work according to the instructor's instructions.

Typical workflow:

```bash
git add src reflection.md
git status
git commit -m "Complete week 01 lab"
git push
```

Notice that we run:

```bash
git status
```

before committing.

This lets us see what we are about to record.

---

# 21. Short reflection

Before finishing, answer these questions.

Record your answers in `reflection.md`.

### 1.

What is the difference between:

```text
src/hello.cpp
```

and:

```text
build/manual/hello
```

after compilation?

### 2.

What is the purpose of:

```bash
-Wall -Wextra -Wpedantic
```

?

### 3.

What is the difference between:

```cpp
void f(std::vector<int> values)
```

and:

```cpp
void f(std::vector<int>& values)
```

?

### 4.

Why might this be useful?

```cpp
void print(const std::vector<int>& values)
```

### 5.

What Linux command shows the current directory?

### 6.

What Git command tells you which files have been modified?

---

# 22. Completion checklist

Before leaving, verify that you can do all of the following.

- [ ] Open the course environment in Codespaces.
- [ ] Locate files using VS Code Explorer.
- [ ] Open the integrated terminal.
- [ ] Use `pwd`, `ls` and `cd`.
- [ ] Check the C++ compiler version.
- [ ] Compile a `.cpp` file manually.
- [ ] Run the resulting executable.
- [ ] Interpret a basic compiler error.
- [ ] Recognize a compiler warning.
- [ ] Use `std::vector`.
- [ ] Explain pass-by-value versus pass-by-reference.
- [ ] Set a breakpoint and inspect variables.
- [ ] Run `git status`.
- [ ] Inspect changes with `git diff`.
- [ ] Preserve your completed work as instructed.

---

# Extension tasks

Complete these only if the core tasks are finished.

## Extension A — minimum and maximum

Implement:

```cpp
int minimum(const std::vector<int>& values);
int maximum(const std::vector<int>& values);
```

Do not use `std::min_element` or `std::max_element` yet.

What should happen if the vector is empty?

---

## Extension B — count occurrences

Implement:

```cpp
int count_value(
    const std::vector<int>& values,
    int target
);
```

Example:

```text
values = 3 7 3 10 3
target = 3

result = 3
```

What is the time complexity of your implementation?

---

## Extension C — explore memory addresses

Try:

```cpp
int a = 10;
int& b = a;

std::cout << &a << '\n';
std::cout << &b << '\n';
```

What do you observe?

Do not worry if the syntax is unfamiliar.

Pointers and addresses are the main topic of Week 2.

---

# What comes next?

Today:

```text
source
  ↓
compile
  ↓
run
  ↓
debug
```

and:

```text
value
copy
reference
vector
```

Next week we will ask:

```text
Where do objects actually live?
What is an address?
What is a pointer?
When does an object stop existing?
Who owns dynamically allocated memory?
```

These questions will prepare us to implement our own dynamic and linked data structures.

---
