#include <array>
#include <iostream>
int main(){std::array<int,4> a{10,20,30,40}; for(auto& x:a) std::cout << static_cast<const void*>(&x) << '\n'; std::cout << sizeof(int) << '\n';}
