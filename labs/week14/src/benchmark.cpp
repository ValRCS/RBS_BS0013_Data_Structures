#include "indexes.hpp"
#include <algorithm>
#include <chrono>
#include <iomanip>
#include <iostream>
#include <numeric>
#include <random>
#include <stdexcept>
#include <string>
#include <string_view>
#include <vector>

using Clock = std::chrono::steady_clock;
double micros(Clock::time_point start, Clock::time_point end) {
    return std::chrono::duration<double, std::micro>(end-start).count();
}
double median(std::vector<double> values) {
    std::sort(values.begin(), values.end());
    return values[values.size()/2];
}
template<class Index>
void run(std::string_view name, const std::vector<int>& keys,
         const std::vector<int>& queries, const std::vector<int>& updates) {
    // Untimed correctness check: every query is in [0,2*n) and even iff present.
    Index check;
    for (int key : keys) if (!check.insert(key)) throw std::runtime_error("build failed");
    if (check.size() != keys.size()) throw std::runtime_error("wrong size");
    for (int key : queries)
        if (check.contains(key) != (key % 2 == 0)) throw std::runtime_error("wrong query");
    for (int key : updates)
        if (!check.insert(key) || !check.contains(key)) throw std::runtime_error("wrong update");
    if (check.size() != keys.size()+updates.size()) throw std::runtime_error("wrong updated size");

    std::vector<double> build, lookup, insert;
    std::size_t checksum = 0;
    for (int trial=0; trial<3; ++trial) {
        Index idx;
        auto t0 = Clock::now();
        std::size_t added = 0;
        for (int key : keys) added += idx.insert(key);
        auto t1 = Clock::now();
        std::size_t hits = 0;
        for (int key : queries) hits += idx.contains(key);
        auto t2 = Clock::now();
        std::size_t inserted = 0;
        for (int key : updates) inserted += idx.insert(key);
        auto t3 = Clock::now();
        if (added != keys.size() || hits != queries.size()/2 ||
            inserted != updates.size() || idx.size() != keys.size()+updates.size())
            throw std::runtime_error("timed result mismatch");
        checksum += hits;
        build.push_back(micros(t0,t1)); lookup.push_back(micros(t1,t2));
        insert.push_back(micros(t2,t3));
    }
    std::cout << name << ',' << keys.size() << ',' << queries.size() << ','
              << updates.size() << ',' << median(build) << ',' << median(lookup)
              << ',' << median(insert) << ',' << checksum << '\n';
}
int main(int argc, char** argv) {
    try {
        std::vector<int> sizes{1000, 5000, 10000};
        if (argc == 2) {
            std::size_t end = 0;
            int n = std::stoi(argv[1], &end);
            if (end != std::string(argv[1]).size() || n < 1 || n > 50000)
                throw std::invalid_argument("size must be 1..50000");
            sizes = {n};
        } else if (argc != 1) throw std::invalid_argument("usage: week14_benchmark [size]");
        std::cout << "index,n,queries,updates,build_us,lookup_us,insert_us,checksum\n";
        std::cout << std::fixed << std::setprecision(2);
        for (int n : sizes) {
            std::mt19937 rng(140026);
            std::vector<int> keys(n), queries, updates;
            std::iota(keys.begin(), keys.end(), 0);
            for (int& key : keys) key *= 2;
            std::shuffle(keys.begin(), keys.end(), rng);
            std::uniform_int_distribution<int> pick(0, n-1);
            for (int i=0; i<1000; ++i) {
                queries.push_back(2*pick(rng)); queries.push_back(2*pick(rng)+1);
            }
            std::shuffle(queries.begin(), queries.end(), rng);
            for (int i=1; i<=200; ++i) updates.push_back(-i);
            std::shuffle(updates.begin(), updates.end(), rng);
            run<LinearIndex>("linear_vector",keys,queries,updates);
            run<SortedIndex>("sorted_vector",keys,queries,updates);
            run<TreeIndex>("set",keys,queries,updates);
            run<HashIndex>("unordered_set",keys,queries,updates);
        }
    } catch (const std::exception& e) { std::cerr << e.what() << '\n'; return 1; }
}
