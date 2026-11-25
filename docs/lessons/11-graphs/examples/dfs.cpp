#include <cassert>
#include <cstddef>
#include <iostream>
#include <stack>
#include <vector>

using Graph = std::vector<std::vector<int>>;
struct Trace {
    std::vector<int> entry, exit, order;
    int clock = 0;
};
Trace make_trace(std::size_t n) {
    return {std::vector<int>(n), std::vector<int>(n), {}, 0};
}
void enter(Trace& t, int u) {
    t.entry[u] = ++t.clock;
    t.order.push_back(u);
}
void recursive(const Graph& adj, int u, Trace& t) {
    enter(t, u);
    for (int v : adj[u])
        if (!t.entry[v]) recursive(adj, v, t);
    t.exit[u] = ++t.clock;
}
struct Frame { int u; std::size_t next = 0; };
void iterative(const Graph& adj, int root, Trace& t) {
    std::stack<Frame> frames;
    enter(t, root);
    frames.push({root, 0});
    while (!frames.empty()) {
        auto& f = frames.top();
        if (f.next == adj[f.u].size()) {
            t.exit[f.u] = ++t.clock;
            frames.pop();
            continue;
        }
        const int v = adj[f.u][f.next++];
        if (!t.entry[v]) {
            enter(t, v);
            frames.push({v, 0});
            // Do not use f after changing the stack.
        }
    }
}
int main() {
    // Precondition: valid dense IDs and small graph for recursion/timestamps.
    const Graph adj{{1,3},{2},{0},{},{}};
    auto a = make_trace(adj.size()), b = make_trace(adj.size());
    for (int u = 0; u < static_cast<int>(adj.size()); ++u) {
        if (!a.entry[u]) recursive(adj, u, a);
        if (!b.entry[u]) iterative(adj, u, b);
    }
    assert(a.entry == b.entry && a.exit == b.exit && a.order == b.order);
    assert((a.order == std::vector<int>{0,1,2,3,4}));
    for (int u : a.order)
        std::cout << u << ": " << a.entry[u] << '/' << a.exit[u] << '\n';
}
