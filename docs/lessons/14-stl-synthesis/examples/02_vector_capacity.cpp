#include <vector>
#include <cassert>
int main(){std::vector<int> v{10,20,30,40};v.reserve(v.size()+2);auto cap=v.capacity();int& ref=v[1];v.push_back(50);assert(v.capacity()==cap && ref==20);while(v.size()<v.capacity())v.push_back(0);auto old=v.capacity();v.push_back(60);assert(v.capacity()>old);/* Never use ref after reallocation. */}
