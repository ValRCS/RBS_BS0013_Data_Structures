#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cmake -S "$ROOT" -B "$ROOT/build" -DCMAKE_BUILD_TYPE=Debug
cmake --build "$ROOT/build" --parallel 2
ctest --test-dir "$ROOT/build" --output-on-failure
cmake -S "$ROOT" -B "$ROOT/build-sanitize" -DCMAKE_BUILD_TYPE=Debug -DENABLE_SANITIZERS=ON
cmake --build "$ROOT/build-sanitize" --parallel 2
ctest --test-dir "$ROOT/build-sanitize" --output-on-failure
echo "Week 10 checks passed"
