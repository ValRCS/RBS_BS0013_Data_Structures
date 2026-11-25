#include <iostream>
#include <set>
int main() {
    const std::set<int> values{2, 4, 6, 8, 10, 12};
    for (auto it=values.lower_bound(4); it!=values.upper_bound(10); ++it)
        std::cout << *it << ' ';
    std::cout << '\n';
}
