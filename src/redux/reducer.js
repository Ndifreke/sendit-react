import actions from './action';
const TYPE = actions.TYPES;

const initialState = {
  isSignup: { status: null, message: null }
};

const dispatch = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case TYPE.auth:
      // if (action.isLogin) action.history.push('/login');
      break;

    case TYPE.flight:
      return { inFlight: true, ...state };

    case TYPE.signup:
      const isSignup = action.response;
      return { isSignup };

    case TYPE.signin:
      const isSignin = action.response;
      console.log(action);
      return { isSignin };

    default:
      return state;
  }
};
export default dispatch;
