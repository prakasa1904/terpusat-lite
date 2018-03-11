const errorLoading = err => console.log('Dynamic home page loading failed', err)
const loadRoute = cb => module => cb(null, module.default)

export function homeView(nextState, cb) {
  import(/* webpackChunkName: "terpusat-home" */ './components')
    .then(loadRoute(cb))
    .catch(errorLoading)
}
