#include <iostream>
#include <optional>
bool allowed(int k,std::optional<int> lo,std::optional<int> hi){return (!lo||k>*lo)&&(!hi||k<*hi);}
int main(){std::cout<<(allowed(40,{},70)?"local valid":"local invalid")<<", "<<(allowed(40,50,70)?"global valid":"global invalid")<<'\n';}
