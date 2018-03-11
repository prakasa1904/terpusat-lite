import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

const MOUNT_NODE = document.getElementById('terpusat');

render((
    <Router>
        <App pokemon={window.__PRELOADED_STATE__} />
    </Router>), MOUNT_NODE
);