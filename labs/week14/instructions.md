# Week 14 — Codespaces and existing fork
Save or commit unfinished work before merging. From repository root:
```bash
git status
git remote -v
git remote get-url upstream >/dev/null 2>&1 || git remote add upstream https://github.com/ValRCS/RBS_BS0013_Data_Structures.git
git switch main
git fetch upstream
git merge upstream/main
git push origin main
cd labs/week14
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build
ctest --test-dir build --output-on-failure
```
Initial compilation should succeed; tests intentionally fail until TODOs are complete. Resolve conflicts without hard reset or force push. Edit src/indexes.cpp and tests/test_indexes.cpp.
```bash
cmake -S . -B build-release -DCMAKE_BUILD_TYPE=Release
cmake --build build-release
./build-release/week14_benchmark
./build-release/week14_benchmark 1000
bash scripts/check-week14.sh
```
Optional Debug sanitizer check (GCC/Clang):
```bash
cmake -S . -B build-sanitized -DCMAKE_BUILD_TYPE=Debug -DENABLE_SANITIZERS=ON
cmake --build build-sanitized
ctest --test-dir build-sanitized --output-on-failure
```
Commit and push your work from your fork. A fresh Codespace uses the same root C++20 devcontainer; no extra dependencies.
