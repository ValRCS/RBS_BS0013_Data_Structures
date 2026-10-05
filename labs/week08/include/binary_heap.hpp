#pragma once

#include <cstddef>
#include <stdexcept>
#include <utility>
#include <vector>

template <typename T>
class BinaryHeap {
public:
    BinaryHeap() = default;

    explicit BinaryHeap(std::vector<T> values)
        : data_(std::move(values)) {
        heapify();
    }

    [[nodiscard]] bool empty() const noexcept { return data_.empty(); }
    [[nodiscard]] std::size_t size() const noexcept { return data_.size(); }
    [[nodiscard]] const std::vector<T>& storage() const noexcept { return data_; }

    [[nodiscard]] const T& top() const {
        todo("TODO: implement top()");
    }

    void push(const T& value) {
        (void)value;
        todo("TODO: implement push()");
    }

    void pop() {
        todo("TODO: implement pop()");
    }

    [[nodiscard]] bool check_invariant() const {
        todo("TODO: implement check_invariant()");
    }

private:
    [[noreturn]] static void todo(const char* operation) {
        throw std::logic_error(operation);
    }

    [[nodiscard]] static std::size_t parent(std::size_t i) {
        (void)i;
        todo("TODO: implement parent()");
    }

    [[nodiscard]] static std::size_t left(std::size_t i) {
        (void)i;
        todo("TODO: implement left()");
    }

    [[nodiscard]] static std::size_t right(std::size_t i) {
        (void)i;
        todo("TODO: implement right()");
    }

    void sift_up(std::size_t i) {
        (void)i;
        todo("TODO: implement sift_up()");
    }

    void sift_down(std::size_t i) {
        (void)i;
        todo("TODO: implement sift_down()");
    }

    void heapify() {
        todo("TODO: implement heapify()");
    }

    std::vector<T> data_;
};
