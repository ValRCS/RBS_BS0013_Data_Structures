#include <iostream>
#include <map>
#include <set>
int main(){std::set<int> keys{30,10,20,20};for(int k:keys)std::cout<<k<<" ";std::cout<<"\n";std::map<int,int> m{{20,4},{10,8}};std::cout<<m.lower_bound(15)->first<<"\n";}
