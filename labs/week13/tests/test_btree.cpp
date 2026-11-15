#include "btree.hpp"
#include <algorithm>
#include <cassert>
#include <numeric>
#include <stdexcept>
#include <vector>
int main() {
    try { BTree bad(1); assert(false && "degree 1 must throw"); }
    catch (const std::invalid_argument&) {}
    BTree tree(2);
    assert(tree.size() == 0 && tree.height() == 0 && tree.page_visits(42) == 0);
    assert(tree.invariants_hold());
    for (int key : {10, 20, 5, 6, 12, 30, 7, 17}) {
        assert(tree.insert(key));
        assert(tree.invariants_hold());
    }
    assert(tree.size() == 8 && tree.height() >= 2);
    for (int key : {5, 6, 7, 10, 12, 17, 20, 30}) assert(tree.contains(key));
    for (int key : {-1, 0, 8, 100}) assert(!tree.contains(key));
    assert(!tree.insert(12));
    assert(tree.size() == 8 && tree.invariants_hold());
    assert((tree.keys_in_order() == std::vector<int>{5, 6, 7, 10, 12, 17, 20, 30}));
    assert(tree.page_visits(100) >= 1 && tree.page_visits(100) <= tree.height());
    BTree larger(8);
    for (int k = 0; k < 100; ++k) assert(larger.insert(k));
    assert(larger.invariants_hold() && larger.size() == 100);
    assert(larger.page_visits(101) <= larger.height());
}
