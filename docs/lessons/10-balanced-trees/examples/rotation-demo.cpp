#include <array>
#include <cassert>
#include <iostream>
// Fixed indexed diagram, not the assessed pointer-based rotation.
struct Cell{int key,left,right;};
int main(){std::array<Cell,5> a{{{50,1,2},{30,3,4},{70,-1,-1},{20,-1,-1},{40,-1,-1}}};a[0].left=4;a[1].right=0;int root=1;assert(a[root].key==30&&a[0].left==4);std::cout<<"root "<<a[root].key<<", transferred "<<a[a[0].left].key<<"\n";}
