#include <cassert>
#include <cstddef>
#include <iostream>
#include <vector>

int main() {
    using Vertex = std::size_t;
    std::vector<Vertex> bucket{1, 3};
    bucket.reserve(16);
    const std::vector<std::vector<Vertex>> adj{{1,3},{2},{0},{}};
    std::size_t reserved = adj.capacity() * sizeof(adj[0]);
    for (const auto& row : adj)
        reserved += row.capacity() * sizeof(Vertex);
    assert(bucket.capacity() >= 16);
    std::cout << "ID bytes: " << sizeof(Vertex) << '\n'
              << "Vector object bytes: " << sizeof(bucket) << '\n'
              << "Bucket size: " << bucket.size() << '\n'
              << "Bucket capacity: " << bucket.capacity() << '\n'
              << "Estimated reserved adjacency bytes: " << reserved << '\n';
    // Excludes allocator overhead and the outer vector object.
}
