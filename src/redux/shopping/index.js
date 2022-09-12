import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ReduxRouter } from '@lagunovsky/redux-react-router';
import { browserHistory } from './redux/history';
import configStore from './redux/configStore';
import RoutesApp from './routes/index';

import './index.css';

const { store, persistor } = configStore();

const ShoppingApp = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ReduxRouter
                    history={browserHistory}
                    store={store}
                    children={<RoutesApp/>}
                />
            </PersistGate>
        </Provider>
    )
}
export default React.memo(ShoppingApp);