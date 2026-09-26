cmake_minimum_required(VERSION 3.16)
project(bs0013_week05_circular_queue LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

option(ENABLE_SANITIZERS "Enable AddressSanitizer and UndefinedBehaviorSanitizer" OFF)

add_library(int_circular_queue src/int_circular_queue.cpp)
target_include_directories(int_circular_queue PUBLIC include)
target_compile_options(int_circular_queue PRIVATE -Wall -Wextra -Wpedantic)

if(ENABLE_SANITIZERS AND CMAKE_CXX_COMPILER_ID MATCHES "GNU|Clang")
    target_compile_options(int_circular_queue PUBLIC -fsanitize=address,undefined -fno-omit-frame-pointer)
    target_link_options(int_circular_queue PUBLIC -fsanitize=address,undefined)
endif()

enable_testing()

add_executable(week05_public_tests tests/public_tests.cpp)
target_link_libraries(week05_public_tests PRIVATE int_circular_queue)
target_compile_options(week05_public_tests PRIVATE -Wall -Wextra -Wpedantic)

add_test(NAME week05_public_tests COMMAND week05_public_tests)
