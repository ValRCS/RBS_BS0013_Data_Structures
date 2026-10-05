#include "binary_heap.hpp"

#include <cassert>
#include <iostream>
#include <stdexcept>
#include <vector>

void test_empty_and_single_value() {
    BinaryHeap<int> heap;
    assert(heap.empty());
    assert(heap.size() == 0);

    bool top_threw = false;
    try {
        (void)heap.top();
    } catch (const std::out_of_range&) {
        top_threw = true;
    }
    assert(top_threw);

    heap.push(42);
    assert(!heap.empty());
    assert(heap.size() == 1);
    assert(heap.top() == 42);
    assert(heap.check_invariant());

    heap.pop();
    assert(heap.empty());
}

void test_sift_up() {
    BinaryHeap<int> heap(std::vector<int>{90, 70, 80, 20, 40, 50, 60});
    assert(heap.check_invariant());

    heap.push(85);
    assert(heap.top() == 90);
    assert(heap.check_invariant());
}

void test_sift_down_and_priority_order() {
    BinaryHeap<int> heap(std::vector<int>{40, 10, 70, 30, 90, 20, 80, 60, 50});
    assert(heap.check_invariant());
    assert(heap.top() == 90);

    std::vector<int> removed;
    while (!heap.empty()) {
        removed.push_back(heap.top());
        heap.pop();
        assert(heap.check_invariant());
    }

    assert((removed == std::vector<int>{90, 80, 70, 60, 50, 40, 30, 20, 10}));
}

void test_duplicates() {
    BinaryHeap<int> heap(std::vector<int>{5, 5, 7, 7, 7, 1});
    assert(heap.check_invariant());
    assert(heap.top() == 7);

    heap.pop();
    assert(heap.top() == 7);
    assert(heap.check_invariant());
}

int main() {
    test_empty_and_single_value();
    test_sift_up();
    test_sift_down_and_priority_order();
    test_duplicates();

    std::cout << "Week 8 public tests passed.\n";
}
