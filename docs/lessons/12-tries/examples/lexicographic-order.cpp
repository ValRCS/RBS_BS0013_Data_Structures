#include <cassert>
#include <iostream>
#include <map>
#include <string>
int main(){std::map<char,int> children{{'t',2},{'a',1},{'r',3}};std::string labels;for(const auto& entry:children)labels+=entry.first;assert(labels=="art");std::cout<<labels<<"\n";}
