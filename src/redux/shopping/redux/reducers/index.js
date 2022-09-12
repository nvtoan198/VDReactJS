import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { createRouterReducer } from '@lagunovsky/redux-react-router';
import storage from 'redux-persist/lib/storage';
import homeReducer from './HomeSlice';
import cartReducer from './CartSlice';
import detailReducer from './DetailSlice';
import { browserHistory } from '../history';

const configCartPersistReducer = {
    key: 'CartPersistReducer',
    storage,
    whitelist: ['dataCarts']
}

const rootReducer = combineReducers({
    home: homeReducer, // co the luu hoac ko vao redux persist
    cart: persistReducer(configCartPersistReducer, cartReducer),
    router: createRouterReducer(browserHistory), // khong bao gio luu router nay vao trong redux persist
    detail: detailReducer
});
export default rootReducer;