#include <iostream>
int main(){ int a=1,b=2; int* link=&a; int*& alias=link; alias=&b; std::cout<<*link<<'\n'; }
