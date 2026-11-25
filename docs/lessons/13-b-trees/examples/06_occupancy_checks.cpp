#include <iostream>
int main() {
    constexpr int t = 3;
    for (int k : {1, 2, 5, 6}) {
        const bool valid = t-1 <= k && k <= 2*t-1;
        std::cout << k << ": " << std::boolalpha << valid << '\n';
    }
}
