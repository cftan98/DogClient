import React, { Component } from 'react';
import axios from 'axios';

export const UserContext = React.createContext({});

export class UserProvider extends Component {
  state = {
    user: null
  }

  componentDidMount = async () => {
    await axios.get("http://localhost:3001/getuser", { withCredentials: true })
      .then(res => {
        this.setState({ user: res.data })
      })
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    const { user } = this.state;
    return (
      <UserContext.Provider
        value={user}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
