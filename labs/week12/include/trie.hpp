#pragma once
#include <array>
#include <cstddef>
#include <memory>
#include <string>
#include <vector>
class Trie {
  struct Node {
    bool terminal = false;
    std::array<std::unique_ptr<Node>,26> child{};
  };
  Node root_;
  std::size_t count_ = 0;
  static std::size_t index(char c);
  static void collect(const Node& node, std::string& path,
                      std::vector<std::string>& result);
  static bool erase_at(Node& node, const std::string& word,
                       std::size_t depth, bool& removed);
public:
  bool insert(const std::string& word);
  bool contains(const std::string& word) const;
  bool starts_with(const std::string& prefix) const;
  bool erase(const std::string& word);
  std::vector<std::string> complete(const std::string& prefix) const;
  std::size_t size() const noexcept { return count_; }
};
