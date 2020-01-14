module.exports = function reportStepHandler( instruction, initialPosition ) {
  console.log(`${initialPosition.x},${initialPosition.y},${initialPosition.f}`);

  return initialPosition;
}
