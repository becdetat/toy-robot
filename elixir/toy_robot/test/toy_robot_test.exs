defmodule ToyRobotTest do
  use ExUnit.Case
  doctest ToyRobot

  test "NOOP" do
    initial_position = {1, 2, "NORTH"}

    new_position = ToyRobot.perform_step(initial_position, "NOOP")

    assert new_position == initial_position
  end

  test "PLACE within table" do
    new_position = ToyRobot.perform_step(
      {0, 0, "NORTH"},
      "PLACE 3,4,SOUTH"
    )

    assert new_position == {3, 4, "SOUTH"}
  end

  test "PLACE with missing value is ignored" do
    new_position = ToyRobot.perform_step(
      {0, 0, "NORTH"},
      "PLACE 3,4"
    )

    assert new_position == {0, 0, "NORTH"}
  end

  test "PLACE with malformed X coordinate is ignored" do
    new_position = ToyRobot.perform_step(
      {0, 0, "NORTH"},
      "PLACE N,3,SOUTH"
    )

    assert new_position == {0, 0, "NORTH"}
  end

  test "PLACE with malformed Y coordinate is ignored" do
    new_position = ToyRobot.perform_step(
      {0, 0, "NORTH"},
      "PLACE 3,N,SOUTH"
    )

    assert new_position == {0, 0, "NORTH"}
  end

  test "PLACE with malformed facing direction is ignored" do
    new_position = ToyRobot.perform_step(
      {0, 0, "NORTH"},
      "PLACE 3,3,X"
    )

    assert new_position == {0, 0, "NORTH"}
  end

  test "PLACE cannot place outside X boundary in negative direction" do
    new_position = ToyRobot.perform_step(
      {0, 0, "NORTH"},
      "PLACE -1,3,NORTH"
    )

    assert new_position == {0, 0, "NORTH"}
  end

  test "PLACE cannot place outside X boundary in positive direction" do
    new_position = ToyRobot.perform_step(
      {0, 0, "NORTH"},
      "PLACE 6,3,NORTH"
    )

    assert new_position == {0, 0, "NORTH"}
  end

  test "PLACE cannot place outside Y boundary in negative direction" do
    new_position = ToyRobot.perform_step(
      {0, 0, "NORTH"},
      "PLACE 1,-3,NORTH"
    )

    assert new_position == {0, 0, "NORTH"}
  end

  test "PLACE cannot place outside Y boundary in positive direction" do
    new_position = ToyRobot.perform_step(
      {0, 0, "NORTH"},
      "PLACE 3,6,NORTH"
    )

    assert new_position == {0, 0, "NORTH"}
  end

  test "MOVE moves north-facing robot one step north" do
    new_position = ToyRobot.perform_step(
      {2, 2, "NORTH"},
      "MOVE"
    )

    assert new_position == { 2, 3, "NORTH" }
  end

  test "MOVE north while on the north bound does not move robot" do
    new_position = ToyRobot.perform_step(
      {2, 4, "NORTH"},
      "MOVE"
    )

    assert new_position == {2, 4, "NORTH"}
  end

  test "MOVE moves south-facing robot one step south" do
    new_position = ToyRobot.perform_step(
      {2, 2, "SOUTH"},
      "MOVE"
    )

    assert new_position == {2, 1, "SOUTH"}
  end

  test "MOVE south while on the south bound does not move robot" do
    new_position = ToyRobot.perform_step(
      {2, 0, "SOUTH"},
      "MOVE"
    )

    assert new_position == {2, 0, "SOUTH"}
  end

  test "MOVE moves west-facing robot one step west" do
    new_position = ToyRobot.perform_step(
      {2, 2, "WEST"},
      "MOVE"
    )

    assert new_position == {1, 2, "WEST"}
  end

  test "MOVE west while on the west bound does not move robot" do
    new_position = ToyRobot.perform_step(
      {0, 2, "WEST"},
      "MOVE"
    )

    assert new_position == {0, 2, "WEST"}
  end

  test "MOVE moves east-facing robot one step east" do
    new_position = ToyRobot.perform_step(
      { 2, 2, "EAST"},
      "MOVE"
    )

    assert new_position == {3, 2, "EAST"}
  end

  test "MOVE east while on the east bound does not move robot" do
    new_position = ToyRobot.perform_step(
      {4, 2, "EAST"},
      "MOVE"
    )

    assert new_position == {4, 2, "EAST"}
  end

  test "LEFT while facing NORTH changes facing to WEST" do
    new_position = ToyRobot.perform_step(
      {0, 0, "NORTH"},
      "LEFT"
    )

    assert new_position == {0, 0, "WEST"}
  end

  test "LEFT while facing WEST changes facing to SOUTH" do
    new_position = ToyRobot.perform_step(
      {0, 0, "WEST"},
      "LEFT"
    )

    assert new_position == {0, 0, "SOUTH"}
  end

  test "LEFT while facing SOUTH changes facing to EAST" do
    new_position = ToyRobot.perform_step(
      {0, 0, "SOUTH"},
      "LEFT"
    )

    assert new_position == {0, 0, "EAST"}
  end

  test "LEFT while facing EAST changes facing to NORTH" do
    new_position = ToyRobot.perform_step(
      {0, 0, "EAST"},
      "LEFT"
    )

    assert new_position == {0, 0, "NORTH"}
  end

  test "RIGHT while facing NORTH changes facing to EAST" do
    new_position = ToyRobot.perform_step(
      {0, 0, "NORTH"},
      "RIGHT"
    )

    assert new_position == {0, 0, "EAST"}
  end

  test "RIGHT while facing EAST changes facing to SOUTH" do
    new_position = ToyRobot.perform_step(
      {0, 0, "EAST"},
      "RIGHT"
    )

    assert new_position == {0, 0, "SOUTH"}
  end

  test "RIGHT while facing SOUTH changes facing to WEST" do
    new_position = ToyRobot.perform_step(
      {0, 0, "SOUTH"},
      "RIGHT"
    )

    assert new_position == {0, 0, "WEST"}
  end

  test "RIGHT while facing WEST changes facing to NORTH" do
    new_position = ToyRobot.perform_step(
      {0, 0, "WEST"},
      "RIGHT"
    )

    assert new_position == {0, 0, "NORTH"}
  end

  test "Input example 1" do
    position = ToyRobot.process_input("PLACE 0,0,NORTH
MOVE
REPORT")

    assert position == {0, 1, "NORTH"}
  end

  test "Input example 2" do
    position = ToyRobot.process_input("PLACE 0,0,NORTH
LEFT
REPORT")

    assert position == {0, 0, "WEST"}
  end

  test "Input example 3" do
    position = ToyRobot.process_input("PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT")

    assert position == {3, 3, "NORTH"}
  end
end
