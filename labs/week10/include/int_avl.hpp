#pragma once
#include <cstddef>
#include <optional>
#include <vector>

// Unique-key owning AVL. Heights count nodes: empty 0, leaf 1.
class IntAVL {
public:
    IntAVL() = default;
    ~IntAVL();
    IntAVL(const IntAVL&) = delete;
    IntAVL& operator=(const IntAVL&) = delete;
    IntAVL(IntAVL&&) = delete;
    IntAVL& operator=(IntAVL&&) = delete;
    bool insert(int key);
    bool contains(int key) const noexcept;
    std::vector<int> inorder() const;
    std::size_t size() const noexcept { return size_; }
    int height() const noexcept { return get_height(root_); }
    bool check_invariant() const noexcept;
private:
    struct Node {
        int key;
        int height = 1;
        Node* left = nullptr;
        Node* right = nullptr;
    };
    Node* root_ = nullptr;
    std::size_t size_ = 0;
    static int get_height(const Node* p) noexcept { return p ? p->height : 0; }
    static int balance_factor(const Node* p) noexcept {
        return p ? get_height(p->left) - get_height(p->right) : 0;
    }
    static void refresh(Node* p) noexcept;
    static void rotate_left(Node*& link) noexcept;
    static void rotate_right(Node*& link) noexcept;
    static void rebalance(Node*& link) noexcept;
    bool insert_at(Node*& link, int key);
    static void destroy(Node* p) noexcept;
    static void inorder_at(const Node* p, std::vector<int>& out);
    static bool validate(const Node* p, std::optional<int> lo,
                         std::optional<int> hi, std::size_t& count,
                         int& actual_height) noexcept;
};
