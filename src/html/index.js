import fs from 'fs';
import { resolve as pathResolve } from 'path';
import appRootDir from 'app-root-dir';

/**
 * Retrieves the js/css for the named chunks that belong to our client bundle.
 *
 * Note: the order of the chunk names is important. The same ordering will be
 * used when rendering the scripts.
 *
 * This is useful to us for a couple of reasons:
 *   - It allows us to target the assets for a specific chunk, thereby only
 *     loading the assets we know we will need for a specific request.
 *   - The assets are hashed, and therefore they can't be "manually" added
 *     to the render logic.  Having this method allows us to easily fetch
 *     the respective assets simply by using a chunk name. :)
 */
getClientAssets = () => {
  let resultCache
  // Return the assets json cache if it exists.
  // In development mode we always read the assets json file from disk to avoid
  // any cases where an older version gets cached.
  if (process.env.NODE_ENV === 'production' && resultCache) {
    return resultCache
  }

  const assetsPath = pathResolve(appRootDir.get(), './build/assets.json')

  if (!fs.existsSync(assetsPath)) {
    throw new Error(
      `We could not find the "${assetsPath}" file, which contains a list of the assets of the client bundle.  Please ensure that the client bundle has been built.`,
    )
  }

  const readAssetsFile = () => JSON.parse(fs.readFileSync(assetsPath, 'utf8'))
  const assetsJson = readAssetsFile()
  if (typeof assetsJson === 'undefined') {
    throw new Error('No asset data found for client bundle.')
  }
  resultCache = assetsJson
  return resultCache
}

export default (html, preloadedState) => {
  const clientAssets = getClientAssets();

  return `
  <!DOCTYPE html>
    <html>
      <head>
        <title>Terpusat</title>
      </head>
      <body>
        <div id="terpusat">${html}</div>
        <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>
        <script defer src="${clientAssets.vendor.js}" type="text/javascript"></script>
        <script defer src="${clientAssets.client.js}" type="text/javascript"></script>
      </body>
    </html>`;
}