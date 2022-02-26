import './index.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import { App } from 'App';
import { store } from 'store/store';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      {' '}
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();
