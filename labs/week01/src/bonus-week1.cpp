#include <algorithm>
#include <cstddef>
#include <iostream>
#include <vector>

// BS0013 Data Structures - Week 1 optional bonus
//
// Workload vs representation
// --------------------------
// This exercise is for students who already have some C/C++ experience and
// finish the core Week 1 practical quickly.
//
// The data are the same in both vectors below. The representation is not:
//   1. arrival_order keeps records in the order in which they arrived;
//   2. sorted_by_id keeps the same records ordered by id.
//
// Your task is to make the trade-off measurable.
//
// Rules:
// - keep std::vector as the owning container;
// - do not replace it with map/set/unordered_map/unordered_set;
// - implement the two search algorithms yourself;
// - do not use std::find, std::binary_search, std::lower_bound, or ranges
//   search helpers for the search tasks;
// - std::sort is intentionally provided only to construct the sorted copy;
// - keep the program warning-clean with -Wall -Wextra -Wpedantic;
// - prefer const references for read-only parameters and references for
//   functions that intentionally modify a vector.

struct Record {
    int id;
    int value;
};

struct SearchResult {
    bool found;
    std::size_t comparisons;
};

void print_records(const std::vector<Record>& records) {
    for (const Record& record : records) {
        std::cout << '(' << record.id << ": " << record.value << ") ";
    }
    std::cout << '\n';
}

bool is_strictly_sorted_by_id(const std::vector<Record>& records) {
    for (std::size_t i = 1; i < records.size(); ++i) {
        if (records[i - 1].id >= records[i].id) {
            return false;
        }
    }
    return true;
}

// TASK 1: Linear search
// Search arrival_order from left to right.
// Count one comparison every time a record id is compared with the target id.
// Stop immediately when the target is found.
SearchResult linear_contains(const std::vector<Record>& records, int target_id) {
    (void)records;
    (void)target_id;

    // TODO: replace this starter return value.
    return {false, 0};
}

// TASK 2: Binary search
// The input vector is guaranteed to be sorted by id.
// Implement binary search yourself using a half-open interval [left, right).
// Count one comparison each time records[mid].id is compared with target_id.
//
// Invariant to preserve while searching:
//     if target_id is present, it is inside [left, right).
SearchResult binary_contains(const std::vector<Record>& records, int target_id) {
    (void)records;
    (void)target_id;

    // TODO: replace this starter return value.
    return {false, 0};
}

// TASK 3: Sorted insertion
// Insert record so that records remains strictly increasing by id.
// Return true if insertion happened.
// Return false if a record with the same id already exists.
//
// Do not call std::sort after insertion. Find the correct position and insert
// there. You may write a small loop or reuse ideas from your binary search.
bool insert_sorted_unique(std::vector<Record>& records, Record record) {
    (void)records;
    (void)record;

    // TODO: replace this starter return value.
    return false;
}

void print_search_comparison(const std::vector<Record>& arrival_order,
                             const std::vector<Record>& sorted_by_id,
                             int target_id) {
    const SearchResult linear = linear_contains(arrival_order, target_id);
    const SearchResult binary = binary_contains(sorted_by_id, target_id);

    std::cout << "id " << target_id
              << " | linear: found=" << std::boolalpha << linear.found
              << ", comparisons=" << linear.comparisons
              << " | binary: found=" << binary.found
              << ", comparisons=" << binary.comparisons << '\n';
}

int main() {
    const std::vector<Record> arrival_order{
        {42, 420}, {4, 40},   {17, 170}, {23, 230},
        {8, 80},   {15, 150}, {99, 990}, {1, 10},
        {31, 310}, {60, 600}, {12, 120}, {75, 750},
    };

    // Copy semantics: sorted_by_id starts as an independent copy.
    std::vector<Record> sorted_by_id = arrival_order;
    std::sort(sorted_by_id.begin(), sorted_by_id.end(),
              [](const Record& a, const Record& b) { return a.id < b.id; });

    std::cout << "Arrival order:\n";
    print_records(arrival_order);

    std::cout << "\nSorted by id:\n";
    print_records(sorted_by_id);

    std::cout << "\nSearch comparison:\n";
    for (int target_id : {17, 50, 99, 1}) {
        print_search_comparison(arrival_order, sorted_by_id, target_id);
    }

    std::cout << "\nSorted insertion:\n";
    const bool inserted_13 = insert_sorted_unique(sorted_by_id, {13, 130});
    const bool inserted_duplicate_17 = insert_sorted_unique(sorted_by_id, {17, 9999});

    std::cout << "insert id 13: " << inserted_13 << '\n';
    std::cout << "insert duplicate id 17: " << inserted_duplicate_17 << '\n';
    std::cout << "sorted invariant preserved: "
              << is_strictly_sorted_by_id(sorted_by_id) << '\n';
    print_records(sorted_by_id);

    // SELF-CHECK after completing all TODOs:
    // - linear and binary search must agree on found/not-found for every query;
    // - id 13 must be inserted exactly once;
    // - duplicate id 17 must be rejected;
    // - is_strictly_sorted_by_id(sorted_by_id) must remain true;
    // - add at least three additional query ids, including one absent id;
    // - add at least two additional insertion tests.
    //
    // REFLECTION - answer briefly as comments below before you finish:
    // 1. What is the worst-case time complexity of linear search here?
    // 2. What is the worst-case time complexity of binary search here?
    // 3. Why can insertion into the sorted vector still be O(n) even if the
    //    correct position can be found in O(log n)?
    // 4. If records mostly arrive and are rarely searched, which representation
    //    is easier to maintain? If they are searched very often, what changes?
    // 5. Why are the search functions passed const std::vector<Record>& rather
    //    than std::vector<Record>?

    return 0;
}
