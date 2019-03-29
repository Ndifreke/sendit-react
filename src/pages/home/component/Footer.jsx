import pencil from "@images/pencil.svg"
import scale from "@images/scale.svg"
import money from "@images/money.svg"
import React from "react";

export default () => {
  return (
    <div>
      <div className="ui equal width stackable center aligned padded grid" >
        <div className="row">
          <div className="column orange ">
            <p className="text container">
              Unlike our competetors, we understand the matrix
              and trade off you will incure if we charge you on
              weight category, That is whu we give
              flexibility through distance costing delivery
              </p>
            <img src={money} width="90px" height="90px" />
          </div>

          <div className="column stackable">
            <p className="container">
              At SendIt We value your business that is why we
              offer you the opportunity to take advantage of
              transparency by buying only one insurance then
              rest assured that all your Parcels will be covered
            </p>
            <img src={scale} width="90px" height="90px" />
          </div>

          <div className="ui horizontal divider"></div>

          <div className="column orange">
            <p className="container">
              When you use our services, we only charge for
              the distance to delivery. We introduce the use
              of most trusted map system, Googles map. You show
              us were to deliver on the map, We do the Math
              together, No hidden charges
            </p>
            <img src={pencil} width="90px" height="90px" />
          </div>

        </div>
      </div>
    </div>
  )
}
