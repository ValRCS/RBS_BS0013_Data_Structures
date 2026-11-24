#include "indexes.hpp"
#include <iostream>
#include <stdexcept>
void require(bool ok, const char* msg) { if (!ok) throw std::runtime_error(msg); }
template<class Index> void check() {
    Index idx;
    require(idx.size() == 0 && !idx.contains(10), "empty index");
    require(idx.insert(10), "insert new");
    require(idx.insert(-4), "insert negative");
    require(idx.insert(3), "insert out of order");
    require(!idx.insert(10), "reject duplicate");
    require(idx.size() == 3, "distinct size");
    require(idx.contains(10) && idx.contains(-4) && idx.contains(3), "hits");
    require(!idx.contains(0) && !idx.contains(11), "misses");
    // Add at least two further checks here.
}
int main() {
    check<LinearIndex>(); check<SortedIndex>(); check<TreeIndex>(); check<HashIndex>();
    std::cout << "All index tests passed\n";
}
