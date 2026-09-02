cmake_minimum_required(VERSION 3.22)

project(bs0013_week01 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}")

function(add_lab_target target source)
    add_executable(${target} ${source})
    target_compile_options(${target} PRIVATE -Wall -Wextra -Wpedantic)
endfunction()

add_lab_target(hello src/hello.cpp)
add_lab_target(value_reference src/value_reference.cpp)
add_lab_target(vector_basics src/vector_basics.cpp)
add_lab_target(copy_alias src/copy_alias.cpp)
add_lab_target(sequence src/sequence.cpp)
add_lab_target(bonus_week1 src/bonus-week1.cpp)

# This target is intentionally excluded: broken.cpp is a compiler-diagnostics exercise.
add_executable(broken EXCLUDE_FROM_ALL src/broken.cpp)
target_compile_options(broken PRIVATE -Wall -Wextra -Wpedantic)

# This target is also excluded because its warning is the point of the exercise.
add_executable(warning EXCLUDE_FROM_ALL src/warning.cpp)
target_compile_options(warning PRIVATE -Wall -Wextra -Wpedantic)

include(CTest)
if(BUILD_TESTING)
    add_test(NAME starter_hello_runs COMMAND hello)
    add_test(NAME starter_value_reference_runs COMMAND value_reference)
    add_test(NAME starter_vector_basics_runs COMMAND vector_basics)
    add_test(NAME starter_copy_alias_runs COMMAND copy_alias)
    add_test(NAME starter_sequence_runs COMMAND sequence)
    add_test(NAME starter_bonus_week1_runs COMMAND bonus_week1)
endif()

