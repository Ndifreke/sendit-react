import { authenticate, signup, signin } from '@src/api';
const TYPES = {
  auth: 'auth',
  signup: 'signup',
  flight: 'flight',
  signin: 'signin',
};

const action = {
  auth:  (history) =>{
    return async (dispatch) => {
    const isLogin = await authenticate(history);
    dispatch({ type: TYPES.auth, isLogin, history });
  }
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
  flight: { type: TYPES.flight }
};

action.TYPES = TYPES;

export default action;
