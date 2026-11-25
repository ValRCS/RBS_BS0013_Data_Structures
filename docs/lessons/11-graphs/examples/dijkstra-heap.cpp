#include <cassert>
#include <functional>
#include <iostream>
#include <limits>
#include <queue>
#include <stdexcept>
#include <utility>
#include <vector>

using Distance = long long;
constexpr Distance INF = std::numeric_limits<Distance>::max();
struct Edge { int to; Distance weight; };
using Graph = std::vector<std::vector<Edge>>;
struct Result { std::vector<Distance> dist; std::vector<int> parent; int stale = 0; };

Result dijkstra(const Graph& adj, int source) {
    if (source < 0 || static_cast<std::size_t>(source) >= adj.size())
        throw std::out_of_range("source");
    for (const auto& row : adj)
        for (const auto& e : row)
            if (e.to < 0 || static_cast<std::size_t>(e.to) >= adj.size() || e.weight < 0)
                throw std::invalid_argument("invalid weighted edge");
    Result r{std::vector<Distance>(adj.size(), INF), std::vector<int>(adj.size(), -1)};
    using Entry = std::pair<Distance, int>;
    std::priority_queue<Entry, std::vector<Entry>, std::greater<Entry>> pending;
    r.dist[source] = 0;
    pending.emplace(0, source);
    while (!pending.empty()) {
        const auto [d, u] = pending.top();
        pending.pop();
        if (d != r.dist[u]) { ++r.stale; continue; }
        for (const auto& e : adj[u]) {
            // INF is reserved; fail explicitly if a candidate cannot be represented.
            if (e.weight >= INF - d) throw std::overflow_error("distance");
            const auto candidate = d + e.weight;
            if (candidate < r.dist[e.to]) {
                r.dist[e.to] = candidate;
                r.parent[e.to] = u;
                pending.emplace(candidate, e.to);
            }
        }
    }
    return r;
}
int main() {
    const Graph g{{{1,10},{2,2}},{{3,0}},{{1,1}},{},{}};
    const auto r = dijkstra(g, 0);
    assert((r.dist == std::vector<Distance>{0,3,2,3,INF}));
    assert((r.parent == std::vector<int>{-1,2,0,1,-1}));
    assert(r.stale == 1);
    for (auto d : r.dist) {
        if (d == INF) std::cout << "INF ";
        else std::cout << d << ' ';
    }
    std::cout << "\nstale: " << r.stale << '\n';
    bool rejected = false;
    try { dijkstra(Graph{{{0,-1}}}, 0); }
    catch (const std::invalid_argument&) { rejected = true; }
    assert(rejected);
}
