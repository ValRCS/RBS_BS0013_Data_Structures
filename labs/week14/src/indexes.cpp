#include "indexes.hpp"
#include <algorithm>

// TODO 1: unsorted vector; reject duplicate before append.
bool LinearIndex::insert(int key) { (void)key; return false; }
bool LinearIndex::contains(int key) const { (void)key; return false; }

// TODO 2: sorted vector; find insertion position, preserve uniqueness and order.
bool SortedIndex::insert(int key) { (void)key; return false; }
bool SortedIndex::contains(int key) const { (void)key; return false; }

// TODO 3: ordered set; use its own operations.
bool TreeIndex::insert(int key) { (void)key; return false; }
bool TreeIndex::contains(int key) const { (void)key; return false; }

// TODO 4: unordered set; use its own operations.
bool HashIndex::insert(int key) { (void)key; return false; }
bool HashIndex::contains(int key) const { (void)key; return false; }
