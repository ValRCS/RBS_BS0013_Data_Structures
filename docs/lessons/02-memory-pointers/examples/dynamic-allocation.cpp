#include <iostream>

int main() {
    int* p=new int{13}; std::cout << *p << '\n'; delete p; p=nullptr; std::cout << (p==nullptr) << '\n';
}
