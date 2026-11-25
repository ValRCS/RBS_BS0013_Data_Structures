#include <vector>
#include <cassert>
int main(){std::vector<int> v{1,-2,-3,4};for(auto it=v.begin();it!=v.end();){if(*it<0)it=v.erase(it);else ++it;}assert((v==std::vector<int>{1,4}));std::erase_if(v,[](int x){return x%2==0;});assert(v.size()==1);}
