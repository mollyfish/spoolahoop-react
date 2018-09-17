import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('The form was submitted.');
  }

  // loginForm = 

  render() {
    return (
      <form className="login" id="login" onSubmit={this.handleSubmit}>
        <fieldset className="slide-in-down">
          <h2>Login</h2>
          <input name="username" type="text" placeholder="username" value={this.state.username} onChange={this.handleChange}/>
          <input name="password" type="password" placeholder="password" value={this.state.password} onChange={this.handleChange}/>
          <input className="button" type="submit" value="Play now!"/>
        </fieldset>
      </form>
    );
  }
}

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <div>
        {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
        <LoginForm name="molly" />
        <img src={ReactImage} alt="react" />
      </div>
    );
  }
}
