import React from "react";
import "@asset/style/main.css";
import "@asset/style/shared.css";
import UIBuilder from "@asset/script/UIBuilder"
import login from "@asset/script/authLogin"

class SignIn extends React.Component {


  ()=>{
    <div class="ui placeholder segment">
  <div class="ui two column very relaxed stackable grid">
    <div class="column">
      <div class="ui form">
        <div class="field">
          <label>Username</label>
          <div class="ui left icon input">
            <input type="text" placeholder="Username">
            <i class="user icon"></i>
          </div>
        </div>
        <div class="field">
          <label>Password</label>
          <div class="ui left icon input">
            <input type="password">
            <i class="lock icon"></i>
          </div>
        </div>
        <div class="ui blue submit button">Login</div>
      </div>
    </div>
    <div class="middle aligned column">
      <div class="ui big button">
        <i class="signup icon"></i>
        Sign Up
      </div>
    </div>
  </div>
  <div class="ui vertical divider">
    Or
  </div>
</div>
  }
  render() {
    return (
      <div>
        <script type="text/javascript"> {UIBuilder} </script>
        <script type="text/javascript"> {login} </script>

        <div className="fixed-centered bounce" id='wait-animation'>
          <svg className='wait-spin' width='46' height='46'>
            <circle className='c1' cx='23px' cy='23px' r='9' fill='gray' strokeWidth='3' />
            <g fill='orange'>
              <circle cx='4' cy='23' r='4' />
              <circle cx='23' cy='4' r='4' />
              <circle cx='42' cy='23' r='4' />
              <circle cx='23' cy='42' r='4' />
            </g>
          </svg>
          <div className="wait-message">
            <strong>Connecting .... </strong>
          </div>
        </div>

        <div className="viewport">
          <span id="signout"></span>

          <header>
            <div id="logo">
              <a href='../index.html'> </a>
            </div>
            <nav className="positon-bottom-right">
              <ul>
                <li id="navigation-list">
                  <a href="./signup.html" className="active-btn botton">
                    SIGN UP </a>
                </li>
              </ul>
            </nav>
          </header>



          <main id="main">
            <div style={{ marginTop: "68px" }}>
              <div id="loginUI" className="elevate">

                <span id='message-alert'>#</span>

                <h2 className="align-center"> Sign into SendIt Account </h2>


                <form className="centered" method='POST' name='login'>
                  <fieldset >
                    <legend> <strong>Email </strong> </legend>
                    <input type="email" name="email" className='fit-width centered' placeholder="new@emai.com"
                      required />
                  </fieldset>
                  <fieldset >
                    <legend><strong>Password</strong></legend>
                    <input type="password" name='password' className='fit-width centered'
                      placeholder="password" value='password' required />
                  </fieldset>

                  <div id='loader'>
                    <svg className='wait-spin' width='46' height='46'>
                      <circle className='c1' cx='23px' cy='23px' r='3' fill='gray' strokeWidth='3' />
                      <g fill='orange'>
                        <circle cx='14' cy='23' r='3' />
                        <circle cx='23' cy='14' r='3' />
                        <circle cx='32' cy='23' r='3' />
                        <circle cx='23' cy='32' r='3' />
                      </g>
                    </svg>
                  </div>
                  <input type="button" name='submitButton' className="prim-btn botton" value='Continue' />
                </form>
              </div>

            </div>

          </main>


        </div>
      </div>
    )
  }
}
export default SignIn;
