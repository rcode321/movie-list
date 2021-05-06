import React, { Component } from "react";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

import { paginate } from "../utils/paginate";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import Listgroup from "./common/listGroup";
import Like from "./common/likes";
import PagiNation from "./common/pagination";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handleDelete = (movie) => {
    console.log(movie);
    const movies = this.state.movies.filter((movee) => movee._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
    console.log("like is cliked", movie);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    // console.log(page);
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenere: genre });
    console.log(genre);
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <Listgroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenere}
          />
        </div>
        <div className="col">
          <p>Showing {count} movies in the database</p>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <Button
                      onClick={() => this.handleDelete(movie)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PagiNation
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
