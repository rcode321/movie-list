import React, { Component } from "react";

import Table from "react-bootstrap/Table";
import TableHeader from "../common/tableHeader";
import Like from "./likes";
import Button from "react-bootstrap/Button";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "delete" },
  ];

  render() {
    const { movies, onDelete, onLike, onSort, sortColumn } = this.props;

    return (
      <Table responsive="sm">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like liked={movie.liked} onClick={() => onLike(movie)} />
              </td>
              <td>
                <Button onClick={() => onDelete(movie)} variant="danger">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default MoviesTable;
