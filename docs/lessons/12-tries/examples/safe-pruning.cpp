#include <cassert>
#include <iostream>
struct MiniNode{bool terminal;unsigned children;};
bool eligible(MiniNode n,bool root){return !root&&!n.terminal&&n.children==0;}
int main(){assert(!eligible({false,1},false));assert(!eligible({true,0},false));assert(!eligible({false,0},true));assert(eligible({false,0},false));std::cout<<"Only nonroot unused leaves may be pruned\n";}
