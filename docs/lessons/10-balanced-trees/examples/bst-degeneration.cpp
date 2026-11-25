#include <iostream>
#include <memory>
struct Node{int k;std::unique_ptr<Node> l,r;explicit Node(int key):k(key){}};
void add(std::unique_ptr<Node>& n,int k){if(!n)n=std::make_unique<Node>(k);else if(k<n->k)add(n->l,k);else if(k>n->k)add(n->r,k);}
int visits(const Node* n,int k){int c=0;while(n){++c;if(n->k==k)break;n=k<n->k?n->l.get():n->r.get();}return c;}
int main(){std::unique_ptr<Node>a,b;for(int k:{10,20,30,40,50,60,70})add(a,k);for(int k:{40,20,60,10,30,50,70})add(b,k);std::cout<<visits(a.get(),70)<<" "<<visits(b.get(),70)<<"\n";}
