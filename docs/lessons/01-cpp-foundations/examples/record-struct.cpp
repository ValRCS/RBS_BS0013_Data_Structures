#include <iostream>
#include <string>
struct Book { std::string title; int pages; };
int main() {
    Book b{"Atlas", 120};
    std::cout << b.title << " " << b.pages << "\n";
}
