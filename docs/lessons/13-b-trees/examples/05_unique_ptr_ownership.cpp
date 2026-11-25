#include <iostream>
#include <memory>
#include <utility>
int main() {
    auto original = std::make_unique<int>(42);
    auto recipient = std::move(original);
    std::cout << std::boolalpha << (original == nullptr) << ' ' << *recipient << '\n';
}
