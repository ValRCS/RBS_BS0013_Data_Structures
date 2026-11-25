#include <iterator>
#include <vector>
#include <deque>
#include <list>
#include <forward_list>
#include <unordered_set>
static_assert(std::contiguous_iterator<std::vector<int>::iterator>);
static_assert(std::random_access_iterator<std::deque<int>::iterator>);
static_assert(!std::contiguous_iterator<std::deque<int>::iterator>);
static_assert(std::bidirectional_iterator<std::list<int>::iterator>);
static_assert(std::forward_iterator<std::forward_list<int>::iterator>);
static_assert(std::forward_iterator<std::unordered_set<int>::iterator>);
int main(){}
