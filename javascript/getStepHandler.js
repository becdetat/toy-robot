const placeStepHandler = require( './placeStepHandler' );
const noopStepHandler = require( './noopStepHandler' );
const moveStepHandler = require( './moveStepHandler' );
const leftStepHandler = require( './leftStepHandler' );
const rightStepHandler = require( './rightStepHandler' );
const reportStepHandler = require( './reportStepHandler' );

module.exports = function getStepHandler( instruction ) {
  if ( instruction.startsWith( 'PLACE' ) ) {
    return placeStepHandler;
  }

  switch (instruction) {
    case 'NOOP': return noopStepHandler;
    case 'MOVE': return moveStepHandler;
    case 'LEFT': return leftStepHandler;
    case 'RIGHT': return rightStepHandler;
    case 'REPORT': return reportStepHandler;
  }

  return noopStepHandler;
}
