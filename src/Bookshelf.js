import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfName: PropTypes.string.isRequired,
    handleShelfChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    // this.state = {shelf: props.shelf};
    this.handleShelfChange = this.handleShelfChange.bind(this)
  }

  handleShelfChange(book, shelf) {
    this.props.handleShelfChange(book, shelf)
  }

  render() {
    const shelf = []
    this.props.books.forEach((book) => {
      shelf.push(
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
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>
          {this.props.shelfName.replace(/([A-Z])/g, ' $1').toUpperCase()}
        </h2>
        <div className='bookshelf-books'>
          <ol className='books-grid'>
            {shelf}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
