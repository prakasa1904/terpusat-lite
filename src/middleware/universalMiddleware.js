import React from 'react';
import { renderToString } from 'react-dom/server'
import { matchPath, StaticRouter } from 'react-router-dom';

import renderFullPage from './../html';
import App from './../App';

export default (req, res, next) => {
  const context = {}
  
  const html = renderToString(
    <StaticRouter context={context} location={req.url} >
      <App context={req} />
    </StaticRouter>
  );

  return res.status(200).type('html').send(renderFullPage(html));
};