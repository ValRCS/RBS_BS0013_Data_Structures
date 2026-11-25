#include <iostream>

int main() {
    int a=6,b=8; int* p=&a; int* q=p; p=&b; *q=14; std::cout << *p << ' ' << a << '\n';
}
