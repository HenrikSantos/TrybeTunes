import React, { Component } from 'react';
import Header from '../Components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../Components/Carregando';
import MusicCard from '../Components/MusicCard';

export default class Favorites extends Component {
  state = {
    loading: true,
    favoriteList: [],
  };

  componentDidMount() {
    this.renderFavoriteSongs();
  }

  renderFavoriteSongs = async () => {
    this.setState({
      loading: true,
    });
    const requestFavoriteList = await getFavoriteSongs();
    this.setState({
      favoriteList: requestFavoriteList,
      loading: false,
    });
  };

  render() {
    const { loading, favoriteList } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          {loading ? (
            <Carregando />
          ) : (
            favoriteList.map((music) => (
              <MusicCard
                music={ music }
                key={ music.trackId }
                renderFavoriteSongs={ this.renderFavoriteSongs }
              />))
          )}
        </div>
      </>
    );
  }
}
