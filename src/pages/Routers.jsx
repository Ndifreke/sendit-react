import React from "react";
import {Route, Switch} from 'react-router-dom';
import Home from "@pages/Home";

function MainRouter(){
    return (
        <Switch>
             {/* <Route component={SignIn}/> */}
            <Route component={Home}/>
        </Switch> 
    );
} 
export default MainRouter;
