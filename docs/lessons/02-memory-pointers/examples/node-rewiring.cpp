#include <iostream>

int main() {
    struct Node { int value; Node* next=nullptr; }; Node a{3},b{6},c{9}; a.next=&b; b.next=&c; a.next=&c; std::cout << a.next->value << ' ' << b.value << '\n';
}
