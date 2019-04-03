import actions from './action';
const TYPE = actions.TYPES;

const initialState = {
  isSignup: { status: null, message: null },
  parcels: {
    list: []
  }
};

const dispatch = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case TYPE.auth:
      if (action.isLogin) action.history.push('/parcel');
      break;

    case TYPE.flight:
      return { inFlight: true, ...state };

    case TYPE.signup:
      const isSignup = action.response;
      return { isSignup };

    case TYPE.signin:
      const isSignin = action.response;
      return { isSignin };

    case TYPE.parcels:
      const { status, parcels } = action.response;
      return { parcels: { list: parcels, status } };

    default:
      return state;
  }
};
export default dispatch;
