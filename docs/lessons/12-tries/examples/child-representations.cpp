#include <array>
#include <cassert>
#include <iostream>
#include <map>
int main(){int a=1,t=2;std::array<int*,26> dense{};dense[0]=&a;dense[19]=&t;std::map<char,int*> sparse{{'a',&a},{'t',&t}};assert(dense[19]==sparse.at('t'));std::cout<<dense.size()<<" slots vs "<<sparse.size()<<" entries (not total bytes)\n";}
