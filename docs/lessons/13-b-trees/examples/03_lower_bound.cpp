#include <algorithm>
#include <iostream>
#include <vector>
int main() {
    const std::vector<int> a{3, 8, 12, 18};
    const auto it = std::lower_bound(a.begin(), a.end(), 10);
    if (it != a.end()) std::cout << "First key >= 10: " << *it << '\n';
}
