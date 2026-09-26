#include "int_circular_queue.hpp"

#include <cassert>
#include <iostream>

void expect_and_dequeue(IntCircularQueue& q, int expected) {
    assert(!q.empty());
    assert(q.front() == expected);
    q.dequeue();
}

void test_empty_construction() {
    IntCircularQueue q(3);
    assert(q.empty());
    assert(!q.full());
    assert(q.size() == 0);
    assert(q.capacity() == 3);
}

void test_one_element_transition() {
    IntCircularQueue q(3);
    q.enqueue(42);
    assert(q.size() == 1);
    assert(q.front() == 42);
    assert(q.back() == 42);

    q.dequeue();
    assert(q.empty());

    q.enqueue(99);
    assert(q.front() == 99);
    assert(q.back() == 99);
}

void test_full_state() {
    IntCircularQueue q(4);
    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    q.enqueue(40);

    assert(q.full());
    assert(q.size() == 4);
    assert(q.front() == 10);
    assert(q.back() == 40);
}

void test_wrap_around_order() {
    IntCircularQueue q(5);
    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    q.enqueue(40);

    q.dequeue();
    q.dequeue();

    q.enqueue(50);
    q.enqueue(60);
    q.enqueue(70);

    assert(q.full());
    assert(q.front() == 30);
    assert(q.back() == 70);

    expect_and_dequeue(q, 30);
    expect_and_dequeue(q, 40);
    expect_and_dequeue(q, 50);
    expect_and_dequeue(q, 60);
    expect_and_dequeue(q, 70);
    assert(q.empty());
}

void test_clear_and_reuse() {
    IntCircularQueue q(3);

    q.clear();
    assert(q.empty());
    assert(q.capacity() == 3);

    q.enqueue(1);
    q.enqueue(2);
    q.dequeue();
    q.enqueue(3);
    q.enqueue(4);
    assert(q.full());

    q.clear();
    assert(q.empty());
    assert(!q.full());
    assert(q.capacity() == 3);

    q.enqueue(9);
    assert(q.front() == 9);
    assert(q.back() == 9);
}

int main() {
    test_empty_construction();
    test_one_element_transition();
    test_full_state();
    test_wrap_around_order();
    test_clear_and_reuse();

    std::cout << "All Week 5 public tests passed.\n";
}
