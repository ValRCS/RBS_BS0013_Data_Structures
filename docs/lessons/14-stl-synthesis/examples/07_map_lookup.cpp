#include <map>
#include <string>
#include <cassert>
int main(){std::map<int,std::string> m{{1,"Riga"}};assert(!m.contains(2));assert(m.find(2)==m.end() && m.size()==1);auto& s=m[2];assert(s.empty() && m.size()==2);s="Liepaja";assert(m.at(2)=="Liepaja");}
