#include <iostream>
#include <string_view>
#include <vector>

void print_vector(std::string_view name, const std::vector<int>& values) {
    std::cout << name << " = ";

    for (int value : values) {
        std::cout << value << ' ';
    }

    std::cout << '\n';
}

int main() {
    std::vector<int> a{1, 2, 3};

    auto b = a;
    auto& c = a;

    b[0] = 10;
    c[1] = 20;

    a.push_back(4);

    print_vector("a", a);
    print_vector("b", b);
    print_vector("c", c);
}

