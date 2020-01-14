module.exports = function leftStepHandler( instruction, initialPosition ) {
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
