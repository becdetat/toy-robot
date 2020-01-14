const { BOARD_NS_SIZE, BOARD_WE_SIZE } = require( './constants' );

function constrainAlongNS( y ) {
  if ( y >= BOARD_NS_SIZE ) {
    return BOARD_NS_SIZE - 1;
  }

  if ( y < 0 ) {
    return 0;
  }

  return y;
}

function constrainAlongWE( x ) {
  if ( x >= BOARD_WE_SIZE ) {
    return BOARD_WE_SIZE - 1;
  }

  if ( x < 0 ) {
    return 0;
  }

  return x;
}

module.exports = function moveStepHandler( instruction, initialPosition ) {
  const deltaX = initialPosition.f === 'EAST' ? 1
                 : initialPosition.f === 'WEST' ? -1
                 : 0;
  const deltaY = initialPosition.f === 'NORTH' ? 1
                 : initialPosition.f === 'SOUTH' ? -1
                 : 0;

  return {
    ...initialPosition,
    x: constrainAlongWE( initialPosition.x + deltaX ),
    y: constrainAlongNS( initialPosition.y + deltaY )
  };
}
