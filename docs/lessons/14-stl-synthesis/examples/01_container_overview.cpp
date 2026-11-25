#include <array>
#include <deque>
#include <list>
#include <queue>
#include <vector>
#include <cassert>
int main(){std::array<int,3> a{1,2,3};std::vector<int> v(a.begin(),a.end());std::deque<int> d(v.begin(),v.end());d.push_front(0);std::list<int> l{1,2};l.push_back(3);std::queue<int> q;q.push(d.front());q.push(l.back());assert(q.front()==0 && q.back()==3);}
