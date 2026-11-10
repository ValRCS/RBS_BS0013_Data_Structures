#include "trie.hpp"
#include <stdexcept>
std::size_t Trie::index(char c) {
  if(c<'a'||c>'z') throw std::invalid_argument("lowercase a-z required");
  return static_cast<std::size_t>(c-'a');
}
// TODO 1: create nodes along the key and mark terminal.
bool Trie::insert(const std::string& word) {
  if(word.empty()) throw std::invalid_argument("empty key");
  for(char c:word) index(c);
  return false;
}
// TODO 2: follow the path and inspect the terminal marker.
bool Trie::contains(const std::string& word) const {
  if(word.empty()) return false;
  for(char c:word) index(c);
  return false;
}
// TODO 3: follow the prefix; empty prefix is valid.
bool Trie::starts_with(const std::string& prefix) const {
  for(char c:prefix) index(c);
  return prefix.empty();
}
// TODO 4: recursively enumerate terminal descendants in alphabetic order.
void Trie::collect(const Node&,std::string&,std::vector<std::string>&) {}
// TODO 5: locate the prefix node and invoke collect.
std::vector<std::string> Trie::complete(const std::string& prefix) const {
  for(char c:prefix) index(c);
  return {};
}
// TODO 6: recursively unmark terminal and prune orphan nodes.
bool Trie::erase_at(Node&,const std::string&,std::size_t,bool&) { return false; }
// TODO 7: validate, call erase_at and update count_ only on success.
bool Trie::erase(const std::string& word) {
  if(word.empty()) return false;
  for(char c:word) index(c);
  return false;
}
