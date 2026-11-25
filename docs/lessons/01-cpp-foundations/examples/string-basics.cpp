#include <iostream>
#include <string>
int main() {
    std::string name = "Riga";
    name.at(0) = 'r';
    std::cout << name << " " << name.size() << "\n";
}
