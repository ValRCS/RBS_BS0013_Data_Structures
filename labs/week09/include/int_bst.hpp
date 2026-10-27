#pragma once
#include <cstddef>
#include <optional>
#include <vector>

// Deliberately noncopyable, nonmovable teaching implementation.
// The tree exclusively owns every node reachable from root_.
class IntBST {
public:
    IntBST() = default;
    ~IntBST();
    IntBST(const IntBST&) = delete;
    IntBST& operator=(const IntBST&) = delete;
    IntBST(IntBST&&) = delete;
    IntBST& operator=(IntBST&&) = delete;

    bool empty() const noexcept { return size_ == 0; }
    std::size_t size() const noexcept { return size_; }
    bool contains(int key) const;
    bool insert(int key);                  // false if duplicate
    bool erase(int key);                   // false if absent
    std::vector<int> inorder() const;      // ascending
    int height() const noexcept;           // nodes: empty=0, singleton=1
    bool check_invariant() const;
private:
    struct Node {
        int key;
        Node* left = nullptr;
        Node* right = nullptr;
    };
    Node* root_ = nullptr;
    std::size_t size_ = 0;
    static void destroy(Node* node) noexcept;  // already provided
    bool insert_at(Node*& node, int key);
    bool erase_at(Node*& node, int key);
    static void inorder_at(const Node*, std::vector<int>&);
    static int height_at(const Node*) noexcept;
    static bool validate(const Node*, std::optional<int> lower,
                         std::optional<int> upper, std::size_t& count);
};
