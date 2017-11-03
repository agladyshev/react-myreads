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
      books: []
    };
    this.handleShelfChange = this.handleShelfChange.bind(this);
  }

  handleShelfChange(id, shelf) {
    console.log('app');
    this.setState((prevState) => ({
      books: prevState.books.map( book => {
        if (book.id === id) {
          book.shelf = shelf;
          BooksAPI.update(book, shelf);
          return book;
        } else {
          return book;
        }
      })
    }));
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({
      books: books
    }), function(msg) {
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Library books={this.state.books} handleShelfChange={this.handleShelfChange}/>
        )}/>
        <Route exact path='/search' render={() => (
          <Search books={this.state.books}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp;