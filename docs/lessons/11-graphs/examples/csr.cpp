#include <cassert>
#include <cstddef>
#include <iostream>
#include <span>
#include <vector>

int main() {
    const std::vector<int> neighbors{1,3,2,0};
    const std::vector<std::size_t> offsets{0,2,3,4,4};
    const auto V = offsets.size() - 1;
    assert(offsets.back() == neighbors.size());
    for (std::size_t u = 0; u < V; ++u) {
        const auto row = std::span<const int>(neighbors).subspan(
            offsets[u], offsets[u+1] - offsets[u]);
        std::cout << u << ':';
        for (int v : row) std::cout << ' ' << v;
        std::cout << '\n';
    }
    assert(offsets[3] == offsets[4]);
}
