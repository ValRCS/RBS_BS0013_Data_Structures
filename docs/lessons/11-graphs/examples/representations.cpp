#include <cassert>
#include <cstddef>
#include <iostream>
#include <utility>
#include <vector>

int main() {
    using Vertex = std::size_t;
    const std::vector<std::pair<Vertex, Vertex>> edges{
        {0, 1}, {0, 3}, {1, 2}, {2, 0}
    };
    // Three preconstructed views of the same directed graph.
    const std::vector<unsigned char> matrix{
        0,1,0,1, 0,0,1,0, 1,0,0,0, 0,0,0,0
    };
    const std::vector<std::vector<Vertex>> adj{{1,3},{2},{0},{}};
    const auto V = adj.size();
    assert(matrix.size() == V * V);
    assert(edges.size() == 4 && adj[3].empty());
    for (Vertex u = 0; u < V; ++u) {
        std::cout << u << ':';
        for (auto v : adj[u]) std::cout << ' ' << v;
        std::cout << '\n';
    }
}
