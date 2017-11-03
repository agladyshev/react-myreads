import React from 'react';
import { Route } from 'react-router-dom'

import Library from './Library'
import Search from './Search'
import './App.css'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      bookToShelf: new Map()
    };
    this.handleShelfChange = this.handleShelfChange.bind(this);
  }

  handleShelfChange(id, shelf) {
    this.setState((prevState) => ({
      books: prevState.books.filter( book => {
        if (book.id === id) {
          if (shelf !== 'none') {
            book.shelf = shelf;
            return book;
          }
          BooksAPI.update(book, shelf);
          return false;
        } else {
          return book;
        }
      })
    }));
    this.setState((prevState) => {
      prevState.bookToShelf.delete(id);
      return {bookToShelf: prevState.bookToShelf};
    });
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const bookToShelf = new Map();
      books.forEach((book) => {
        bookToShelf.set(book.id, book.shelf);
      });
      this.setState({
        books: books,
        bookToShelf: bookToShelf
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Library books={this.state.books} handleShelfChange={this.handleShelfChange}/>
        )}/>
        <Route exact path='/search' render={() => (
          <Search bookToShelf={this.state.bookToShelf}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp;