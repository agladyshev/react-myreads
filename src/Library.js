import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

class Library extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    handleShelfChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleShelfChange = this.handleShelfChange.bind(this)
  }

  handleShelfChange(book, shelf) {
    this.props.handleShelfChange(book, shelf)
  }

  render() {
    // Shelves are created dynamically from book shelf property
    // This way, we can add more values in the future easily.
    // e.g., 'to buy' or 'lent'
    // The downside is that the Map object iterates in insertion order
    const shelves = new Map([])
    this.props.books.forEach((book) => {
      if (shelves.has(book.shelf)) {
        const shelf = shelves.get(book.shelf)
        shelf.push(book)
        shelves.set(book.shelf, shelf)
      } else {
        shelves.set(book.shelf, [book])
      }
    })
    const bookshelves = []
    for (const [key, shelf] of shelves) {
      bookshelves.push(
        <Bookshelf
          books={shelf}
          shelfName={key}
          handleShelfChange={this.handleShelfChange}
          key={key} />
      )
    }
    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            {bookshelves}
          </div>
        </div>
        <div className='open-search'>
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Library
