import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./likes";
import Button from "react-bootstrap/Button";
import Tables from "./table";

class MoviesTable extends Component {
	columns = [
		{
			path: "title",
			label: "Title",
			content: (movie) => (
				<Link to={`/movies/${movie._id}`}>{movie.title}</Link>
			),
		},
		{ path: "genre.name", label: "Genre" },
		{ path: "numberInStock", label: "Stock" },
		{ path: "dailyRentalRate", label: "Rate" },

		{
			key: "like",
			content: (movie) => (
				<Like
					liked={movie.liked}
					onClick={() => this.props.onLike(movie)}
				/>
			),
		},
		{
			key: "delete",
			content: (movie) => (
				<Button
					onClick={() => this.props.onDelete(movie)}
					variant="danger"
				>
					Delete
				</Button>
			),
		},
	];

	render() {
		const { movies, onSort, sortColumn } = this.props;

		return (
			<div>
				<Tables
					columns={this.columns}
					data={movies}
					sortColumn={sortColumn}
					onSort={onSort}
				/>
			</div>
		);
	}
}

export default MoviesTable;
