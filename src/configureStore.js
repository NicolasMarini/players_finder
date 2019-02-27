import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';

export default function configureStore() {

  const logger = createLogger({
  });

  // Seteo para poder usar redux_tools
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


  return createStore(rootReducer,
    compose(
      composeEnhancers(applyMiddleware(
        thunkMiddleware,
         logger // Logger de Redux para poder ver como cambia el state después de cada action
      )
      )));

}
