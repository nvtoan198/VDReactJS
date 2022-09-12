import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { createRouterMiddleware } from '@lagunovsky/redux-react-router';
import createSagaMiddleware from 'redux-saga';
import { 
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import rootSaga from './sagas/index';
import rootReducer from './reducers/index';
import { browserHistory } from './history';

const sagaMiddleware   = createSagaMiddleware();
const routerMiddleware = createRouterMiddleware(browserHistory);

const myConfigureStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            thunk: false,
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(routerMiddleware, sagaMiddleware, logger)
    });
    sagaMiddleware.run(rootSaga);
    const persistor = persistStore(store);
    return { store, persistor}
}
export default myConfigureStore;