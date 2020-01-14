const { BOARD_NS_SIZE, BOARD_WE_SIZE } = require( './constants' );

function isValidFacingDirection( f ) {
  return [ 'NORTH', 'EAST', 'SOUTH', 'WEST' ].indexOf( f ) !== -1;
}

function isXOnBoard( x ) {
  return x >= 0 && x < BOARD_WE_SIZE;
}

function isYOnBoard( y ) {
  return y >= 0 && y < BOARD_NS_SIZE;
}

module.exports = function placeStepHandler( instruction, initialPosition ) {
  const components = instruction.slice( 6 ).split( ',' );

  if ( components.length != 3 ) {
    return initialPosition;
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
    return initialPosition;
  }

  return {
    x: parsedX,
    y: parsedY,
    f
  };
}
