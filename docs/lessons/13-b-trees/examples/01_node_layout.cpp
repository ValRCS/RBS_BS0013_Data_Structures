#include <iostream>
#include <vector>
int main() {
    const std::vector<int> keys{4, 9, 17};
    std::cout << "Keys: " << keys.size() << '\n';
    std::cout << "Possible internal children: " << keys.size()+1 << '\n';
}
