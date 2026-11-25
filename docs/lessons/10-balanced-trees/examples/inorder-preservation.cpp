#include <array>
#include <algorithm>
#include <iostream>
int main(){constexpr std::array before{20,30,40,50,70},after{20,30,40,50,70};static_assert(before==after);static_assert(std::is_sorted(after.begin(),after.end()));for(int k:after)std::cout<<k<<" ";std::cout<<"\n";}
