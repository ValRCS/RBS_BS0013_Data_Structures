# Week 13 — GitHub Codespaces and existing fork instructions

Reuse the existing Codespace in **your fork**. Save or commit unfinished work before updating. Run these commands from the repository root, not from inside an earlier lab:

~~~bash
git status
git remote -v
# Configure upstream once if it is absent:
git remote get-url upstream >/dev/null 2>&1 || git remote add upstream https://github.com/ValRCS/RBS_BS0013_Data_Structures.git
git switch main
git fetch upstream
git merge upstream/main
git push origin main
cd labs/week13
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build
ctest --test-dir build --output-on-failure
~~~

The first compile should succeed. The test failure before completing the TODOs is **expected**. Edit `src/btree.cpp`. After implementing the four TODOs, the public tests should pass.

You can also run AddressSanitizer and UndefinedBehaviorSanitizer on GCC/Clang:

~~~bash
cmake -S . -B build-sanitized -DCMAKE_BUILD_TYPE=Debug -DENABLE_SANITIZERS=ON
cmake --build build-sanitized
ctest --test-dir build-sanitized --output-on-failure
~~~

If Git reports conflicts, examine `git status`, resolve conflicts, then complete the merge. Do not hard-reset or force-push to obtain new course materials. Commit and push your lab work to your fork.
