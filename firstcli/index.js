const yargs = require('yargs').argv

const argv = yargs
  .demand('f')
  .nargs('f', 1)
  .describle('f', )