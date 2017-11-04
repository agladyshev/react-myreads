import React from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

class Search extends React.Component {
  static propTypes = {
    bookToShelf: PropTypes.instanceOf(Map).isRequired,
    handleShelfChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      query: ''
    }
    this.updateResults = this.updateResults.bind(this)
    this.handleShelfChange = this.handleShelfChange.bind(this)
  }

  updateResults(query) {
    this.setState({ query: query })
    const bookToShelf = this.props.bookToShelf
    !query ? this.setState({ searchResults: [] }) : BooksAPI.search(query, 20).then((books) => {
      if (!this.state.query || books.error) {
        // We make sure query is still typed when valid when callback is returned
        // If search results are empty, error object is returned
        this.setState({ searchResults: [] })
      } else {
        // Update shelf value if book is already in the library
        books.forEach((book) => {
          (bookToShelf.has(book.id)) && (book.shelf = bookToShelf.get(book.id))
        })
        this.setState({ searchResults: books })
      }
    })
  }

  handleShelfChange(book, shelf) {
    // Add temp prop if book is not in the library
    !this.props.bookToShelf.has(book.id) && (book.temp = true)
    this.props.handleShelfChange(book, shelf)
  }

  render() {
    return (
      <div className='search-books'>
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

export default Search
