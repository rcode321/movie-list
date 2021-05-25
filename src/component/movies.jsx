import React, { Component } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/movieService";
import getGenres from "../services/genreService";
import { paginate } from "../utils/paginate";

import ListGroup from "./common/listGroup";
import PagiNation from "./common/pagination";
import Moviestable from "./common/moviesTable";

import SearchBox from "./searchBox";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		searchQuery: "",
		selectedGenre: null,
		sortColumn: { path: "title", order: "asc" },
	};

	async componentDidMount() {
		const { data } = await getGenres();
		const genres = [{ _id: "", name: "All Genres" }, ...data];

		const { data: movies } = await getMovies();
		this.setState({ movies, genres });
	}

	handleDelete = async (movie) => {
		// console.log(movie);
		const originalMovies = this.state.movies;
		const movies = originalMovies.filter((m) => m._id !== movie._id);
		this.setState({ movies });

		try {
			await deleteMovie(movie._id);
		} catch (err) {
			if (err.response && err.response.status === 404) console.log("x");
			toast.error("This movie has already been deleted");

			this.setState({ movies: originalMovies });
		}
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
		this.setState({
			selectedGenre: genre,
			searchQuery: "",
			currentPage: 1,
		});
		// console.log(genre);
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
		// console.log(sortColumn);
	};

	handleSearch = (query) => {
		this.setState({
			searchQuery: query,
			selectedGenre: null,
			currentPage: 1,
		});
	};

	getPageData = () => {
		const {
			pageSize,
			currentPage,
			sortColumn,
			selectedGenre,
			searchQuery,
			movies: allMovies,
		} = this.state;

		let filtered = allMovies;
		if (searchQuery)
			filtered = allMovies.filter((m) =>
				m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		else if (selectedGenre && selectedGenre._id)
			filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
		// filtering
		// const filtered =
		// 	selectedGenre && selectedGenre._id
		// 		? allMovies.filter((m) => m.genre._id === selectedGenre._id)
		// 		: allMovies;
		// sorting
		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		// paginate
		const movies = paginate(sorted, currentPage, pageSize);
		return { totalCount: filtered.length, data: movies };
	};

	render() {
		const { length: count } = this.state.movies;
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

		if (count === 0) return <p>There are no movies in the database.</p>;
		const { totalCount, data: movies } = this.getPageData();

		return (
			<div className="row">
				<div className="col-3">
					<ListGroup
						items={this.state.genres}
						selectedItem={this.state.selectedGenre}
						onItemSelect={this.handleGenreSelect}
					/>
				</div>
				<div className="col">
					<Link className="btn btn-primary" to="/movies/new">
						New Movie
					</Link>
					<p>Showing {totalCount} movies in the database</p>
					<SearchBox value={searchQuery} onChange={this.handleSearch} />
					<Moviestable
						movies={movies}
						sortColumn={sortColumn}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
					/>
					<PagiNation
						itemsCount={totalCount}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

Movies.defaultProps = {
	valueProperty: "_id",
};

export default Movies;
