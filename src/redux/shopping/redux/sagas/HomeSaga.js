import { call, put, takeEvery } from 'redux-saga/effects';
import { actionHome } from '../reducers/HomeSlice';
import { REQUEST_GET_PRODUCTS } from './ActionSaga';
import { ApiServices } from '../services/ApiService';

// worker saga
function* homeSaga(){
    try {
        yield put(actionHome.startGetAllProducts(true));
        const products = yield call(ApiServices.getAllDataProducts);
        if(products.length > 0){
            // co data tra ve
            yield put(actionHome.getAllProductsSuccess(products));
        } else {
            // khong co data tra ve
            yield put(actionHome.getAllProductsFailure({
                cod: 404,
                message: 'Product not found'
            }));
        }
    } catch (err){
        yield put(actionHome.getAllProductsFailure({
            cod: 500,
            message: err
        }));
    } finally {
        yield put(actionHome.startGetAllProducts(false));
    }
}

//watcher saga
export function* watchHomeSaga(){
    yield takeEvery(REQUEST_GET_PRODUCTS, homeSaga);
}