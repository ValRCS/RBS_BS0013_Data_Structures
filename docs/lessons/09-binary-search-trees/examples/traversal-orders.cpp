#include <array>
#include <iostream>
struct Entry {int key,left,right;};
int main(){const std::array<Entry,3> t{{{30,1,2},{20,-1,-1},{40,-1,-1}}}; auto walk=[&](auto&& self,int i,int order)->void{if(i<0)return;const auto& n=t[i];if(order==0)std::cout<<n.key<<' ';self(self,n.left,order);if(order==1)std::cout<<n.key<<' ';self(self,n.right,order);if(order==2)std::cout<<n.key<<' ';}; for(int o:{1,0,2}){walk(walk,0,o);std::cout<<'\n';}}
