import PropTypes from 'prop-types';
import React, { Component } from 'react';

import getMusics from '../services/musicsAPI';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import Carregando from '../Components/Carregando';
import '../CSS/album.css';

class Album extends Component {
  state = {
    musics: [],
    albumInfo: {},
    loading: false,
  };

  componentDidMount() {
    this.getData();
  }

  functionLoading = () => {
    this.setState((prevState) => ({
      loading: !(prevState.loading),
    }));
  };

  getData = async () => {
    const { match } = this.props;
    const {
      params: { id },
    } = match;
    const response = await getMusics(id);
    this.setState({
      musics: response.filter((element) => element.kind === 'song'),
      albumInfo: response[0],
    });
  };

  render() {
    const { musics, albumInfo, loading } = this.state;
    return (
      <>
        <Header />
        {loading ? (
          <Carregando />
        ) : (
          <div className="album-content" data-testid="page-album">
            <div className="album-info">
              <img src={ albumInfo.artworkUrl100 } alt={ albumInfo.collectionName } />
              <h1 data-testid="artist-name">{albumInfo.artistName}</h1>
              <p data-testid="album-name">{albumInfo.collectionName}</p>
            </div>
            <div className="music-content">
              {musics.map((music) => (
                <MusicCard
                  key={ Number(music.trackId) }
                  music={ music }
                  functionLoading={ this.functionLoading }
                />
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
