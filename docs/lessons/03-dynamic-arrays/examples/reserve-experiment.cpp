#include <vector>
#include <iostream>
int main(){for(bool reserve:{false,true}){std::vector<int> a;if(reserve)a.reserve(100);int changes=0;for(int i=0;i<100;++i){auto c=a.capacity();a.push_back(i);changes+=c!=a.capacity();}std::cout<<changes<<'\n';}}
