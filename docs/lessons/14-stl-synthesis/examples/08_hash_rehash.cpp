#include <unordered_map>
#include <cassert>
int main(){std::unordered_map<int,int> m{{1,10},{2,20}};const int& ref=m.at(1);auto before=m.bucket_count();m.rehash(before+1);assert(m.bucket_count()>=before+1);assert(ref==10);}
