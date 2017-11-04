import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBar extends React.Component {
  static propTypes = {
    updateResults: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { query: '' }
    this.updateQuery = this.updateQuery.bind(this)
  }

  updateQuery(event) {
    const query = event.target.value
    this.setState({ query: query })
    this.props.updateResults(query)
  }

  render() {
    return (
      <div className='search-books-bar'>
        <Link className='close-search' to='/'>Close</Link>
        <div className='search-books-input-wrapper'>
          <input type='text' value={this.state.query}
          onChange={this.updateQuery} placeholder='Search by title or author'/>
        </div>
      </div>
    )
  }
}

export default SearchBar
