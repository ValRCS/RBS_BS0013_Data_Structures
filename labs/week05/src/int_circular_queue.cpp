#include "int_circular_queue.hpp"

#include <cassert>
#include <stdexcept>

namespace {
[[noreturn]] void todo(const char* operation) {
    throw std::logic_error(operation);
}
}  // namespace

IntCircularQueue::IntCircularQueue(std::size_t capacity)
    : data_(capacity) {
    assert(capacity > 0);
    check_invariant();
}

bool IntCircularQueue::empty() const {
    return size_ == 0;
}

bool IntCircularQueue::full() const {
    return size_ == data_.size();
}

std::size_t IntCircularQueue::size() const {
    return size_;
}

std::size_t IntCircularQueue::capacity() const {
    return data_.size();
}

int& IntCircularQueue::front() {
    todo("TODO: implement front()");
}

const int& IntCircularQueue::front() const {
    todo("TODO: implement front() const");
}

int& IntCircularQueue::back() {
    todo("TODO: implement back()");
}

const int& IntCircularQueue::back() const {
    todo("TODO: implement back() const");
}

void IntCircularQueue::enqueue(int value) {
    (void)value;
    todo("TODO: implement enqueue()");
}

void IntCircularQueue::dequeue() {
    todo("TODO: implement dequeue()");
}

void IntCircularQueue::clear() {
    todo("TODO: implement clear()");
}

std::size_t IntCircularQueue::physical_index(std::size_t logical_index) const {
    (void)logical_index;
    todo("TODO: implement physical_index()");
}

void IntCircularQueue::check_invariant() const {
    todo("TODO: implement check_invariant()");
}
