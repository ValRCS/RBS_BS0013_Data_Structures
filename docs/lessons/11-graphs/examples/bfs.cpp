#include <algorithm>
#include <cassert>
#include <iostream>
#include <queue>
#include <stdexcept>
#include <vector>

using Graph = std::vector<std::vector<int>>;
struct Search {
    std::vector<int> distance, parent;
};

Search bfs(const Graph& adj, int source) {
    if (source < 0 || static_cast<std::size_t>(source) >= adj.size())
        throw std::out_of_range("source");
    // Precondition: all adjacency IDs are valid; vertex count fits int.
    Search s{std::vector<int>(adj.size(), -1), std::vector<int>(adj.size(), -1)};
    std::queue<int> frontier;
    s.distance[source] = 0;
    frontier.push(source);
    while (!frontier.empty()) {
        const int u = frontier.front();
        frontier.pop();
        for (int v : adj[u]) {
            if (s.distance[v] != -1) continue;
            s.distance[v] = s.distance[u] + 1;
            s.parent[v] = u;
            frontier.push(v);
        }
    }
    return s;
}

std::vector<int> path_to(const Search& s, int target) {
    if (target < 0 || static_cast<std::size_t>(target) >= s.distance.size())
        throw std::out_of_range("target");
    if (s.distance[target] == -1) return {};
    std::vector<int> path;
    for (int v = target; v != -1; v = s.parent[v]) path.push_back(v);
    std::reverse(path.begin(), path.end());
    return path;
}

int main() {
    const Graph adj{{1,3},{2},{0},{},{}};
    const auto s = bfs(adj, 0);
    assert((s.distance == std::vector<int>{0,1,2,1,-1}));
    assert((path_to(s, 2) == std::vector<int>{0,1,2}));
    assert(path_to(s, 4).empty());
    assert((path_to(s, 0) == std::vector<int>{0}));
    for (int d : s.distance) std::cout << d << ' ';
    std::cout << '\n';
}
