import { authenticate, signup, signin, fetchParcels } from '@src/api';
const TYPES = {
  auth: 'auth',
  signup: 'signup',
  flight: 'flight',
  signin: 'signin',
  parcels: 'parcels',
  hasLogin: 'loginSuccess',
  openEditor: 'openEditor',
  closeEditor: 'closeEditor'
};

const action = {
  auth: (history) => {
    return async (dispatch) => {
      const isLogin = await authenticate(history);
      dispatch({ type: TYPES.auth, isLogin, history });
    };
  },

  signup: (data) => {
    return async (dispatch) => {
      const { status, message } = await signup(data);
      dispatch({ type: TYPES.signup, response: { status, message } });
    };
  },

  signin: (data) => {
    return async (dispatch) => {
      const { status, message } = await signin(data);
      dispatch({ type: TYPES.signin, response: { status, message } });
    };
  },
  openEditor: { type: TYPES.openEditor, editorOpen: true },
  closeEditor: { type: TYPES.closeEditor, editorOpen: false },
  hasLogin: { type: TYPES.hasLogin, isLogin: true },

  flight: { type: TYPES.flight },

  parcels: async (dispatch) => {
    const { parcels, status } = await fetchParcels();
    dispatch({
      type: TYPES.parcels,
      response: { parcels, status }
    });
  }
};

action.TYPES = TYPES;

export default action;
