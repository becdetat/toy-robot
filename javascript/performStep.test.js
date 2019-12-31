const performStep = require('./performStep');

test( 'NOOP', () => {
  const initialPosition = { x: 1, y: 2, f: 'N' };

  const newPosition = performStep( initialPosition, 'NOOP' );

  expect( newPosition ).toMatchObject( { x: 1, y: 2, f: 'N' } );
} );

function getOriginPosition() {
  return { x: 0, y: 0, f: 'N' };
}

test( 'PLACE within table', () => {
  const position = performStep(
    getOriginPosition(),
    'PLACE 3,4,S'
  );

  expect( position ).toMatchObject( { x: 3, y: 4, f: 'S' } );
} );

test( 'PLACE with missing value is ignored', () => {
  const position = performStep(
    getOriginPosition(),
    'PLACE 3,4'
  );

  expect( position ).toMatchObject( getOriginPosition() );
} );

test( 'PLACE with malformed X coordinate is ignored', () => {
  const position = performStep(
    getOriginPosition(),
    'PLACE N,3,S'
  );

  expect( position ).toMatchObject( getOriginPosition() );
} );
test( 'PLACE with malformed Y coordinate is ignored', () => {
  const position = performStep(
    getOriginPosition(),
    'PLACE 3,N,S'
  );

  expect( position ).toMatchObject( getOriginPosition() );
} );

test( 'PLACE with malformed facing direction is ignored', () => {
  const position = performStep(
    getOriginPosition(),
    'PLACE 3,3,X'
  );

  expect( position ).toMatchObject( getOriginPosition() );
} );

test( 'PLACE cannot place outside X boundary in negative direction', () => {
  const position = performStep(
    getOriginPosition(),
    'PLACE -1,3,N'
  );

  expect( position ).toMatchObject( getOriginPosition() );
} );

test( 'PLACE cannot place outside X boundary in positive direction', () => {
  const position = performStep(
    getOriginPosition(),
    'PLACE 6,3,N'
  );

  expect( position ).toMatchObject( getOriginPosition() );
} );

test( 'PLACE cannot place outside Y boundary in negative direction', () => {
  const position = performStep(
    getOriginPosition(),
    'PLACE 1,-3,N'
  );

  expect( position ).toMatchObject( getOriginPosition() );
} );

test( 'PLACE cannot place outside Y boundary in positive direction', () => {
  const position = performStep(
    getOriginPosition(),
    'PLACE 3,6,N'
  );

  expect( position ).toMatchObject( getOriginPosition() );
} );
