import React, { Component } from "react";
import { connect } from "react-redux";

import { deleteUrl } from "../config/api";
import { deleteMovie } from "../store/actions";

class Movie extends Component {
  deleteMovie = e => {
    e.preventDefault();
    const { naziv, _id } = this.props.podaci;
    if (window.confirm(`Delete movie: "${naziv}" ?`)) {
      fetch(deleteUrl, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: _id })
      })
        .then(res => res.text())
        .then(res => {
          alert(res);
          this.props.deleteMovie(_id);
        });
    }
  };

  render() {
    const movie = this.props.podaci;
    let naziv, godina, slika;

    if (movie) {
      naziv = movie.naziv;
      godina = movie.godina;
      slika = movie.slika;
    }
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    return (
      <div>
        <h3>{naziv}</h3>
        <div className="image-holder">
          {loggedIn && movie ? (
            <span
              onClick={this.deleteMovie}
              className="delete-btn"
              title="Delete movie"
            >
              X
            </span>
          ) : null}
          <img src={slika} alt={naziv} />
        </div>
        <p>{godina}</p>
      </div>
    );
  }
}

const mapDispatchToProps = { deleteMovie };

export default connect(
  null,
  mapDispatchToProps
)(Movie);
