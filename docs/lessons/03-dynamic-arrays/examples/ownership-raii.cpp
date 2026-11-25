#include <memory>
#include <iostream>
int main(){auto buffer=std::make_unique<int[]>(4);buffer[0]=42;std::cout<<buffer[0]<<'\n';}
