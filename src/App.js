import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import './App.css';
import Navbar from './components/navbar';
import Home from './containers/home'
import Edit from './containers/edit'


const App = () => (
  	<Route render={({ location }) => (
    	<div className="App">
			<Navbar />
			<Switch location={location}>
				<Route exact path="/" component={Home} key="home" />
				<Route path="/new" component={Edit} key="new" />
				<Route path="/edit/:id" component={Edit} key="edit" />
				<Redirect to="/" />
			</Switch>
    	</div>
  	)} />
);

export default App;
