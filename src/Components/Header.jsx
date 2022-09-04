import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import '../CSS/header.css';

class Header extends Component {
  state = {
    userName: '',
    loading: true,
  };

  componentDidMount() {
    this.setUserName();
  }

  setUserName = async () => {
    const { name } = await getUser();
    this.setState({ userName: name, loading: false });
  };

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Carregando />
          : (
            <p className="userName" data-testid="header-user-name">{userName}</p>
          )}
        <nav className="header-navbar">
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
