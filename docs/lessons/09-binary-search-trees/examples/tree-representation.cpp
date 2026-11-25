#include <iostream>
struct Record { int key; const Record* left{}; const Record* right{}; };
int main(){ const Record a{30}, b{70}, root{50,&a,&b}; std::cout << root.key << ": " << root.left->key << ' ' << root.right->key << '\n'; }
