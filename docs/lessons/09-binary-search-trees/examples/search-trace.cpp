#include <array>
#include <iostream>
struct Entry { int key, left, right; };
int main(){ const std::array<Entry,4> t{{{50,1,2},{30,-1,-1},{70,3,-1},{60,-1,-1}}}; int i=0; while(i!=-1){const auto& n=t[i]; std::cout<<n.key<<' '; if(n.key==60){std::cout<<"found\n"; return 0;} i=60<n.key?n.left:n.right;} return 1; }
