#pragma once

#include <cstddef>
#include <vector>

// Week 8 deliberately uses integer priorities so the implementation
// belongs in src/binary_heap.cpp, like earlier C++ labs.
class BinaryHeap {
public:
    BinaryHeap() = default;
    explicit BinaryHeap(std::vector<int> values);

    [[nodiscard]] bool empty() const noexcept { return data_.empty(); }
    [[nodiscard]] std::size_t size() const noexcept { return data_.size(); }
    [[nodiscard]] const std::vector<int>& storage() const noexcept { return data_; }

    [[nodiscard]] const int& top() const;
    void push(int value);
    void pop();

    [[nodiscard]] bool check_invariant() const;

private:
    [[nodiscard]] static std::size_t parent(std::size_t i);
    [[nodiscard]] static std::size_t left(std::size_t i);
    [[nodiscard]] static std::size_t right(std::size_t i);

    void sift_up(std::size_t i);
    void sift_down(std::size_t i);
    void heapify();

    std::vector<int> data_;
};
