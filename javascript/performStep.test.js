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

test( 'MOVE moves north-facing robot one step north', () => {
  const position = performStep(
    { x: 2, y: 2, f: 'N' },
    'MOVE'
  );

  expect( position.x ).toBe( 3 );
} );

test( 'MOVE north while on the north bound does not move robot', () => {
  const position = performStep(
    { x: 4, y: 2, f: 'N' },
    'MOVE'
  );

  expect( position.x ).toBe( 4 );
} );

test( 'MOVE moves south-facing robot one step south', () => {
  const position = performStep(
    { x: 2, y: 2, f: 'S' },
    'MOVE'
  );

  expect( position.x ).toBe( 1 );
} );

test( 'MOVE south while on the south bound does not move robot', () => {
  const position = performStep(
    { x: 0, y: 2, f: 'S' },
    'MOVE'
  );

  expect( position.x ).toBe( 0 );
} );

test( 'MOVE moves west-facing robot one step west', () => {
  const position = performStep(
    { x: 2, y: 2, f: 'W' },
    'MOVE'
  );

  expect( position.y ).toBe( 1 );
} );

test( 'MOVE west while on the west bound does not move robot', () => {
  const position = performStep(
    { x: 2, y: 0, f: 'W' },
    'MOVE'
  );

  expect( position.y ).toBe( 0 );
} );

test( 'MOVE moves east-facing robot one step east', () => {
  const position = performStep(
    { x: 2, y: 2, f: 'E' },
    'MOVE'
  );

  expect( position.y ).toBe( 3 );
} );

test( 'MOVE east while on the east bound does not move robot', () => {
  const position = performStep(
    { x: 2, y: 4, f: 'E' },
    'MOVE'
  );

  expect( position.y ).toBe( 4 );
} );

function getPositionFacing( f ) {
  return { x: 0, y: 0, f };
}

test( 'LEFT while facing N changes facing to W', () => {
  const position = performStep( getPositionFacing( 'N' ), 'LEFT' );

  expect( position.f ).toBe( 'W' );
} );

test( 'LEFT while facing W changes facing to S', () => {
  const position = performStep( getPositionFacing( 'W' ), 'LEFT' );

  expect( position.f ).toBe( 'S' );
} );

test( 'LEFT while facing S changes facing to E', () => {
  const position = performStep( getPositionFacing( 'S' ), 'LEFT' );

  expect( position.f ).toBe( 'E' );
} );

test( 'LEFT while facing E changes facing to N', () => {
  const position = performStep( getPositionFacing( 'E' ), 'LEFT' );

  expect( position.f ).toBe( 'N' );
} );

test( 'RIGHT while facing N changes facing to E', () => {
  const position = performStep( getPositionFacing( 'N' ), 'RIGHT' );

  expect( position.f ).toBe( 'E' );
} );

test( 'RIGHT while facing E changes facing to S', () => {
  const position = performStep( getPositionFacing( 'E' ), 'RIGHT' );

  expect( position.f ).toBe( 'S' );
} );

test( 'RIGHT while facing S changes facing to W', () => {
  const position = performStep( getPositionFacing( 'S' ), 'RIGHT' );

  expect( position.f ).toBe( 'W' );
} );

test( 'RIGHT while facing W changes facing to N', () => {
  const position = performStep( getPositionFacing( 'W' ), 'RIGHT' );

  expect( position.f ).toBe( 'N' );
} );
