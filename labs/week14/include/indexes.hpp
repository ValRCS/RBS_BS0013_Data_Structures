#pragma once
#include <vector>
#include <set>
#include <unordered_set>

// All implementations model a set of integers. insert returns true only for a new key.
class LinearIndex {
    std::vector<int> keys_;
public:
    bool insert(int key);
    bool contains(int key) const;
    std::size_t size() const { return keys_.size(); }
};
class SortedIndex {
    std::vector<int> keys_;
public:
    bool insert(int key);
    bool contains(int key) const;
    std::size_t size() const { return keys_.size(); }
};
class TreeIndex {
    std::set<int> keys_;
public:
    bool insert(int key);
    bool contains(int key) const;
    std::size_t size() const { return keys_.size(); }
};
class HashIndex {
    std::unordered_set<int> keys_;
public:
    bool insert(int key);
    bool contains(int key) const;
    std::size_t size() const { return keys_.size(); }
};
