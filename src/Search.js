import React from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {books: []};
    this.updateResults = this.updateResults.bind(this);
  }

  updateResults(query) {
    query && BooksAPI.search(query, 20).then((books) => {
      books.error ? this.setState({books: []}) : this.setState({books: books});
    });
  }

  render() {
    return (
      <div className="search-books">
        <SearchBar updateResults={this.updateResults}/>
        {(this.state.books) &&
          <SearchResults books={this.state.books}/>
        }
      </div>
    ) 
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {query: ''};
    this.updateQuery = this.updateQuery.bind(this);
  }

  updateQuery(event) {
    const query = event.target.value;
    this.setState({query: query});
    this.props.updateResults(query);
  }

  render() {
    return (
      <div className="search-books-bar">
        <Link className="close-search" to='/'>Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" value={this.state.query} onChange={this.updateQuery} placeholder="Search by title or author"/>
        </div>
      </div>
    ) 
  }
}

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.handleBookAdd = this.handleBookAdd.bind(this);
  }

  handleBookAdd(id, shelf) {
    BooksAPI.update({'id': id}, shelf);
  }

  render() {
    const results = [];
    this.props.books.forEach((book) => {
      results.push(
        <Book
          authors={book.authors}
          title={book.title}
          shelf={book.shelf}
          img={book.imageLinks.thumbnail}
          handleShelfChange={this.handleBookAdd}
          id={book.id}
          key={book.id}
        />
      );
    });
    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {results}
        </ol>
      </div>
    );
  }
}

export default Search