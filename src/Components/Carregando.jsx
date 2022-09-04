import React, { Component } from 'react';
import '../CSS/carregando.css';

export default class Carregando extends Component {
  render() {
    return (
      <div className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }
}
