#include <cassert>
#include <iostream>
#include <set>
#include <string>
int main(){std::set<std::string> prefixes{""};for(std::string word:{"car","cart","cat"})for(std::size_t i=1;i<=word.size();++i)prefixes.insert(word.substr(0,i));assert(prefixes.size()==6);std::cout<<prefixes.size()<<" distinct prefix nodes including root\n";}
