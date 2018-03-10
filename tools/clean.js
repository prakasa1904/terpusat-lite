import config from 'config'
import { cleanDir } from './lib/fs'

/**
 * Cleans up the output (build) directory.
 */
function clean() {
  return Promise.all([
    cleanDir('public/*', {
      nosort: true,
      dot: true,
      ignore: ['public/.git'],
    }),
    cleanDir(`${config.logDir}/${config.logFile}`)
  ]);
}

export default clean
