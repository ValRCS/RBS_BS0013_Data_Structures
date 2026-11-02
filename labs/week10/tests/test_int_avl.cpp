#include "int_avl.hpp"
#include <cassert>
#include <climits>
#include <iostream>
#include <set>
#include <vector>

void check_case(std::vector<int> keys, std::vector<int> expected) {
    IntAVL tree;
    for (int key : keys) {
        assert(tree.insert(key));
        assert(tree.check_invariant());
    }
    assert(tree.inorder() == expected);
    assert(tree.size() == expected.size());
    assert(tree.height() <= 2);
    for (int key : expected) assert(tree.contains(key));
    assert(!tree.contains(999));
}
int main() {
    IntAVL empty;
    assert(empty.check_invariant() && empty.height() == 0);
    assert(!empty.contains(10));
    check_case({30,20,10}, {10,20,30}); // LL
    check_case({10,20,30}, {10,20,30}); // RR
    check_case({30,10,20}, {10,20,30}); // LR
    check_case({10,30,20}, {10,20,30}); // RL
    IntAVL t;
    for (int k=1;k<=127;++k) { assert(t.insert(k)); assert(t.check_invariant()); }
    assert(t.height() <= 8);
    assert(t.size() == 127);
    assert(!t.insert(64) && t.size()==127 && t.check_invariant());
    assert(t.insert(INT_MIN) && t.insert(INT_MAX) && t.check_invariant());
    std::set<int> oracle;
    IntAVL stress;
    unsigned x=2026;
    for (int i=0;i<3000;++i) {
        x = x*1664525U + 1013904223U;
        int key = static_cast<int>(x % 5000U) - 2500;
        const bool inserted=oracle.insert(key).second;
        assert(stress.insert(key)==inserted);
        assert(stress.check_invariant());
    }
    assert(stress.inorder()==std::vector<int>(oracle.begin(),oracle.end()));
    std::cout << "Week 10 AVL tests passed\n";
}
