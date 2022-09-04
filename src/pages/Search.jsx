import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../Components/Header';
import Carregando from '../Components/Carregando';

import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import '../CSS/search.css';

export default class Search extends Component {
  state = {
    searchContent: '',
    isBtnSearchDisable: true,
    loading: false,
    response: [],
    searchValue: '',
  };

  handleChanges = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validation);
  };

  validadeBtnSearch = () => {
    const { searchContent } = this.state;
    if (searchContent.length >= 2) {
      this.setState({ isBtnSearchDisable: false });
    } else {
      this.setState({ isBtnSearchDisable: true });
    }
  };

  validation = () => {
    this.validadeBtnSearch();
  };

  Search = () => {
    const { searchContent } = this.state;
    this.setState({ loading: true }, async () => {
      const response = await searchAlbumsAPIs(searchContent);
      this.setState({ loading: false, searchValue: searchContent, response });
    });
    this.setState({ searchContent: '' });
  };

  render() {
    const {
      searchContent,
      isBtnSearchDisable,
      loading,
      searchValue,
      response,
    } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <h1 className="trybe-tunes">TrybeTunes</h1>
          {loading ? (
            <Carregando />
          ) : (
            <>
              <label htmlFor="searchContent">
                <input
                  className="search-input"
                  placeholder="Nome do Artista ou Banda"
                  type="text"
                  name="searchContent"
                  id="searchContent"
                  value={ searchContent }
                  data-testid="search-artist-input"
                  onChange={ this.handleChanges }
                  autoComplete="off"
                />
              </label>
              <br />
              <button
                className="search-button"
                type="button"
                data-testid="search-artist-button"
                disabled={ isBtnSearchDisable }
                onClick={ this.Search }
              >
                Pesquisar
              </button>
            </>
          )}
          {searchValue && (
            <h2>
              Resultado de álbuns de:&nbsp;
              {searchValue}
            </h2>
          )}
          <div className="search-result">
            {response[0]
              ? response.map((album) => (
                <div className="search-album" key={ album.collectionId }>
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  <div className="search-album-information">
                    <h3>{album.collectionName}</h3>
                    <p>{album.artistName}</p>
                    <Link
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      Link do Album
                    </Link>
                  </div>
                </div>
              ))
              : (
                <p>Nenhum álbum foi encontrado</p>
              )}
          </div>
        </div>
      </>
    );
  }
}
