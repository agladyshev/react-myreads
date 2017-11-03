import React from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
    };
    this.updateResults = this.updateResults.bind(this);
    this.handleShelfChange = this.handleShelfChange.bind(this);
  }

  updateResults(query) {
    const bookToShelf = this.props.bookToShelf;
    query && BooksAPI.search(query, 20).then((books) => {
      (books) && (books.forEach((book) => {(bookToShelf.has(book.id)) && (book.shelf = bookToShelf.get(book.id))})); 
      books.error ? this.setState({searchResults: []}) : this.setState({searchResults: books});
    });
  }

  handleShelfChange(book, shelf) {
    // Add temp prop if book is not in the library
    !this.props.bookToShelf.has(book.id) && (book.temp = true);
    this.props.handleShelfChange(book, shelf);
  }

  render() {
    return (
      <div className="search-books">
        <SearchBar updateResults={this.updateResults}/>
        {(this.state.searchResults) &&
          <SearchResults
            books={this.state.searchResults}
            handleShelfChange={this.handleShelfChange} />
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
    this.handleShelfChange = this.handleShelfChange.bind(this);
  }

  handleShelfChange(book, shelf) {
    this.props.handleShelfChange(book, shelf);
  }

  render() {
    const results = [];
    this.props.books.forEach((book) => {
      results.push(
        <Book
          authors={book.authors}
          title={book.title}
          shelf={book.shelf}
          imageLinks={book.imageLinks}
          handleShelfChange={this.handleShelfChange}
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