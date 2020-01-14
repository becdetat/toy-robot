const getStepHandler = require( './getStepHandler' );
const noopStepHandler = require( './noopStepHandler' );
const placeStepHandler = require( './placeStepHandler' );
const moveStepHandler = require( './moveStepHandler' );
const leftStepHandler = require( './leftStepHandler' );
const rightStepHandler = require( './rightStepHandler' );
const reportStepHandler = require( './reportStepHandler' );

test( 'UNKNOWN', () => {
  const handler = getStepHandler( 'UNKNOWN' );

  expect( handler ).toBe( noopStepHandler );
} );

test( 'PLACE', () => {
  const handler = getStepHandler( 'PLACE 1,2,N' )

  expect( handler ).toBe( placeStepHandler );
} );

test( 'NOOP', () => {
  const handler = getStepHandler( 'NOOP' );

  expect( handler ).toBe( noopStepHandler );
} );

test( 'MOVE', () => {
  const handler = getStepHandler( 'MOVE' );

  expect( handler ).toBe( moveStepHandler );
} );

test( 'LEFT', () => {
  const handler = getStepHandler( 'LEFT' );

  expect( handler ).toBe( leftStepHandler );
} );

test( 'RIGHT', () => {
  const handler = getStepHandler( 'RIGHT' );

  expect( handler ).toBe( rightStepHandler );
} );

test( 'REPORT', () => {
  const handler = getStepHandler( 'REPORT' );

  expect( handler ).toBe( reportStepHandler );
} );
