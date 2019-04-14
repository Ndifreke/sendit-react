import React, { Fragment } from 'react';
import '@style/main.css';
import '@style/shared.css';
import pencil from '@images/pencil.svg';
import scale from '@images/scale.svg';
import money from '@images/money.svg';
import Header from '@common/Header';
import { connect } from 'react-redux';
import action from '@redux/action';
import connectStore from "@common/connectStore";

class Home extends React.Component {
  /* Authenticate login on everytime the page is loaded */
  async componentDidMount() {
    //  this.props.dispatch(action.auth(this.props.history));
  }

  render() {
    return (
      <Fragment>
      <Header/>
        <section id="home-content">
          <p style={{ height: '10%' }} />

          <div id="introduction">
            <h1 className="welcome"> WELCOME TO SEND-IT</h1>
            <h1 className="slogan">
              Sending parcel should <span className="accent"> NOT </span>
              always an be <span className="accent">HASSLE</span> We make it{' '}
              <span className="accent"> BETTER </span>
            </h1>
          </div>

          <div id="services">
            <div className="service">
              <img src={pencil} width="90px" height="90px" />
              <h4>PAY ON DISTANCE BASE</h4>
              <p>
                Unlike our competetors, we understand the matrix and trade off
                you will incure if we charge you on weight category, That is whu
                we give flexibility through distance costing delivery
              </p>
            </div>
            <hr />
            <div className="service">
              <img src={money} width="90px" height="90px" />
              <h4>ONE TIME INSURANCE</h4>
              <p>
                At SendIt We value your business that is why we offer you the
                opportunity to take advantage of transparency by buying only one
                insurance then rest assured that all your Parcels will be
                covered
              </p>
            </div>
            <hr className="divider" />
            <div className="service">
              <img src={scale} width="90px" height="90px" />
              <h4>ACCURATE COST ESTIMATION</h4>
              <p>
                When you use our services, we only charge for the distance to
                delivery. We introduce the use of most trusted map system,
                Googles map. You show us were to deliver on the map, We do the
                Math together, No hidden charges
              </p>
            </div>
          </div>
        </section>
  </Fragment>
    );
  }
}

export const HomePage = connectStore(Home);

export default Home;
