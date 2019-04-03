const server = 'http://localhost:8080';

import sendit, { authenticate, signup, signin } from '@src/api';
const TYPES = {
  auth: 'auth',
  signup: 'signup',
  flight: 'flight',
  signin: 'signin',
  parcels: 'parcels'
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
  flight: { type: TYPES.flight },

  parcels: async (dispatch) => {
    let status, body;
    try {
      const response = await sendit.get(`${server}/api/v1/users/null/parcels`);
      body = await response.json();
      status = response.status;
      console.log(body);
      dispatch({
        type: TYPES.parcels,
        response: { parcels: body.response, status }
      });
    } catch (e) {
      dispatch({
        type: TYPES.parcels,
        response: { parcels: [], status }
      });
    }
  }
};

action.TYPES = TYPES;

export default action;
