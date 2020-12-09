export const APP_NAME_NOTIFICATION = 'index/APP_NAME_NOTIFICATION';
export const LOGIN = 'index/LOGIN';
export const LOGIN_SAVE = 'index/LOGIN_SAVE';
export const LOGOUT = 'index/LOGOUT';
export const LOAD_CITIES = 'index/LOAD_CITIES';
export const SAVE_CITIES = 'index/SAVE_CITIES';

export const SEARCH_ROUTES = 'index/SEARCH_ROUTES';
export const SAVE_ROUTES = 'index/SAVE_ROUTES';

export const CREATE_SHIPPING = 'index/CREATE_SHIPPING';

export const GET_CONFIG_DATA = 'index/GET_CONFIG_DATA';
export const SAVE_CONFIG_DATA = 'index/SAVE_CONFIG_DATA';
export const UPDATE_CONFIG_DATA = 'index/UPDATE_CONFIG_DATA';

export const dispatchGetConfigData = () => ({
  type: GET_CONFIG_DATA,
})

export const dispatchSaveConfigData = (payload) => ({
  type: SAVE_CONFIG_DATA,
  payload: JSON.parse(JSON.stringify(payload)),
})

export const dispatchUpdateConfigData = (payload) => ({
  type: UPDATE_CONFIG_DATA,
  payload,
})

export const dispatchSearchRoutes = (payload) => ({
  type: SEARCH_ROUTES,
  payload,
})

export const dispatchSaveRoutes = (routes) => ({
  type: SAVE_ROUTES,
  payload: JSON.parse(JSON.stringify('{ "routes": ' + routes + '}')),
})

export const dispatchCreateShipping = (payload) => ({
  type: CREATE_SHIPPING,
  payload,
})

export const dispatchAppNameNotification = () => ({
  type: APP_NAME_NOTIFICATION,
});

export const dispatchLogin = (username, password) => ({
  type: LOGIN,
  payload: { username, password },
});

export const dispatchSaveLogin = (username, isAdmin) => ({ type: LOGIN_SAVE, payload: { username, isAdmin } });

export const dispatchLogout = () => ({ type: LOGOUT });

export const dispatchLoadCites = () => ({ type: LOAD_CITIES });

export const dispatchSaveCites = (cities) => ({
  type: SAVE_CITIES,
  payload: JSON.parse(JSON.stringify('{ "cities": ' + cities + '}')),
});

export const getAppName = (store) => store.appName;

export const getLoggedIn = (store) => store.isLoggedIn;

export const getUsername = (store) => store.username;

export const getIsAdmin = (store) => store.isAdmin;

export const getCites = (store) => store.cities;

export const getConfigData = (store) => store.configData;

export const getRoutes = (store) => store.routes;

const initialState = {
  appName: 'abc',
  username: null,
  isLoggedIn: false,
  isAdmin: false,

  cities: [],

  configData: {},

  routes: [],
};

function reducers(state = initialState, action) {
  switch (action.type) {
    case SAVE_CONFIG_DATA: {
      const { payload } = action;
      return { ...state, configData: JSON.parse(payload) }
    }

    case SAVE_CITIES: {
      const { payload } = action;
      const { cities } = JSON.parse(payload);
      return { ...state, cities };
    }
    case SEARCH_ROUTES: {
      return { ...state, routes: [] };
    }

    case SAVE_ROUTES: {
      const { payload } = action;
      const { routes } = JSON.parse(payload);
      return { ...state, routes };
    }

    case LOGIN_SAVE: {
      const { username, isAdmin } = action.payload
      return { ...state, isLoggedIn: true, username, isAdmin };
    }
    case LOGOUT: {
      return { ...state, isLoggedIn: false };
    }
    default:
      return state;
  }
}

export default reducers;
