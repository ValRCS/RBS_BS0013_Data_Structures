#include <iostream>

int main() {
    int* p=nullptr; { int x=23; p=&x; std::cout << *p << '\n'; p=nullptr; } std::cout << (p==nullptr) << '\n';
}
