#include "trie.hpp"
#include <cassert>
#include <stdexcept>
#include <vector>
#include <string>
int main() {
  Trie t;
  assert(t.size()==0 && t.starts_with(""));
  assert(!t.contains("") && !t.contains("cat"));
  assert(t.insert("car") && t.insert("cart") && t.insert("cat"));
  assert(!t.insert("car") && t.size()==3);
  assert(t.contains("car") && !t.contains("ca") && t.starts_with("ca"));
  assert((t.complete("ca")==std::vector<std::string>{"car","cart","cat"}));
  assert(t.erase("car") && !t.contains("car") && t.contains("cart"));
  assert(!t.erase("car") && t.size()==2);
  assert(t.erase("cart") && t.erase("cat"));
  assert(t.complete("").empty() && t.size()==0);
  bool invalid=false;
  try { t.insert("Cat"); } catch(const std::invalid_argument&) { invalid=true; }
  assert(invalid);
}
