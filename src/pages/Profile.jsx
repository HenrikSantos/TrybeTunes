import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../Components/Carregando';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';
import '../CSS/profile.css';

export default class Profile extends Component {
  state = {
    loading: true,
    userInfo: [],
  };

  componentDidMount() {
    this.setUserInfo();
  }

  setUserInfo = async () => {
    const userInfo = await getUser();
    this.setState({
      loading: false,
      userInfo,
    });
  };

  render() {
    const { loading, userInfo } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          <h1 className="trybe-tunes">Perfil de usuário:</h1>
          {loading ? <Carregando /> : (
            <div className="profile-infos">
              <img
                src={ userInfo.image }
                alt="adicione uma foto na edição de perfil"
                data-testid="profile-image"
              />
              <p>Nome: </p>
              <h1>{userInfo.name}</h1>
              <hr />
              <p>Email: </p>
              <p>{userInfo.email}</p>
              <hr />
              <p>Descrição :</p>
              <p>{userInfo.description}</p>
              <hr />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
        </div>
      </>
    );
  }
}
