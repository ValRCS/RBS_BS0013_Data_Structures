#include <iostream>

int main() {
    int a=1,b=9; int& r=a; int* p=&a; r=b; p=&b; *p=4; std::cout << a << ' ' << b << '\n';
}
