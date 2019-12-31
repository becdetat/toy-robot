const performStep = require( './performStep' );

test( 'NOOP', () => {
  const initialPosition = { x: 1, y: 2, f: 'NORTH' };

  const newPosition = performStep( initialPosition, 'NOOP' );

  expect( newPosition ).toMatchObject( { x: 1, y: 2, f: 'NORTH' } );
} );

function getOriginPosition() {
  return { x: 0, y: 0, f: 'NORTH' };
}

test( 'PLACE within table', () => {
  const position = performStep(
    getOriginPosition(),
    'PLACE 3,4,SOUTH'
  );

  expect( position ).toMatchObject( { x: 3, y: 4, f: 'SOUTH' } );
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
    'PLACE N,3,SOUTH'
  );

  expect( position ).toMatchObject( getOriginPosition() );
} );
test( 'PLACE with malformed Y coordinate is ignored', () => {
  const position = performStep(
    getOriginPosition(),
    'PLACE 3,N,SOUTH'
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
    'PLACE -1,3,NORTH'
  );

  expect( position ).toMatchObject( getOriginPosition() );
} );

test( 'PLACE cannot place outside X boundary in positive direction', () => {
  const position = performStep(
    getOriginPosition(),
    'PLACE 6,3,NORTH'
  );

  expect( position ).toMatchObject( getOriginPosition() );
} );

test( 'PLACE cannot place outside Y boundary in negative direction', () => {
  const position = performStep(
    getOriginPosition(),
    'PLACE 1,-3,NORTH'
  );

  expect( position ).toMatchObject( getOriginPosition() );
} );

test( 'PLACE cannot place outside Y boundary in positive direction', () => {
  const position = performStep(
    getOriginPosition(),
    'PLACE 3,6,NORTH'
  );

  expect( position ).toMatchObject( getOriginPosition() );
} );

test( 'MOVE moves north-facing robot one step north', () => {
  const position = performStep(
    { x: 2, y: 2, f: 'NORTH' },
    'MOVE'
  );

  expect( position.y ).toBe( 3 );
} );

test( 'MOVE north while on the north bound does not move robot', () => {
  const position = performStep(
    { x: 2, y: 4, f: 'NORTH' },
    'MOVE'
  );

  expect( position.y ).toBe( 4 );
} );

test( 'MOVE moves south-facing robot one step south', () => {
  const position = performStep(
    { x: 2, y: 2, f: 'SOUTH' },
    'MOVE'
  );

  expect( position.y ).toBe( 1 );
} );

test( 'MOVE south while on the south bound does not move robot', () => {
  const position = performStep(
    { x: 2, y: 0, f: 'SOUTH' },
    'MOVE'
  );

  expect( position.y ).toBe( 0 );
} );

test( 'MOVE moves west-facing robot one step west', () => {
  const position = performStep(
    { x: 2, y: 2, f: 'WEST' },
    'MOVE'
  );

  expect( position.x ).toBe( 1 );
} );

test( 'MOVE west while on the west bound does not move robot', () => {
  const position = performStep(
    { x: 0, y: 2, f: 'WEST' },
    'MOVE'
  );

  expect( position.x ).toBe( 0 );
} );

test( 'MOVE moves east-facing robot one step east', () => {
  const position = performStep(
    { x: 2, y: 2, f: 'EAST' },
    'MOVE'
  );

  expect( position.x ).toBe( 3 );
} );

test( 'MOVE east while on the east bound does not move robot', () => {
  const position = performStep(
    { x: 4, y: 2, f: 'EAST' },
    'MOVE'
  );

  expect( position.x ).toBe( 4 );
} );

function getPositionFacing( f ) {
  return { x: 0, y: 0, f };
}

test( 'LEFT while facing NORTH changes facing to WEST', () => {
  const position = performStep( getPositionFacing( 'NORTH' ), 'LEFT' );

  expect( position.f ).toBe( 'WEST' );
} );

test( 'LEFT while facing WEST changes facing to SOUTH', () => {
  const position = performStep( getPositionFacing( 'WEST' ), 'LEFT' );

  expect( position.f ).toBe( 'SOUTH' );
} );

test( 'LEFT while facing SOUTH changes facing to EAST', () => {
  const position = performStep( getPositionFacing( 'SOUTH' ), 'LEFT' );

  expect( position.f ).toBe( 'EAST' );
} );

test( 'LEFT while facing EAST changes facing to NORTH', () => {
  const position = performStep( getPositionFacing( 'EAST' ), 'LEFT' );

  expect( position.f ).toBe( 'NORTH' );
} );

test( 'RIGHT while facing NORTH changes facing to EAST', () => {
  const position = performStep( getPositionFacing( 'NORTH' ), 'RIGHT' );

  expect( position.f ).toBe( 'EAST' );
} );

test( 'RIGHT while facing EAST changes facing to SOUTH', () => {
  const position = performStep( getPositionFacing( 'EAST' ), 'RIGHT' );

  expect( position.f ).toBe( 'SOUTH' );
} );

test( 'RIGHT while facing SOUTH changes facing to WEST', () => {
  const position = performStep( getPositionFacing( 'SOUTH' ), 'RIGHT' );

  expect( position.f ).toBe( 'WEST' );
} );

test( 'RIGHT while facing WEST changes facing to NORTH', () => {
  const position = performStep( getPositionFacing( 'WEST' ), 'RIGHT' );

  expect( position.f ).toBe( 'NORTH' );
} );
