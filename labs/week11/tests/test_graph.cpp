#include "graph.hpp"
#include <cassert>
#include <stdexcept>
#include <vector>
#include <iostream>
template<class G> void exercise(bool directed) {
    G g(4,directed);
    assert(g.vertex_count()==4 && g.edge_count()==0);
    assert(g.neighbors(3).empty());
    assert(g.add_edge(0,1));
    assert(!g.add_edge(0,1));
    assert(g.edge_count()==1);
    assert(g.has_edge(0,1));
    assert(g.has_edge(1,0)==!directed);
    assert(g.add_edge(0,3));
    assert((g.neighbors(0)==std::vector<std::size_t>{1,3}));
    assert(g.add_edge(2,2));
    assert(g.edge_count()==3 && g.has_edge(2,2));
    assert(g.remove_edge(2,2));
    assert(!g.remove_edge(2,2));
    assert(g.edge_count()==2);
    assert(g.remove_edge(0,1));
    assert(!g.has_edge(0,1));
    if(!directed) assert(!g.has_edge(1,0));
    assert(g.edge_count()==1);
    bool thrown=false;
    try { g.add_edge(4,0); } catch(const std::out_of_range&) { thrown=true; }
    assert(thrown);
}
int main() {
    exercise<AdjacencyMatrixGraph>(true);
    exercise<AdjacencyMatrixGraph>(false);
    exercise<AdjacencyListGraph>(true);
    exercise<AdjacencyListGraph>(false);
    std::cout << "Week 11 graph tests passed\n";
}
