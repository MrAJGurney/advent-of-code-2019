# Notes

## Star 1

### Star 1: Definitions

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

### Star 1: Path to Solution

- Find the sum of all alignment parameters of scaffold intersections
  - run the intcode program
  - store the ASCII output in a grid
  - find all scaffold intersections
    - an intersection will be a scaffold section with a scaffold section in each of the cardinal directions
  - find the alignment parameters
    - the alignment parameter should be the product of its x and y coordinates
  - sum the alignment parameters

### Star 1: Testing

The solution is dependant on a working intcode computer, but should not require any changes to be made. It would therefore be inappropriate to write tests that interact with the intcode computer.

A mock intcode computer that outputs ASCII codes would enable testing functionality that interacts with intcode computers.

## Star 2

### Star 2: Definitions

- Changing the ASCII code's address 0 from `1` to `2` enables the part 2 logic
- Input is a series of ASCII character codes ending with a `\n` character code
  - one movement routine that calls the movement functions
    - limited to 20 characters (excluding the newline)
    - each character is a movement function
      - e.g. `A,B,C,B,A,C`
  - three movement functions
    - limited to 20 characters (excluding the newline)
    - `L`: turn left
    - `R`: turn right
    - `[a number]`: move forward that many spaces
      - e.g. `R,4,L,2,R,8`
  - an option to request the video feed
    - `y` or `n`

### Star 2: Path to Solution

- prepare movement routine with functions
  - build map of the scaffolding
  - build movement instructions
    - rotate smallest angle to face scaffold
    - move forward until no longer facing scaffold
    - repeat until it would require a 180 degree rotation
    - there are potential issues with this*
  - break down movement instructions into functions
    - unsure on how to approach this
    - will investigate https://en.wikipedia.org/wiki/DEFLATE#Duplicate_string_elimination
- launch robot
  - launch a fresh intcode computer
    - software at address 0 needs altered
  - feed in input ASCII character codes
  - run program until it stops
  - get dust collected from output
- record dust collected

*A potential issue with this approach is that I assume the robot moves straight at an intersection, moving straight again when it comes down the other part. One way to handle the issue would be to map all possible paths that don't involve backtracking, branching at intersections. The number of paths would be 2<sup>(number of intersections)</sup>.

### Star 2: Testing

The movement routine and function building is testable.

Since the robot movement is handled by the intcode computer (and the instructions submitted at the start) it would be innapropriate to try and test how the robot handles instructions (beyond the tests that already exist on the intcode computer).
