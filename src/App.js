import React from 'react'
import { Route } from 'react-router-dom'

import Library from './Library'
import Search from './Search'
import './App.css'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      bookToShelf: new Map()
    }
    this.handleShelfChange = this.handleShelfChange.bind(this)
  }

  handleShelfChange(book, shelf) {
    BooksAPI.update(book, shelf)
    // Make temp changes to state
    if (book.temp) {
      // If new book is being added
      this.setState((prevState) => {
        prevState.books.push(book)
        prevState.bookToShelf.set(book.id, shelf)
        return { books: prevState.books, bookToShelf: prevState.bookToShelf }
      })
    } else {
      this.setState((prevState) => ({
        books: prevState.books.filter(prevBook => {
          if (prevBook.id === book.id) {
            if (shelf !== 'none') {
              prevBook.shelf = shelf
              return prevBook
            }
            return false
          } else {
            return prevBook
          }
        })
      }))
      shelf === 'none' && this.setState((prevState) => {
        prevState.bookToShelf.delete(book.id)
        return { bookToShelf: prevState.bookToShelf }
      })
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const bookToShelf = new Map()
      books.forEach((book) => {
        bookToShelf.set(book.id, book.shelf)
      })
      this.setState({
        books: books,
        bookToShelf: bookToShelf
      })
    })
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <Library books={this.state.books} handleShelfChange={this.handleShelfChange}/>
        )}/>
        <Route exact path='/search' render={() => (
          <Search bookToShelf={this.state.bookToShelf} handleShelfChange={this.handleShelfChange}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
