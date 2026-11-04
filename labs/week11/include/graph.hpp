#pragma once
#include <cstddef>
#include <vector>

// Simple unweighted graph, fixed vertices [0, V).
// add/remove return true iff the logical edge set changes.
// Invalid vertex indices throw std::out_of_range.
// neighbors() returns sorted unique vertex IDs.
// Undirected self-loops count as one logical edge.
class AdjacencyMatrixGraph {
public:
    explicit AdjacencyMatrixGraph(std::size_t vertices, bool directed = false);
    std::size_t vertex_count() const noexcept;
    std::size_t edge_count() const noexcept;
    bool add_edge(std::size_t u, std::size_t v);
    bool remove_edge(std::size_t u, std::size_t v);
    bool has_edge(std::size_t u, std::size_t v) const;
    std::vector<std::size_t> neighbors(std::size_t u) const;
private:
    void check(std::size_t u) const;
    std::size_t n_, edges_ = 0;
    bool directed_;
    std::vector<unsigned char> matrix_;
};
class AdjacencyListGraph {
public:
    explicit AdjacencyListGraph(std::size_t vertices, bool directed = false);
    std::size_t vertex_count() const noexcept;
    std::size_t edge_count() const noexcept;
    bool add_edge(std::size_t u, std::size_t v);
    bool remove_edge(std::size_t u, std::size_t v);
    bool has_edge(std::size_t u, std::size_t v) const;
    std::vector<std::size_t> neighbors(std::size_t u) const;
private:
    void check(std::size_t u) const;
    std::size_t edges_ = 0;
    bool directed_;
    std::vector<std::vector<std::size_t>> adj_;
};
