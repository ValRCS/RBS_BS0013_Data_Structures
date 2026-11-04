# Week 11 — Codespaces instructions

## Update your existing fork
Save or commit earlier work before merging. From repository root:
```bash
git status
git remote -v
```
If `upstream` is absent, run once:
```bash
git remote add upstream https://github.com/ValRCS/RBS_BS0013_Data_Structures.git
```
Then:
```bash
git switch main
git fetch upstream
git merge upstream/main
git push origin main
```
Resolve conflicts rather than resetting or force-pushing. Commit local changes first if your tree is dirty.

## Work
```bash
cd labs/week11
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build
ctest --test-dir build --output-on-failure
```
Edit `src/graph.cpp` only for the eight implementation TODOs. Add tests under `tests/`. Run `bash scripts/check-week11.sh`, complete `reflection.md`, commit/push and submit according to Moodle.
