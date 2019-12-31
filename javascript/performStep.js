const BOARD_NS_SIZE = 5;
const BOARD_WE_SIZE = 5;

function copy(position) {
  return { ...position };
}

function isValidFacingDirection( f ) {
  return 'NESW'.indexOf( f ) !== -1;
}

function isXOnBoard( x ) {
  return x >= 0 && x < BOARD_NS_SIZE;
}

function isYOnBoard( y ) {
  return y >= 0 && y < BOARD_WE_SIZE;
}

module.exports = function performStep(initialPosition, instruction) {
  switch ( instruction ) {
    case 'NOOP':
      return copy( initialPosition );
  }

  if ( instruction.startsWith( 'PLACE' ) ) {
    const slicedInstruction = instruction.slice( 6 );

    if ( slicedInstruction.length != 5 ) {
      return copy( initialPosition );
    }

    const [ x, y, f ] = slicedInstruction.split( ',' );
    const parsedX = parseInt( x );
    const parsedY = parseInt( y );

    if ( isNaN( parsedX )
         || isNaN( parsedY )
         || ! isValidFacingDirection( f )
         || ! isXOnBoard( parsedX )
         || ! isYOnBoard( parsedY )
       ) {
      return copy( initialPosition );
    }

    return {
      x: parsedX,
      y: parsedY,
      f
    };
  }

  return copy( initialPosition );
}
