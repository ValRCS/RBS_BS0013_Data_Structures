#include <iostream>

int main() {
    struct Node { int value; Node* next=nullptr; }; Node a{4},b{9}; a.next=&b; std::cout << a.next->value << '\n';
}
