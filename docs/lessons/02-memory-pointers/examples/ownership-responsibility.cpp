#include <iostream>

int main() {
    int* owner=new int{31}; int* observer=owner; std::cout << *observer << '\n'; observer=nullptr; delete owner; owner=nullptr;
}
