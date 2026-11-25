#include <vector>
#include <iostream>
int main(){std::vector<int> a{10,20,30}; a.reserve(8); std::cout<<a.size()<<' '<<a.capacity()<<'\n';}
