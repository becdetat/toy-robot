defmodule ToyRobot do
  @moduledoc """
  The application is a simulation of a toy robot moving on a square tabletop.
  """

  @board_ns_size 5
  @board_we_size 5

  def is_valid_facing_direction(f) do
    Enum.any?(["NORTH", "EAST", "SOUTH", "WEST"], fn(x) -> x == f end)
  end

  def is_x_on_board(x) do
    x >= 0 && x < @board_we_size
  end

  def is_y_on_board(y) do
    y >= 0 && y < @board_ns_size
  end

  def constrain_along_ns(y) do
    cond do
      y >= @board_ns_size -> @board_ns_size - 1
      y < 0 -> 0
      true -> y
    end
  end

  def constrain_along_we(x) do
    cond do
      x >= @board_we_size -> @board_we_size - 1
      x < 0 -> 0
      true -> x
    end
  end

  def perform_step(initial_position, instruction) do
    {initial_x, initial_y, initial_facing} = initial_position

    cond do
      instruction == "NOOP" -> {initial_x, initial_y, initial_facing}
      String.starts_with?(instruction, "PLACE") ->
        try do
          {_, last_part} = String.split_at(instruction, 6)
          components = String.split(last_part, ",")

          if Enum.count(components) != 3 do
            {initial_x, initial_y, initial_facing}
          else
            [x, y, f] = components
            parsed_x = String.to_integer(x)
            parsed_y = String.to_integer(y)

            if !is_valid_facing_direction(f)
               || !is_x_on_board(parsed_x)
               || !is_y_on_board(parsed_y) do
              {initial_x, initial_y, initial_facing}
            else
              {parsed_x, parsed_y, f}
            end
          end
        rescue
          _ -> {initial_x, initial_y, initial_facing}
        end
      instruction == "MOVE" ->
        delta_x = case initial_facing do
          "EAST" -> 1
          "WEST" -> -1
          _ -> 0
        end
        delta_y = case initial_facing do
          "NORTH" -> 1
          "SOUTH" -> -1
          _ -> 0
        end
        {
          constrain_along_we(initial_x + delta_x),
          constrain_along_ns(initial_y + delta_y),
          initial_facing
        }
      instruction == "LEFT" ->
        new_facing = case initial_facing do
          "NORTH" -> "WEST"
          "WEST" -> "SOUTH"
          "SOUTH" -> "EAST"
          "EAST" -> "NORTH"
          _ -> initial_facing
        end
        {initial_x, initial_y, new_facing}
      instruction == "RIGHT" ->
        new_facing = case initial_facing do
          "NORTH" -> "EAST"
          "EAST" -> "SOUTH"
          "SOUTH" -> "WEST"
          "WEST" -> "NORTH"
          _ -> initial_facing
        end
        {initial_x, initial_y, new_facing}
      instruction == "REPORT" ->
        IO.puts("#{initial_x},#{initial_y},#{initial_facing}")
        {initial_x, initial_y, initial_facing}
      true -> {initial_x, initial_y, initial_facing}
    end
  end

  def process_input(input) do
    lines = String.split(input, ~r{(\r\n|\r|\n)})
    Enum.reduce(
      lines,
      {0, 0, "NORTH"},
      fn instruction, memo -> perform_step(memo, instruction) end
    )
  end
end
