import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import { App } from 'App';
import { store } from 'store/store';
import './index.css';

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      {' '}
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();
