import { call, put, takeEvery } from 'redux-saga/effects';
import { actionDetail } from '../reducers/DetailSlice';
import { REQUEST_GET_DETAIL_PRODUCT } from './ActionSaga';
import { ApiServices } from '../services/ApiService';

function* detailPdSaga({ id }){
    try {
        yield put(actionDetail.startGetLoadingDetail(true));
        const dataDetail = yield call(ApiServices.getDetailProductById, id);
        if(dataDetail !== null && !dataDetail.hasOwnProperty('status')){
            // lay dc du lieu theo id san pham
            yield put(actionDetail.getDetailProductSuccess(dataDetail));
        } else {
            // khong co du lieu theo id san pham
            yield put(actionDetail.getDetailProductFailure({
                cod: 404,
                message: 'Not found data'
            }));
        }
    } catch(err) {
        yield put(actionDetail.getDetailProductFailure({
            cod: 500,
            message: err
        }));
    } finally {
        yield put(actionDetail.startGetLoadingDetail(false));
    }
}

// watcher saga
export function* watchDetailSaga(){
    yield takeEvery(REQUEST_GET_DETAIL_PRODUCT, detailPdSaga);
}