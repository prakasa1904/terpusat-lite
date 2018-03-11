import React from 'react';
import { renderToString } from 'react-dom/server'
import { matchPath, StaticRouter } from 'react-router-dom';

import renderFullPage from './../html';
import routes from './../routes';

export default (req, res, next) => {
  const context = {}

  console.log('=========== req.url ===========')
  console.log(req.url)
  console.log('=========== req.url ===========')
  
  const html = renderToString(
    <StaticRouter context={context} location={req.url} >
      <App pokemon={pokemon} />
    </StaticRouter>
  );

  return res.status(200).send(renderFullPage(html, pokemon));
};