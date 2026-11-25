#include <array>
#include <cassert>
#include <iostream>
#include <memory>
struct Node { inline static int alive=0; Node(){++alive;} ~Node(){--alive;} std::array<std::unique_ptr<Node>,26> children{}; };
int main(){Node root;root.children[0]=std::make_unique<Node>();root.children[0]->children[1]=std::make_unique<Node>();assert(Node::alive==3);root.children[0].reset();assert(Node::alive==1);std::cout<<"Only root remains\n";}
