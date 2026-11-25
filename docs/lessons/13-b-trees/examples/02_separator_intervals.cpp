#include <array>
#include <iostream>
int main() {
    const std::array<int, 2> separators{10, 20};
    for (int x : {5, 15, 25}) {
        if (x < separators[0]) std::cout << x << ": left\n";
        else if (x < separators[1]) std::cout << x << ": middle\n";
        else std::cout << x << ": right\n";
    }
}
