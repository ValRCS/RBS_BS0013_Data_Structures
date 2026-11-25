#include <cassert>
#include <iostream>
#include <optional>
#include <vector>

struct WeightedEdge { int to; int weight; };
int main() {
    const std::vector<std::vector<WeightedEdge>> adj{
        {{1,10},{2,2}}, {{3,0}}, {{1,1}}, {}, {}
    };
    // Matrix has a separate absence state; zero is a legitimate cost.
    std::vector<std::optional<int>> matrix(25);
    matrix[1 * 5 + 3] = 0;
    assert(matrix[8].has_value() && *matrix[8] == 0);
    assert(!matrix[0].has_value());
    assert(adj[1][0].weight == 0);
    std::cout << "1 -> 3: " << *matrix[8] << "\n0 -> 0: absent\n";
}
