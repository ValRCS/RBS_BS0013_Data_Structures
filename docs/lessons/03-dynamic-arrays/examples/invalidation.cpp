#include <vector>
#include <iostream>
int main(){std::vector<int> a{10,20};int* p=&a[0];std::cout<<*p<<'\n';a.reserve(a.capacity()+1);p=&a[0];std::cout<<*p<<'\n';}
