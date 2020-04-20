import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link, NavLink, Redirect, Prompt } from "react-router-dom"
import logo from "./logo.svg"
import "./App.css"


const AboutComponent = () => {
	return <h1>About page</h1>
}

const UserComponent = ({ match }) => {
	return <h1>Welcome {match.params.username}</h1>
}

class App extends Component {
  state = {
  	isLoggedIn: false
  }

  handleLogin = () => {
  	this.setState(prevState => ({isLoggedIn: !prevState.isLoggedIn}))
  }

  render() {
  	return <Router>
  		<div className="App">

  			<button onClick={this.handleLogin.bind(this)}>
  				{this.state.isLoggedIn ? "Log Out" : "Log In"}
  			</button>

  			<ul className="list-unstyled">
  				<li>
  					<Link to="/">Home</Link>
  				</li>
  				<li>
  					<Link to="/about/">About</Link>
  				</li>
  				<li>
  					<NavLink
  						to="/user/john"
  						activeStyle={{color: "green"}}>
                User john
  					</NavLink>
  				</li>
  				<li>
  					<NavLink to="/user/peter"
  						activeStyle={{color: "green"}}>
                user Peter
  					</NavLink>
  				</li>
  			</ul>

  			<Prompt
  				when={!this.state.isLoggedIn}
  				message={(location) => {
  					return location.pathname.startsWith("/user") ? "login first": true
  				}}
  			/>


  			<Route path="/" exact={true} render={() => {
  				return <h1>Welcome Home</h1>
  			}}/>


  			{/*routes*/}
  			<Route path="/about/" exact={true} strict={true} component={AboutComponent}/>

  			<Route path="/user/:username" exact render={({match}) => {
  				if (this.state.isLoggedIn) {
  					return <UserComponent match={match}/>
  				} else {
  					return <Redirect to="/" />
  				}
  			}}/>
  		</div>
  	</Router>
  }
}

export default App
