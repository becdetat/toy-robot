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

function constrainAlongNS( x ) {
  if ( x >= BOARD_NS_SIZE ) {
    return BOARD_NS_SIZE - 1;
  }

  if ( x < 0 ) {
    return 0;
  }

  return x;
}

function constrainAlongWE( y ) {
  if ( y >= BOARD_WE_SIZE ) {
    return BOARD_WE_SIZE - 1;
  }

  if ( y < 0 ) {
    return 0;
  }

  return y;
}

module.exports = function performStep(initialPosition, instruction) {
  switch ( instruction ) {
    case 'NOOP':
      return copy( initialPosition );
    case 'MOVE':
      const deltaX = initialPosition.f === 'N' ? 1
                     : initialPosition.f === 'S' ? -1
                     : 0;
      const deltaY = initialPosition.f === 'E' ? 1
                     : initialPosition.f === 'W' ? -1
                     : 0;

      return {
        ...initialPosition,
        x: constrainAlongNS( initialPosition.x + deltaX ),
        y: constrainAlongWE( initialPosition.y + deltaY )
      };
    case 'LEFT': {
      const f = initialPosition.f === 'N' ? 'W'
                : initialPosition.f === 'W' ? 'S'
                : initialPosition.f === 'S' ? 'E'
                : initialPosition.f === 'E' ? 'N'
                : initialPosition.f;

      return {
        ...initialPosition,
        f
      }
    }
  }

  // PLACE is a special case because it is followed by a position
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
