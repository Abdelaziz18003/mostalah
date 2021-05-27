const { check  } = require( 'express-validator' );

module.exports = [
    check( 'from' )
        .not()
        .isEmpty()
        .isString(),
    check( 'to' )
        .not()
        .isEmpty()
        .isString(),
]