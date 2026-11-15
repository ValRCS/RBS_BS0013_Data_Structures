#pragma once
#include <cstddef>
#include <memory>
#include <optional>
#include <vector>
class BTree {
    struct Node {
        explicit Node(bool leaf_flag) : leaf(leaf_flag) {}
        bool leaf;
        std::vector<int> keys;
        std::vector<std::unique_ptr<Node>> children;
    };
    std::size_t degree_;
    std::size_t size_ = 0;
    std::unique_ptr<Node> root_;
    void split_child(Node& parent, std::size_t index);
    void insert_non_full(Node& node, int key);
    static void append_inorder(const Node& node, std::vector<int>& out);
    bool check_node(const Node& node, bool root, std::optional<int> low,
                    std::optional<int> high, std::size_t depth,
                    std::optional<std::size_t>& leaf_depth,
                    std::size_t& counted) const;
public:
    explicit BTree(std::size_t minimum_degree = 2);
    bool insert(int key);
    bool contains(int key) const;
    std::size_t size() const noexcept { return size_; }
    std::size_t height() const noexcept;
    std::size_t page_visits(int key) const noexcept;
    std::vector<int> keys_in_order() const;
    bool invariants_hold() const;
};
