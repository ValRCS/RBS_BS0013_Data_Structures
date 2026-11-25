#include <cassert>
#include <iostream>
#include <queue>
#include <vector>

using Graph = std::vector<std::vector<int>>;
// Precondition: valid dense IDs and undirected symmetric adjacency.
std::vector<int> components(const Graph& g) {
    std::vector<int> label(g.size(), -1);
    int component = 0;
    for (int root = 0; root < static_cast<int>(g.size()); ++root) {
        if (label[root] != -1) continue;
        std::queue<int> q;
        label[root] = component;
        q.push(root);
        while (!q.empty()) {
            const int u = q.front();
            q.pop();
            for (int v : g[u]) {
                if (label[v] != -1) continue;
                label[v] = component;
                q.push(v);
            }
        }
        ++component;
    }
    return label;
}
int main() {
    const Graph g{{1,2},{0,2},{0,1},{4},{3,5},{4},{}};
    const auto c = components(g);
    assert((c == std::vector<int>{0,0,0,1,1,1,2}));
    for (int x : c) std::cout << x << ' ';
    std::cout << '\n';
}
