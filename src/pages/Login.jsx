import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Carregando from '../Components/Carregando';

import { createUser } from '../services/userAPI';
import '../CSS/login.css';

class Login extends Component {
  state = {
    isBtnEntrarDisable: true,
    loginName: '',
    loading: false,
  };

  handleChanges = ({ target }) => {
    const { value } = target;
    this.setState({ loginName: value });
    const MIN_NAME_CHARACTERS = 3;
    if (value.length >= MIN_NAME_CHARACTERS) {
      this.setState({ isBtnEntrarDisable: false });
    } else {
      this.setState({ isBtnEntrarDisable: true });
    }
  };

  login = () => {
    this.setState({ loading: true }, async () => {
      const { loginName } = this.state;
      await createUser({ name: loginName });
      const { history } = this.props;
      history.push('/search');
    });
  };

  render() {
    const { isBtnEntrarDisable, loginName, loading } = this.state;
    return (
      <div data-testid="page-login">
        {loading ? (
          <Carregando />
        ) : (
          <form>
            <h1 className="trybe-tunes">TrybeTunes</h1>
            <h1 className="login-title">Login</h1>
            <p className="forget-text">
              Não tem uma conta?&nbsp;&nbsp;
              <a href="/notFound">Registre-se</a>
            </p>
            <label htmlFor="loginName">
              {/* Nome:&nbsp; */}
              <input
                type="text"
                name="loginName"
                id="loginName"
                value={ loginName }
                data-testid="login-name-input"
                onChange={ this.handleChanges }
                placeholder="Nome"
                className="name-input"
                autoComplete="off"
                maxLength={ 18 }
              />
            </label>
            <div className="lembrar-text">
              <label htmlFor="salvar">
                <input type="checkbox" name="salvar" id="salvar" />
                &nbsp;Lembrar de mim
              </label>
              <p>Esqueceu seu usuário?</p>
            </div>
            <button
              className="login-button"
              type="button"
              data-testid="login-submit-button"
              disabled={ isBtnEntrarDisable }
              onClick={ this.login }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
