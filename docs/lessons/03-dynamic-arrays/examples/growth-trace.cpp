#include <vector>
#include <iostream>
int main(){std::vector<int> a; for(int i=0;i<12;++i){auto c=a.capacity();a.push_back(i);std::cout<<a.size()<<' '<<a.capacity()<<' '<<(c!=a.capacity())<<'\n';}}
