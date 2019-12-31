const readline = require( 'readline' );
const performStep = require( './performStep' );

const rli = readline.createInterface( process.stdin, process.stdout );

const prompt = ( lastPosition ) => {
  return new Promise( ( resolve, reject ) => {
    rli.question(
      '> ',
      ( instruction ) => {
        const newPosition = performStep( lastPosition, instruction );

        return resolve( newPosition );
      }
    );
  } );
};

const main = async () => {
  let position = { x: 0, y: 0, f: 'NORTH' };

  while ( true ) {
    position = await prompt( position );
    console.log(`🤖 ${JSON.stringify( position )}`)
  }
};

main();
