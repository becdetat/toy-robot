const BOARD_NS_SIZE = 5;
const BOARD_WE_SIZE = 5;

function copy(position) {
  return { ...position };
}

function isValidFacingDirection( f ) {
  return [ 'NORTH', 'EAST', 'SOUTH', 'WEST' ].indexOf( f ) !== -1;
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

module.exports = function performStep( initialPosition, instruction ) {
  switch ( instruction ) {
    case 'NOOP':
      return copy( initialPosition );
    case 'MOVE':
      const deltaX = initialPosition.f === 'EAST' ? 1
                     : initialPosition.f === 'WEST' ? -1
                     : 0;
      const deltaY = initialPosition.f === 'NORTH' ? 1
                     : initialPosition.f === 'SOUTH' ? -1
                     : 0;

      return {
        ...initialPosition,
        x: constrainAlongNS( initialPosition.x + deltaX ),
        y: constrainAlongWE( initialPosition.y + deltaY )
      };
    case 'LEFT': {
      const f = initialPosition.f === 'NORTH' ? 'WEST'
                : initialPosition.f === 'WEST' ? 'SOUTH'
                : initialPosition.f === 'SOUTH' ? 'EAST'
                : initialPosition.f === 'EAST' ? 'NORTH'
                : initialPosition.f;

      return {
        ...initialPosition,
        f
      }
    }
    case 'RIGHT': {
      const f = initialPosition.f === 'NORTH' ? 'EAST'
                : initialPosition.f === 'EAST' ? 'SOUTH'
                : initialPosition.f === 'SOUTH' ? 'WEST'
                : initialPosition.f === 'WEST' ? 'NORTH'
                : initialPosition.f;

      return {
        ...initialPosition,
        f
      };
    }
    case 'REPORT': {
      console.log(`x: ${initialPosition.x}, y: ${initialPosition.y}, f: ${initialPosition.f}`);

      return copy( initialPosition );
    }
  }

  // PLACE is a special case because it is followed by a position
  if ( instruction.startsWith( 'PLACE' ) ) {
    const components = instruction.slice( 6 ).split( ',' );

    if ( components.length != 3 ) {
      return copy( initialPosition );
    }

    const [ x, y, f ] = components;
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
