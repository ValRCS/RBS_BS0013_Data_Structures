#include <algorithm>
#include <list>
#include <vector>
#include <cassert>
int main(){std::vector<int> v{4,2,1};std::sort(v.begin(),v.end());std::list<int> l{4,2,1};l.sort();auto it=std::lower_bound(v.begin(),v.end(),2);assert(it!=v.end() && *it==2);assert(std::is_sorted(l.begin(),l.end()));}
