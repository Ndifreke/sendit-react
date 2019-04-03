import React from 'react';
import '@style/parcel.css';

class ParcelComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
      ...props.parcel
    };
  }

  toggleParcel = () => {
    const { isHidden } = this.state;
    this.refs.parcelContainer.style.display = isHidden ? 'block' : 'none';
    this.setState({ isHidden: isHidden ? false : true });
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
      price,
      title,
      isHidden
    } = this.state;
    return (
      <div>
        <div className="ui parcel-header">
          <strong>{shortname}</strong>

          <div className="header-right">
            <strong>{created_at}</strong> &emsp;
            <label>{status} </label> &emsp;
            <button className="button" onClick={this.toggleParcel}>
              <i className="close large icon" />
            </button>
          </div>
        </div>
        <div ref="parcelContainer">
          <div className="ui equal width aligned padded grid stackable">
            <div className="row" />
            <div className="black column">
              <strong className="ui container">{description}</strong>
            </div>

            <div className="column parcel">
              <div className="ui middle aligned divided list">
                <div className="item">
                  <div className="ui container">
                    <div className="right floated content">{location}</div>
                    <i className="thumbtack icon" />
                    <div className="ui label">location</div>
                  </div>
                </div>

                <div className="item">
                  <div className="ui container">
                    <div className="right floated content">{destination}</div>
                    <i className="location arrow icon" />
                    <div className="ui label">destination</div>
                  </div>
                </div>

                <div className="item">
                  <div className="ui container">
                    <div className="right floated content">{price}</div>
                    <i className="bitcoin icon" />
                    <div className="ui label">charge</div>
                  </div>
                </div>

                <div className="item">
                  <div className="ui container">
                    <div className="right floated content">{created_at}</div>
                    <i className="clock outline icon" />
                    <div className="ui label">created</div>
                  </div>
                </div>

                <div className="item">
                  <div className="ui container">
                    <div className="right floated content">{status}</div>
                    <i className="hourglass half icon" />
                    <div className="ui label">status</div>
                  </div>
                </div>

                <div className="item">
                  <div className="ui container">
                    <div className="right floated content">
                      <div className="ui mini buttons">
                        <button className="ui yellow button" title="edit">
                          <i className="edit outline icon" />
                        </button>
                        <div className="or" />
                        <button className="ui red button" title="delete">
                          <i className="trash alternate outline icon" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ParcelComponent;
