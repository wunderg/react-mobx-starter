import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppState from './AppState';
import TodoState from './todo/TodosState.js';
import App from './App';

const appState = new AppState();
const todoState = new TodoState();

injectTapEventPlugin();
render(
  <AppContainer>
    <Provider appState={appState} todoState={todoState}>
      <MuiThemeProvider>
        <App/>
      </MuiThemeProvider>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;

    render(
      <AppContainer>
        <Provider appState={appState} todoState={todoState}>
          <MuiThemeProvider>
            <NextApp />
          </MuiThemeProvider>
          </Provider>
      </AppContainer>,
      document.getElementById('root')
      );
  });
}
