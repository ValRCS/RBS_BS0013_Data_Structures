#include <cassert>
#include <iostream>
#include <queue>
#include <vector>

using Graph = std::vector<std::vector<int>>;
// Precondition: directed graph with valid dense IDs.
std::vector<int> topological(const Graph& g) {
    std::vector<std::size_t> indegree(g.size(), 0);
    for (const auto& row : g)
        for (int v : row) ++indegree[v];
    std::queue<int> ready;
    for (int v = 0; v < static_cast<int>(g.size()); ++v)
        if (indegree[v] == 0) ready.push(v);
    std::vector<int> order;
    while (!ready.empty()) {
        const int u = ready.front();
        ready.pop();
        order.push_back(u);
        for (int v : g[u])
            if (--indegree[v] == 0) ready.push(v);
    }
    return order; // Partial order means a cycle prevented completion.
}
int main() {
    const Graph g{{2},{2,3},{4},{4},{5},{}};
    const auto order = topological(g);
    assert(order.size() == g.size());
    std::vector<std::size_t> pos(g.size());
    for (std::size_t i = 0; i < order.size(); ++i) pos[order[i]] = i;
    for (std::size_t u = 0; u < g.size(); ++u)
        for (int v : g[u]) assert(pos[u] < pos[v]);
    assert(topological({{1},{0}}).empty());
    for (int u : order) std::cout << u << ' ';
    std::cout << '\n';
}
