#include "binary_heap.hpp"

#include <cassert>
#include <iostream>
#include <stdexcept>
#include <vector>

void test_empty_and_single() {
    BinaryHeap heap;
    assert(heap.empty());
    assert(heap.size() == 0);

    bool threw = false;
    try {
        (void)heap.top();
    } catch (const std::out_of_range&) {
        threw = true;
    }
    assert(threw);

    heap.push(42);
    assert(!heap.empty());
    assert(heap.size() == 1);
    assert(heap.top() == 42);
    assert(heap.check_invariant());
}

void test_sift_up() {
    BinaryHeap heap({90, 70, 80, 20, 40, 50, 60});
    assert(heap.check_invariant());

    heap.push(85);
    assert(heap.top() == 90);
    assert(heap.storage() == std::vector<int>({90, 85, 80, 70, 40, 50, 60, 20}));
    assert(heap.check_invariant());
}

void test_heapify_and_repeated_pop() {
    BinaryHeap heap({40, 10, 70, 30, 90, 20, 80, 60, 50});
    assert(heap.check_invariant());

    const std::vector<int> expected{90, 80, 70, 60, 50, 40, 30, 20, 10};
    std::vector<int> observed;

    while (!heap.empty()) {
        observed.push_back(heap.top());
        heap.pop();
        assert(heap.check_invariant());
    }

    assert(observed == expected);
}

void test_duplicate_priorities() {
    BinaryHeap heap;
    heap.push(5);
    heap.push(5);
    heap.push(7);
    heap.push(7);
    heap.push(1);

    const std::vector<int> expected{7, 7, 5, 5, 1};
    std::vector<int> observed;

    while (!heap.empty()) {
        observed.push_back(heap.top());
        heap.pop();
    }

    assert(observed == expected);
}

int main() {
    test_empty_and_single();
    test_sift_up();
    test_heapify_and_repeated_pop();
    test_duplicate_priorities();

    std::cout << "Week 8 public tests passed.\n";
}
