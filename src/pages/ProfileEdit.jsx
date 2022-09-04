import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Carregando from '../Components/Carregando';
import Header from '../Components/Header';
import { getUser, updateUser } from '../services/userAPI';
import '../CSS/profileEdit.css';

export default class ProfileEdit extends Component {
  state = {
    loading: true,
    name: '',
    email: '',
    image: '',
    description: '',
    isButtonDisabled: true,
  };

  componentDidMount() {
    this.setUserInfo();
  }

  setUserInfo = async () => {
    const userInfo = await getUser();
    this.setState({
      loading: false,
      name: userInfo.name,
      email: userInfo.email,
      image: userInfo.image,
      description: userInfo.description,
      isButtonDisabled: true,
    }, this.verify);
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.verify);
  };

  verify = () => {
    const { name, email, image, description } = this.state;
    const isEmailValid = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
    // console.log((name !== '' && isEmailValid !== null && image !== '' && description !== ''));
    if (name !== '' && isEmailValid !== null && image !== '' && description !== '') {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  };

  submitForm = async () => {
    const { name, email, image, description } = this.state;
    this.setState({ loading: true });
    await updateUser({
      name,
      email,
      image,
      description,
    });
    // <Redirect to="/profile"/>;
    const { history } = this.props;
    history.push('/profile');
    this.setState({ loading: false });
  };

  render() {
    const { loading, name, email, image, description, isButtonDisabled } = this.state;

    return (
      <>
        <Header />
        <div className="profile-edit" data-testid="page-profile-edit">
          {loading ? <Carregando /> : (
            <>
              <h1 className="trybe-tunes">Editar Perfil</h1>
              <label htmlFor="name">
                Nome:&nbsp;
                <input
                  className="profile-input"
                  type="text"
                  name="name"
                  id="name"
                  value={ name }
                  onChange={ this.handleChange }
                  data-testid="edit-input-name"
                  placeholder="nome"
                />
              </label>
              <label htmlFor="email">
                Email:&nbsp;
                <input
                  className="profile-input"
                  type="email"
                  name="email"
                  id="email"
                  value={ email }
                  onChange={ this.handleChange }
                  data-testid="edit-input-email"
                  placeholder="email"
                />
              </label>
              <label htmlFor="image">
                Link da Imagem:&nbsp;
                <input
                  className="profile-input"
                  type="text"
                  name="image"
                  id="image"
                  value={ image }
                  onChange={ this.handleChange }
                  data-testid="edit-input-image"
                  placeholder="link da imagem"
                />
              </label>
              <label htmlFor="description">
                Descrição:&nbsp;
                <input
                  className="profile-input"
                  type="description"
                  name="description"
                  id="description"
                  data-testid="edit-input-description"
                  value={ description }
                  onChange={ this.handleChange }
                  placeholder="descrição"
                />
              </label>
              <button
                className="submit-edit-btn"
                type="submit"
                data-testid="edit-button-save"
                disabled={ isButtonDisabled }
                onClick={ this.submitForm }
              >
                Salvar
              </button>
            </>
          )}
        </div>
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
