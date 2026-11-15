#include "btree.hpp"
#include <algorithm>
#include <stdexcept>
#include <utility>
BTree::BTree(std::size_t minimum_degree)
    : degree_(minimum_degree), root_(std::make_unique<Node>(true)) {
    if (minimum_degree < 2) throw std::invalid_argument("degree must be at least 2");
}
bool BTree::contains(int key) const {
    // TODO 1: descend through separator-key intervals until match or leaf.
    (void)key; return false;
}
void BTree::split_child(Node& parent, std::size_t index) {
    // TODO 2: promote median; move keys and children to a new right sibling.
    (void)parent; (void)index;
}
void BTree::insert_non_full(Node& node, int key) {
    // TODO 3: insert sorted leaf key or split a full child before descending.
    (void)node; (void)key;
}
bool BTree::insert(int key) {
    // TODO 4: reject duplicate, split a full root, descend, update size_ once.
    (void)key; return false;
}
std::size_t BTree::height() const noexcept {
    if (size_ == 0) return 0;
    std::size_t result = 0;
    const Node* node = root_.get();
    while (node) {
        ++result;
        node = node->leaf ? nullptr : node->children.front().get();
    }
    return result;
}
std::size_t BTree::page_visits(int key) const noexcept {
    if (size_ == 0) return 0;
    std::size_t visits = 0;
    const Node* node = root_.get();
    while (node) {
        ++visits;
        const auto pos = std::lower_bound(node->keys.begin(), node->keys.end(), key);
        if (pos != node->keys.end() && *pos == key) break;
        node = node->leaf ? nullptr : node->children[static_cast<std::size_t>(pos - node->keys.begin())].get();
    }
    return visits;
}
void BTree::append_inorder(const Node& node, std::vector<int>& out) {
    for (std::size_t i = 0; i < node.keys.size(); ++i) {
        if (!node.leaf) append_inorder(*node.children[i], out);
        out.push_back(node.keys[i]);
    }
    if (!node.leaf) append_inorder(*node.children.back(), out);
}
std::vector<int> BTree::keys_in_order() const {
    std::vector<int> result;
    result.reserve(size_);
    append_inorder(*root_, result);
    return result;
}
bool BTree::check_node(const Node& node, bool is_root, std::optional<int> low,
                       std::optional<int> high, std::size_t depth,
                       std::optional<std::size_t>& leaf_depth,
                       std::size_t& counted) const {
    const std::size_t n = node.keys.size();
    if (n > 2 * degree_ - 1 || (!is_root && n < degree_ - 1)) return false;
    if (is_root && !node.leaf && n == 0) return false;
    if (node.leaf ? !node.children.empty() : node.children.size() != n + 1) return false;
    for (std::size_t i = 0; i < n; ++i) {
        int key = node.keys[i];
        if ((low && key <= *low) || (high && key >= *high)) return false;
        if (i > 0 && node.keys[i - 1] >= key) return false;
    }
    counted += n;
    if (node.leaf) {
        if (!leaf_depth) leaf_depth = depth;
        return *leaf_depth == depth;
    }
    for (std::size_t i = 0; i <= n; ++i) {
        if (!node.children[i]) return false;
        const auto child_low = i == 0 ? low : std::optional<int>(node.keys[i - 1]);
        const auto child_high = i == n ? high : std::optional<int>(node.keys[i]);
        if (!check_node(*node.children[i], false, child_low, child_high,
                        depth + 1, leaf_depth, counted)) return false;
    }
    return true;
}
bool BTree::invariants_hold() const {
    std::optional<std::size_t> leaf_depth;
    std::size_t counted = 0;
    return root_ && check_node(*root_, true, std::nullopt, std::nullopt,
                                1, leaf_depth, counted) && counted == size_;
}
