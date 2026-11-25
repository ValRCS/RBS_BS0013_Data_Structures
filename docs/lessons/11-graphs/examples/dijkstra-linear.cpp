#include <cassert>
#include <iostream>
#include <limits>
#include <optional>
#include <stdexcept>
#include <vector>

using Distance = long long;
constexpr Distance INF = std::numeric_limits<Distance>::max();
using Matrix = std::vector<std::vector<std::optional<Distance>>>;
std::vector<Distance> dijkstra(const Matrix& m, std::size_t source) {
    const auto n = m.size();
    if (source >= n) throw std::out_of_range("source");
    for (const auto& row : m) {
        if (row.size() != n) throw std::invalid_argument("not square");
        for (auto w : row)
            if (w && *w < 0) throw std::invalid_argument("negative weight");
    }
    std::vector<Distance> dist(n, INF);
    std::vector<char> settled(n, false);
    dist[source] = 0;
    for (;;) {
        auto u = n;
        for (std::size_t v = 0; v < n; ++v)
            if (!settled[v] && dist[v] != INF &&
                (u == n || dist[v] < dist[u])) u = v;
        if (u == n) break;
        settled[u] = true;
        for (std::size_t v = 0; v < n; ++v) {
            if (!m[u][v]) continue;
            const auto w = *m[u][v];
            if (w >= INF - dist[u]) throw std::overflow_error("distance");
            const auto candidate = dist[u] + w;
            if (candidate < dist[v]) dist[v] = candidate;
        }
    }
    return dist;
}
int main() {
    Matrix g(5, std::vector<std::optional<Distance>>(5));
    g[0][1]=10; g[0][2]=2; g[2][1]=1; g[1][3]=0;
    const auto d = dijkstra(g, 0);
    assert((d == std::vector<Distance>{0,3,2,3,INF}));
    for (auto x : d) {
        if (x == INF) std::cout << "INF ";
        else std::cout << x << ' ';
    }
    std::cout << '\n';
}
