#include <iostream>
#include <memory>
struct Item{int key;std::unique_ptr<Item> left,right;explicit Item(int k):key(k){} ~Item(){left.reset();right.reset();std::cout<<key<<' ';}};
int main(){auto root=std::make_unique<Item>(30);root->left=std::make_unique<Item>(20);root->right=std::make_unique<Item>(40);root.reset();std::cout<<'\n';}
