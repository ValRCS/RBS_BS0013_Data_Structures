#include <array>
#include <cassert>
#include <iostream>
#include <memory>
struct Node { std::array<std::unique_ptr<Node>,3> children{}; };
int main(){Node root;root.children[0]=std::make_unique<Node>();root.children[0]->children[1]=std::make_unique<Node>();const Node* p=&root;for(unsigned i:{0u,1u}){assert(p->children[i]);p=p->children[i].get();}assert(!p->children[2]);std::cout<<"Two indexed edges followed\n";}
