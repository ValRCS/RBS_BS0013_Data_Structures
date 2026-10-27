#include "int_bst.hpp"
#include <cassert>
#include <iostream>
#include <vector>

void test_empty_singleton() {
    IntBST t;
    assert(t.empty() && t.height() == 0 && t.check_invariant());
    assert(!t.contains(42) && !t.erase(42));
    assert(t.insert(42) && !t.insert(42));
    assert(t.size() == 1 && t.contains(42) && t.height() == 1);
    assert((t.inorder() == std::vector<int>{42}));
    assert(t.erase(42) && t.empty() && t.check_invariant());
}
void test_search_and_deletion() {
    IntBST t;
    for (int x : {50,30,70,20,40,60,80}) assert(t.insert(x));
    assert(t.height() == 3 && t.check_invariant());
    assert(t.contains(60) && !t.contains(65));
    assert((t.inorder() == std::vector<int>{20,30,40,50,60,70,80}));
    assert(t.erase(20));   // leaf
    assert(t.erase(30));   // one child
    assert(t.erase(50));   // two children, root
    assert((t.inorder() == std::vector<int>{40,60,70,80}));
    assert(t.size() == 4 && t.check_invariant());
    assert(!t.erase(999));
}
void test_degenerate_height() {
    IntBST t;
    for (int x = 1; x <= 7; ++x) assert(t.insert(x));
    assert(t.height() == 7 && t.check_invariant());
}
int main() {
    test_empty_singleton();
    test_search_and_deletion();
    test_degenerate_height();
    std::cout << "Week 9 public tests passed.\n";
}
