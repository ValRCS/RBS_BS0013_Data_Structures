#include <iostream>

void increment(int x) {
    ++x;
}

int main() {
    int value = 10;

    increment(value);

    std::cout << value << '\n';
}

