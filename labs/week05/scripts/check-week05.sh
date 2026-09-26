#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "== Week 5: normal Debug build =="
rm -rf build
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build
ctest --test-dir build --output-on-failure

echo
echo "== Week 5: sanitizer build =="
rm -rf build-sanitize
cmake -S . -B build-sanitize -DCMAKE_BUILD_TYPE=Debug -DENABLE_SANITIZERS=ON
cmake --build build-sanitize
ctest --test-dir build-sanitize --output-on-failure

echo
echo "Week 5 verification completed."
