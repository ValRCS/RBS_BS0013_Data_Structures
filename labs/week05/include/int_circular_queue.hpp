#ifndef INT_CIRCULAR_QUEUE_HPP
#define INT_CIRCULAR_QUEUE_HPP

#include <cstddef>
#include <vector>

class IntCircularQueue {
public:
    explicit IntCircularQueue(std::size_t capacity);

    bool empty() const;
    bool full() const;
    std::size_t size() const;
    std::size_t capacity() const;

    int& front();
    const int& front() const;

    int& back();
    const int& back() const;

    void enqueue(int value);
    void dequeue();
    void clear();

private:
    std::vector<int> data_;
    std::size_t front_ = 0;
    std::size_t size_ = 0;

    std::size_t physical_index(std::size_t logical_index) const;
    void check_invariant() const;
};

#endif
