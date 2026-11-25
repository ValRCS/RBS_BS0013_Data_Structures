#include <iostream>
void change_copy(int x) { ++x; std::cout << x << "\n"; }
void change_original(int& x) { ++x; }
void inspect(const int& x) { std::cout << x << "\n"; }
int main() {
    int n = 4;
    change_copy(n);
    inspect(n);
    change_original(n);
    inspect(n);
}
