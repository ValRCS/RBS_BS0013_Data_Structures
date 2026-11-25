#include <iostream>

int main() {
    struct Node { int value; Node* next=nullptr; }; Node a{2},b{5},c{8}; a.next=&b; b.next=&c; int sum=0; for(const Node* cur=&a;cur;cur=cur->next) sum+=cur->value; std::cout << sum << '\n';
}
