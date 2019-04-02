import React, { Fragment } from 'react';
import Footer from "./component/Footer";
import Header from "../common/Header";
import "./home.css";
import "@asset/style/main.css";
import "@asset/style/shared.css";
import "semantic-ui-css/semantic.min.css";
class Home extends React.Component {


  render() {
    return (
      <div>
        <Header />

        <div id="introduction">
          <h1 className="welcome"> WELCOME TO SEND-IT</h1>
          <h1 className="slogan">
            Sending parcel should <span className="accent"> NOT </span>
            always an be <span className="accent">HASSLE</span> We
            make it <span className="accent"> BETTER </span>
          </h1>
        </div>

        <Footer />
      </div >

    );
  }
}

export default Home;
