import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class SearchResults extends React.Component {
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
    const results = []
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
      )
    })
    return (
      <div className='search-books-results'>
        <ol className='books-grid'>
          {results}
        </ol>
      </div>
    )
  }
}

export default SearchResults
