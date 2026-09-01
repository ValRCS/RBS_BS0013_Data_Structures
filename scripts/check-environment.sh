#!/usr/bin/env bash
set -euo pipefail

required_tools=(g++ gdb cmake git)

for tool in "${required_tools[@]}"; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    echo "Missing required tool: $tool" >&2
    exit 1
  fi
done

echo "BS0013 environment ready."
g++ --version | head -n 1
cmake --version | head -n 1
git --version
