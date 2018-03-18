import React from 'react';
import { render } from 'react-dom';

import '../index.html';
import App from './components/App';

const renderApp = (Component) => {
  render(<Component />, document.getElementById('root'));
};

renderApp(App);
