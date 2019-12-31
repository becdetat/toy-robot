const performStep = require('./performStep');

test( 'performStep with a NOOP', () => {
  const initialPosition = { x: 1, y: 2, f: 'N' };

  const newPosition = performStep(initialPosition, 'NOOP');

  expect( newPosition.x ).toBe( 1 );
  expect( newPosition.y ).toBe( 2 );
  expect( newPosition.f ).toBe( 'N' );
} );
