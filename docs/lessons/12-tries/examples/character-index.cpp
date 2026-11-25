#include <cassert>
#include <stdexcept>
#include <iostream>
unsigned index_of(char c) { if(c<'a'||c>'z') throw std::invalid_argument("ASCII lowercase required"); return static_cast<unsigned>(c-'a'); }
int main(){assert(index_of('a')==0 && index_of('z')==25);try{index_of('7');assert(false);}catch(const std::invalid_argument&){} std::cout<<"a=0, z=25\n";}
