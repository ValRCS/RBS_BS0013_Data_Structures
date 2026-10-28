#include "binary_heap.hpp"

#include <stdexcept>
#include <utility>

namespace {
[[noreturn]] void todo(const char* operation) {
    throw std::logic_error(operation);
}
}  // namespace

BinaryHeap::BinaryHeap(std::vector<int> values)
    : data_(std::move(values)) {
    heapify();
}

const int& BinaryHeap::top() const {
    todo("TODO: implement top()");
}

void BinaryHeap::push(int value) {
    (void)value;
    todo("TODO: implement push() and sift-up");
}

void BinaryHeap::pop() {
    todo("TODO: implement pop() and sift-down");
}

bool BinaryHeap::check_invariant() const {
    todo("TODO: implement check_invariant()");
}

std::size_t BinaryHeap::parent(std::size_t i) {
    (void)i;
    todo("TODO: implement parent()");
}

std::size_t BinaryHeap::left(std::size_t i) {
    (void)i;
    todo("TODO: implement left()");
}

std::size_t BinaryHeap::right(std::size_t i) {
    (void)i;
    todo("TODO: implement right()");
}

void BinaryHeap::sift_up(std::size_t i) {
    (void)i;
    todo("TODO: implement sift_up()");
}

void BinaryHeap::sift_down(std::size_t i) {
    (void)i;
    todo("TODO: implement sift_down()");
}

void BinaryHeap::heapify() {
    todo("TODO: implement bottom-up heapify()");
}
