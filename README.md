# toy-robot

This repo contains Javascript and Elixir solutions to the toy robot simulator, described
in [PROBLEM.md](PROBLEM.md).

## Javascript

Run tests using `yarn test` or `npm tests`.

There is also an interactive REPL shell that can be started using `node repl.js`. Quit the REPL by pressing `control-c`.


## Elixir

There is an Elixir solution in the `elixir/toy_robot` directory. Run tests using `mix test` within that directory.

There is no interactive shell for this solution however if you run `iex` you can run a series of commands using `process_input`:

```
iex(1)> ToyRobot.process_input("PLACE 1,2,EAST
...(1)> MOVE
...(1)> MOVE
...(1)> LEFT
...(1)> MOVE
...(1)> REPORT")
3,3,NORTH
{3, 3, "NORTH"}
iex(2)>
```
