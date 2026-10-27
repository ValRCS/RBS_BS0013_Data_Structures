#include "int_bst.hpp"
#include <algorithm>
#include <stdexcept>

// The postorder destructor is supplied and must not be removed.
IntBST::~IntBST() { destroy(root_); }
void IntBST::destroy(Node* node) noexcept {
    if (!node) return;
    destroy(node->left);
    destroy(node->right);
    delete node;
}
bool IntBST::contains(int key) const {
    (void)key;
    throw std::logic_error("TODO: contains()");
}
bool IntBST::insert(int key) { return insert_at(root_, key); }
bool IntBST::insert_at(Node*& node, int key) {
    (void)node; (void)key;
    throw std::logic_error("TODO: insert_at()");
}
bool IntBST::erase(int key) { return erase_at(root_, key); }
bool IntBST::erase_at(Node*& node, int key) {
    (void)node; (void)key;
    throw std::logic_error("TODO: erase_at()");
}
std::vector<int> IntBST::inorder() const {
    std::vector<int> result;
    result.reserve(size_);
    inorder_at(root_, result);
    return result;
}
void IntBST::inorder_at(const Node* node, std::vector<int>& out) {
    (void)node; (void)out;
    throw std::logic_error("TODO: inorder_at()");
}
int IntBST::height() const noexcept { return height_at(root_); }
int IntBST::height_at(const Node* node) noexcept {
    (void)node;
    // TODO: recursively compute number of nodes on longest path.
    return 0;
}
bool IntBST::check_invariant() const {
    std::size_t count = 0;
    return validate(root_, std::nullopt, std::nullopt, count) && count == size_;
}
bool IntBST::validate(const Node* node, std::optional<int> lower,
                      std::optional<int> upper, std::size_t& count) {
    (void)node; (void)lower; (void)upper; (void)count;
    throw std::logic_error("TODO: validate()");
}
