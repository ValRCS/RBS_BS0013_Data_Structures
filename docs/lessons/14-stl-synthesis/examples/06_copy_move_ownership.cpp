#include <vector>
#include <memory>
#include <utility>
#include <cassert>
int main(){std::vector<int> a{10,20};auto b=a;b[0]=99;assert(a[0]==10);auto& alias=a;alias[0]=30;auto c=std::move(a);assert(c[0]==30);a.clear();auto p=std::make_unique<int>(7);auto q=std::move(p);assert(!p && *q==7);}
