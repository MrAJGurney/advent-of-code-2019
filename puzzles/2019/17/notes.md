# Notes

## Star 1

### Definitions

- The puzzle input is an intcode program
- When the intcode program is run, the outputs are ASCII character codes
- Important characters:
  - 35 = `#` = scaffold
  - 46 = `.` = empty space
  - 10 = `newline` = newline
  - 94 = `^` = robot facing up
  - 118 = `v` = robot facing down
  - 60 = `<` = robot facing left
  - 62 = `>` = robot facing right
  - 88 = `X` = robot tumbling through space

### Path to Solution

- Find the sum of all alignment parameters of scaffold intersections
  - run the intcode program
  - store the ASCII output in a grid
  - find all scaffold intersections
    - an intersection will be a scaffold section with a scaffold section in each of the cardinal directions
  - find the alignment parameters
    - the alignment parameter should be the product of its x and y coordinates
  - sum the alignment parameters

### Testing

The solution is dependant on a working intcode computer, but should not require any changes to be made. It would therefore be inappropriate to write tests that interact with the intcode computer.

A mock intcode computer that outputs ASCII codes would enable testing functionality that interacts with intcode computers.