#include <array>
#include <iostream>
int main() {
    constexpr int t = 3;
    const std::array<int, 2*t-1> a{2, 4, 6, 8, 10};
    std::cout << "Median: " << a[t-1] << '\n';
    std::cout << "Keys on each side: " << t-1 << '\n';
}
