#include <iostream>
int main() {
    constexpr int B=4096, H=64, K=8, P=8;
    constexpr int keys = (B-H-P)/(K+P);
    std::cout << "Keys: " << keys << ", fanout: " << keys+1 << '\n';
}
