#include <cassert>
#include <iostream>
#include <vector>

using Graph = std::vector<std::vector<int>>;
enum class State { unvisited, active, finished };
// Precondition: valid dense IDs; no parallel edges; symmetric if undirected.
bool visit(const Graph& g, int u, int parent, bool directed,
           std::vector<State>& state) {
    state[u] = State::active;
    for (int v : g[u]) {
        if (!directed && v == parent) continue;
        if (state[v] == State::active) return true;
        if (state[v] == State::unvisited && visit(g,v,u,directed,state)) return true;
    }
    state[u] = State::finished;
    return false;
}
bool has_cycle(const Graph& g, bool directed) {
    std::vector<State> state(g.size(), State::unvisited);
    for (int u = 0; u < static_cast<int>(g.size()); ++u)
        if (state[u] == State::unvisited && visit(g,u,-1,directed,state))
            return true;
    return false;
}
int main() {
    assert(has_cycle({{1,3},{2},{0},{}},true));
    assert(!has_cycle({{1,2},{2},{}},true));
    assert(!has_cycle({{1},{0,2},{1}},false));
    assert(has_cycle({{1,2},{0,2},{0,1}},false));
    assert(has_cycle({{0}},false));
    std::cout << "Cycle checks passed\n";
}
