const performStep = require('./performStep')

module.exports = function processInput( input ) {
  const lines = input.match(/[^\r\n]+/g);
  const position = lines.reduce(
    (memo, instruction) => performStep( memo, instruction ),
    { x: 0, y: 0, f: 'NORTH' }
  );

  return position;
}
