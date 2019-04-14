import React from 'react';
import { connect } from 'react-redux';

export default  (Component) => {
  const stateToProps = (state) => ({ ...state });
  const dispactToProps = (dispatch) => ({ dispatch });
  return connect(
    stateToProps,
    dispactToProps
  )(Component);
};
