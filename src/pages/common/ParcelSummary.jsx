import React from 'react';

class ParcelSummarry extends React.Component {
  render() {
    const {
      location,
      destination,
      price,
      created_at,
      status,
      distance
    } = this.props.parcel;
    const { ActionComponent } = this.props.Action;
    return (
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
              <div className="right floated content">{new Date(created_at).toDateString()}</div>
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
              <div className="right floated content">{distance}</div>
              <i className="road icon"></i>
              <div className="ui label">distance</div>
            </div>
          </div>
        </div>
        {ActionComponent ? <ActionComponent /> : null}
      </div>
    );
  }
}

export default ParcelSummarry;
