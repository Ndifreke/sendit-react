import actions from './action';
const TYPE = actions.TYPES;

const initialState = {
  isSignup: { status: null, message: null },
  parcels: {
    list: []
  },
  isLogin: false,
  editorOpen: false
};

const dispatch = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.auth:
      if (action.isLogin) action.history.push('/parcel');
      return { ...state, isLogin: action.isLogin };
    case TYPE.flight:
      return { inFlight: true, ...state };

    case TYPE.signup:
      const isSignup = action.response;
      return { ...state, isSignup };

    case TYPE.openEditor:
      const editorOpen = action.editorOpen;
      return { ...state, editorOpen };

    case TYPE.closeEditor:
      return { ...state, editorOpen: action.editorOpen };

    case TYPE.signin:
      const isLogin = action.response;
      return { ...state, isLogin };

    case TYPE.hasLogin:
      return { ...state, isLogin: action.isLogin };

    case TYPE.parcels:
      const { status, parcels } = action.response;
      return { ...state, parcels: { list: parcels, status } };

    default:
      return state;
  }
};
export default dispatch;
