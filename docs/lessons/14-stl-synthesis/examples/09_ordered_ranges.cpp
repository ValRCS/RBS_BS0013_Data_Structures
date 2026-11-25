#include <map>
#include <vector>
#include <cassert>
int main(){std::map<int,int> m{{1,10},{3,30},{5,50},{7,70}};std::vector<int> keys;for(auto it=m.lower_bound(3),end=m.lower_bound(7);it!=end;++it)keys.push_back(it->first);assert((keys==std::vector<int>{3,5}));}
