#include <map>
#include <set>
#include <string>
#include <utility>
#include <cassert>
int main(){std::map<std::string,int> by_id;std::set<std::pair<int,std::string>> by_priority;auto insert=[&](std::string id,int p){if(by_id.emplace(id,p).second)by_priority.emplace(p,id);};insert("A",3);insert("B",7);auto top=*by_priority.rbegin();assert(top.second=="B" && by_id.at(top.second)==top.first);by_id.erase(top.second);by_priority.erase(top);assert(by_id.size()==by_priority.size());/* Production needs exception-safety policy. */}
