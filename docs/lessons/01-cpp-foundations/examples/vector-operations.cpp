#include <iostream>
#include <vector>
int main() {
    std::vector<int> v{8, 3, 6};
    v.push_back(2);
    v.erase(v.begin() + 1);
    for (int x : v) std::cout << x << " ";
    std::cout << "\n";
}
