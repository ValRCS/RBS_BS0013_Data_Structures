#include <vector>
#include <iostream>
int main(){std::vector<int> a{1,2,3,4};a.reserve(8);a.insert(a.begin()+1,9);for(int x:a)std::cout<<x<<' ';std::cout<<'\n';a.erase(a.begin()+1);for(int x:a)std::cout<<x<<' ';std::cout<<'\n';}
