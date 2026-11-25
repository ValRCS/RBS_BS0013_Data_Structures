#include <array>
#include <iostream>
struct Entry{int key,left;};
int main(){const std::array<Entry,3> t{{{90,1},{70,2},{60,-1}}};int i=0;while(t[i].left!=-1)i=t[i].left;std::cout<<t[i].key<<'\n';}
