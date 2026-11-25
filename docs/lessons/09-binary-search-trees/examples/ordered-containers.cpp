#include <iostream>
#include <map>
#include <set>
#include <string>
int main(){std::set<int> keys{30,10,20,10};for(int k:keys)std::cout<<k<<' ';std::map<int,std::string> names{{1,"Ada"}};std::cout<<names.at(1)<<'\n';}
