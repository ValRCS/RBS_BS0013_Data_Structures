# Week 10 — Codespaces Instructions

## 1. Update the fork you have used all semester

At the root of your existing Codespace, inspect and save earlier work. Do not discard committed labs.

~~~bash
git status
git remote -v
git add labs/
git commit -m "Save earlier lab work"
~~~

If your tree is clean, skip add/commit. If `upstream` is absent from `git remote -v`, add it **only once**:

~~~bash
git remote add upstream https://github.com/ValRCS/RBS_BS0013_Data_Structures.git
~~~

Synchronize, retaining your commits:

~~~bash
git switch main
git fetch upstream
git merge upstream/main
git push origin main
~~~

If there is a conflict, inspect `git status` and resolve it rather than using force-push or reset.

## 2. Work in the existing starter source

~~~bash
cd labs/week10
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build
ctest --test-dir build --output-on-failure
~~~

The first test run intentionally fails. Edit the five TODOs in `src/int_avl.cpp`—**do not** create a new file, change the public API, or substitute `std::set` for your own implementation. Draw pointer links before implementing rotations.

## 3. Verify and submit

~~~bash
bash scripts/check-week10.sh
~~~

This checks normal and AddressSanitizer/UndefinedBehaviorSanitizer builds. Add tests, answer `reflection.md`, commit/push your changes, and follow Moodle's submission instructions. Do not commit generated `build/` or `build-sanitize/` folders.
