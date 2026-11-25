#include <cassert>
#include <iostream>
struct Prefix { bool path_exists; bool terminal; };
int main(){Prefix ca{true,false}, car{true,true};assert(ca.path_exists&&!ca.terminal);assert(car.terminal);std::cout<<"ca: prefix only; car: key\n";}
