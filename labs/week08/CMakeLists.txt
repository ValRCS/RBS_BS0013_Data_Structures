cmake_minimum_required(VERSION 3.16)
project(bs0013_week08_binary_heap LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

option(ENABLE_SANITIZERS "Enable AddressSanitizer and UndefinedBehaviorSanitizer" OFF)
enable_testing()

add_library(binary_heap src/binary_heap.cpp)
target_include_directories(binary_heap PUBLIC include)
target_compile_options(binary_heap PRIVATE -Wall -Wextra -Wpedantic)

add_executable(week08_tests tests/test_binary_heap.cpp)
target_link_libraries(week08_tests PRIVATE binary_heap)
target_compile_options(week08_tests PRIVATE -Wall -Wextra -Wpedantic)

if(ENABLE_SANITIZERS AND CMAKE_CXX_COMPILER_ID MATCHES "GNU|Clang")
    foreach(target binary_heap week08_tests)
        target_compile_options(${target} PRIVATE -fsanitize=address,undefined -fno-omit-frame-pointer)
        target_link_options(${target} PRIVATE -fsanitize=address,undefined)
    endforeach()
endif()

add_test(NAME week08_tests COMMAND week08_tests)
