#!/usr/bin/env bash
set -euo pipefail

required_commands=(g++ cmake gdb git)

for command_name in "${required_commands[@]}"; do
    if ! command -v "${command_name}" >/dev/null 2>&1; then
        echo "Missing required command: ${command_name}" >&2
        exit 1
    fi
done

mkdir -p build/manual

cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build --parallel 2
ctest --test-dir build --output-on-failure

echo
echo "Week 1 environment ready."
echo "Compiler: $(g++ -dumpfullversion -dumpversion)"
echo "Open assignment.md and begin with src/hello.cpp."
