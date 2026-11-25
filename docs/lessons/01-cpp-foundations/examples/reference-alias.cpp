#include <iostream>
int main() {
    int a = 7;
    int& b = a;
    ++b;
    const int& view = a;
    std::cout << a << " " << view << "\n";
}
