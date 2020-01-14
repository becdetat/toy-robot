module.exports = function rightStepHandler( instruction, initialPosition ) {
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
