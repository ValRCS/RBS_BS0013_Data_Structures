#include <vector>
#include <iostream>
int main(){std::vector<int> a{10,20};auto b=a;b[0]=999;std::cout<<a[0]<<' '<<b[0]<<'\n';}
