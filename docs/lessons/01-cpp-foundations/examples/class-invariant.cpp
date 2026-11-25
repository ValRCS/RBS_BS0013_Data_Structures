#include <iostream>
class Counter {
    int value_ = 0;
public:
    bool increment() {
        if (value_ == 10) return false;
        ++value_;
        return true;
    }
    int value() const { return value_; }
};
int main() {
    Counter c;
    for (int i = 0; i < 12; ++i) c.increment();
    std::cout << c.value() << "\n";
}
