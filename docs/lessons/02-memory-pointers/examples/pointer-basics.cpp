#include <iostream>

int main() {
    int x=11; int* p=&x; *p=19; std::cout << x << '\n';
}
