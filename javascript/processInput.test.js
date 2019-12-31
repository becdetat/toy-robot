const processInput = require( './processInput' );

test( 'Example 1', () => {
  const input = `PLACE 0,0,NORTH
MOVE
REPORT`;

  const position = processInput( input );

  expect( position ).toMatchObject( { x: 0, y: 1, f: 'NORTH' } );
} );

test( 'Example 2', () => {
  const input = `PLACE 0,0,NORTH
LEFT
REPORT`;

  const position = processInput( input );

  expect( position ).toMatchObject( { x: 0, y: 0, f: 'WEST' } );
} );

test( 'Example 3', () => {
  const input = `PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT`;

  const position = processInput( input );

  expect( position ).toMatchObject( { x: 3, y: 3, f: 'NORTH' } );
} );
