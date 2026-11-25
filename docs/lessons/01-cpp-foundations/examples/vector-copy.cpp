#include <iostream>
#include <vector>
int main() {
    std::vector<int> a{8, 3};
    auto b = a;
    b.at(0) = 1;
    std::cout << a.at(0) << " " << b.at(0) << "\n";
}
