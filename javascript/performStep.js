module.exports = function performStep(initialPosition, instruction) {
  switch ( instruction ) {
    case 'NOOP':
      return { ...initialPosition };
  }

  return { ...initialPosition };
}
