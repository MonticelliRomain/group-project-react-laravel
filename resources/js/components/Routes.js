import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import CreateAccount from './create-account';
import Create from './create';
import DisplayAll from './display-all';
import DisplayEvent from './display-event';
import DisplayPast from './display-past';
import Edit from './edit';
import MyEvents from './my-events';
import MyParticipation from './my-participations';
import Login from './login';
import Logout from './logout';
import SubscriptionEvent from './subscription-event';
import UnsubscriptionEvent from './unsuscription-event';
import Home from './Home'
import posed, { PoseGroup } from 'react-pose';

const RouteContainer = posed.div({
  enter: { x:0, opacity: 1, delay: 100, beforeChildren: true },
  exit: { y:100, opacity: 0 }
});


const Routes = () => (

   <Route render={ ({ location }) => (
        <PoseGroup>
    <RouteContainer key={location.pathname}>
      <Switch location={location}>
        <Route exact path='/' component={Home} />
        <Route exact path='/create-account' component={CreateAccount} />
        <Route exact path='/create-event' component={Create} />
        <Route exact path='/display-all' component={DisplayAll} />
        <Route exact path='/display-event/:id' component={DisplayEvent} />
        <Route exact path='/display-past' component={DisplayPast} />
        <Route exact path='/edit/:id' component={Edit} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/my-events' component={MyEvents} />
        <Route exact path='/my-participations' component={MyParticipation} />
        <Route exact path='/subscription-event' component={SubscriptionEvent} />
        <Route exact path='/unsuscription-event' component={UnsubscriptionEvent} />
      </Switch>
    </RouteContainer>
  </PoseGroup>

)}/>
)

export default Routes
