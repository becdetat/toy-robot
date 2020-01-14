const getStepHandler = require( './getStepHandler' );

module.exports = function performStep( initialPosition, instruction ) {
  const handler = getStepHandler( instruction );

  return handler( instruction, initialPosition );
}
