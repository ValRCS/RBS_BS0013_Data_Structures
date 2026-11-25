#include <vector>
#include <utility>
#include <iostream>
int main(){std::vector<int> a{10,20};auto b=std::move(a);std::cout<<b.size()<<' '<<b[0]<<'\n';a.clear();a.push_back(30);std::cout<<a[0]<<'\n';}
