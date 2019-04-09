import React from 'react';
import '@style/parcel.css';
import ParcelDelete from '@common/ParcelDelete';
import PropTypes from 'prop-types';
import ParcelSummary from '@common/ParcelSummary';

const getAction = ({ onEdit, promptDelete }) => {
  return function Action() {
    return (
      <div className="item">
        <div className="ui container">
          <div className="right floated content">
            <div className="ui mini buttons">
              <button
                className="ui yellow button"
                title="edit"
                onClick={onEdit}>
                <i className="edit outline icon" />
              </button>

              <div className="or" />
              <button
                className="ui red button"
                title="delete"
                onClick={promptDelete}>
                <i className="trash alternate outline icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

class Parcel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteOpen: false
    };
  }

  static propTypes = {
    openEditor: PropTypes.func.isRequired,
    parcel: PropTypes.object.isRequired
  };

  onEdit = () => {
    const { parcel, openEditor } = this.props;
    openEditor(parcel);
  };

  promptDelete = () => {
    const deleteOpen = this.state.deleteOpen ? false : true;
    this.setState({ deleteOpen });
  };

  toggleVisibility = () => {
    const { isHidden } = this.state;
    this.refs.parcelContainer.style.display = isHidden ? 'block' : 'none';
    this.setState({ isHidden: isHidden ? false : true });
  };
  /**
   * returns a component that will be displayed along with
   * Parcels, this component most likely should be a button
   */
  getAction = () => {
    return {
      ActionComponent: getAction({
        onEdit: this.onEdit,
        promptDelete: this.promptDelete
      })
    };
  };

  render() {
    const {
      id,
      description,
      shortname,
      status,
      created_at,
      origin,
      destination,
      owner,
      location,
      price
    } = this.props.parcel;
    const { deleteOpen, isHidden } = this.state;
    return (
      <div>
        {deleteOpen ? (
          <ParcelDelete id={id} afterDelete={this.promptDelete} />
        ) : null}

        <div
          className="ui parcel-header"
          style={{ backgroundColor: !isHidden ? 'chocolate' : '' }}>
          <div className="header-right">
            <div className="buttons" onClick={this.toggleVisibility}>
              {isHidden ? (
                <i className="expand icon white" />
              ) : (
                <i className="compress icon white" />
              )}
            </div>
          </div>
          <div>
            <div className="ui mini list">
              <div className="item">{shortname}</div>
              <div className="item">{created_at}</div>
              <div className="item">{status} </div>
            </div>
          </div>
        </div>
        <div ref="parcelContainer">
          <div className="ui two equal width aligned padded grid stackable parcelContent">
            <div className="column" size='2'>
              <strong className="ui container">{description}</strong>
            </div>
            <div className="column">
            <ParcelSummary
              parcel={this.props.parcel}
              Action={this.getAction()}
            />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Parcel;
