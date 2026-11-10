# Week 12 — Codespaces instructions
Save or commit your existing work before merging upstream. From your fork's repository root:
```bash
git status
git remote -v
git remote add upstream https://github.com/ValRCS/RBS_BS0013_Data_Structures.git # only if missing
git switch main
git fetch upstream
git merge upstream/main
git push origin main
cd labs/week12
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build
ctest --test-dir build --output-on-failure
```
Do not reset or force-push if merge conflicts arise. Edit `src/trie.cpp`, add tests, complete `reflection.md`, commit and push, and submit through Moodle. Run `bash scripts/check-week12.sh` before submitting.
