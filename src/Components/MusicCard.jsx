import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends Component {
  state = {
    favoritar: false,
    loading: false,
  };

  componentDidMount() {
    this.isAlreadyFavorite();
  }

  // verifica se a musica já está favoritada
  isAlreadyFavorite = async () => {
    const { music } = this.props;
    const { trackId } = music;

    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    const favoriteSongsTrackId = favoriteSongs.map((song) => song.trackId);
    this.setState({ loading: false });

    if (favoriteSongsTrackId.includes(trackId)) {
      this.setState({ favoritar: true });
    }
  };

  // adiciona a musica na lista de favoritos
  awaitAddFavRequest = async () => {
    const { music } = this.props;
    await addSong(music);
    this.setState({ loading: false });
  };

  // remove a musica na lista de favoritos
  awaitRemoveFavRequest = async () => {
    const { music } = this.props;
    await removeSong(music);
    this.setState({ loading: false });
  };

  // permite marcar a musica como favorita
  handleFavoriteCheckbox = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ loading: true, [name]: value });
    if (value) {
      this.awaitAddFavRequest();
    } else {
      this.awaitRemoveFavRequest();
    }
    const { renderFavoriteSongs } = this.props;
    if (renderFavoriteSongs) {
      renderFavoriteSongs();
    }
  };

  render() {
    const { music } = this.props;
    const { previewUrl, trackName, trackId } = music;
    const { favoritar, loading } = this.state;
    return (
      <div className="music">
        {loading ? (
          <Carregando />
        ) : (
          <>
            <p className="music-name">{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor="favoritar">
              Favoritar
              <input
                type="checkbox"
                name="favoritar"
                id="favoritar"
                onChange={ this.handleFavoriteCheckbox }
                checked={ favoritar }
                data-testid={ `checkbox-music-${trackId}` }
              />
            </label>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  renderFavoriteSongs: PropTypes.func,
  music: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

MusicCard.defaultProps = {
  renderFavoriteSongs: () => {},
};
export default MusicCard;
