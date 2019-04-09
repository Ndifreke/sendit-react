import React from 'react';
import common from '@style/common.css';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import Loader from '@common/Loading';
import Sendit from '@src/api';

const ACTION = { DELETE: 0, CANCEL: 1 };
Modal.setAppElement(ParcelDelete);

const deleteModel = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    paddingBottom: '10px'
  }
};

class ParcelDelete extends React.Component {
  state = {
    isOpen: false
  };
  static getDerivedStateFromProps() {
    return { isOpen: true };
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    afterDelete: PropTypes.func.isRequired
  };

  confirmAction = (action) => {
    const { id } = this.props;
    return async () => {
      console.log(action);
      switch (action) {
        case ACTION.DELETE:
          this.setState(() => ({ loading: true }));
          await Sendit.put(`/api/v1/parcels/${id}/cancel`, null, true);
          break;
        case ACTION.CANCEL:
      }
      this.setState(() => ({ loading: false }));
      this.props.afterDelete();
    };
  };

  render() {
    const {loading} = this.state;
    return (
      <Modal isOpen={this.state.isOpen} style={deleteModel}>
        <div className="actions">
          <div className="ui header center aligned">Confirm Cancel</div>
          <div
            onClick={this.confirmAction(ACTION.DELETE)}
            className="ui approve mini negative button">
            YES
          </div>
          &emsp;
          <div
            onClick={this.confirmAction(ACTION.CANCEL)}
            className="ui cancel mini positive button">
            NO
          </div>
          <br />
          <Loader size={1} visible={loading} />
        </div>
      </Modal>
    );
  }
}
export default ParcelDelete;
