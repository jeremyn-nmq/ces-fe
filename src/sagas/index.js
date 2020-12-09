import {
    LOAD_CITIES,
    dispatchSaveCites,
    dispatchSaveLogin,
    LOGIN,
    SEARCH_ROUTES,
    CREATE_SHIPPING,
    GET_CONFIG_DATA,
    UPDATE_CONFIG_DATA,
    dispatchSaveConfigData,
    dispatchSaveRoutes,
} from '../reducers';
import {
    getCitiesAPI,
    loginAPI,
    getConfigDataAPI,
    postConfigDataAPI,
    getRoutesAPI
} from '../api';
import {
    select,
    take,
    put,
    call,
    takeLatest,
    takeEvery,
} from 'redux-saga/effects';
export function* loadAllCites() {
    try {
        const { data } = yield call(getCitiesAPI);
        yield put(dispatchSaveCites(data));
    } catch (error) {
        alert('Load cities failed:' + error);
    }
}

export function* loginSaga({ payload }) {
    const { username, password } = payload;
    try {
        const { data } = yield call(loginAPI, username, password);
        if (data == 'Admin') {
            yield put(dispatchSaveLogin(username, true));
        } else if (data == 'Employee') {
            yield put(dispatchSaveLogin(username, false));
        }
    } catch (error) {
        alert('Login failed:' + error);
    }
}

export function* getConfigData() {
    try {
        const { data } = yield call(getConfigDataAPI);
        console.log(data)
        yield put(dispatchSaveConfigData(data));
    } catch (error) {
        alert('Get configData failed:' + error);
    }
}

export function* updateConfigData({ payload }) {
    try {
      const {data} =  yield call(
            postConfigDataAPI,
            payload
        );

        if(data == "Success"){
            alert('Config Updated')
        }
    } catch (error) {
        alert('Update configData failed:' + error);
    }
}

export function* searchAllRoutes({ payload }) {
    try {
        const { data } = yield call(getRoutesAPI, payload);
        yield put(dispatchSaveRoutes(data));
    } catch (error) {
        alert('Search Routes failed:' + error);
    }
}

export function* createShipping({ payload }) {
    console.log(payload);
}

export default function* saga() {
    yield takeEvery(LOGIN, loginSaga);
    yield takeLatest(LOAD_CITIES, loadAllCites);
    yield takeEvery(SEARCH_ROUTES, searchAllRoutes);
    yield takeEvery(CREATE_SHIPPING, createShipping);

    yield takeEvery(GET_CONFIG_DATA, getConfigData);
    yield takeEvery(UPDATE_CONFIG_DATA, updateConfigData);
}
