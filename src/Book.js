import React from 'react'
import PropTypes from 'prop-types'
import ShelfChanger from './ShelfChanger'

class Book extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    shelf: PropTypes.string,
    imageLinks: PropTypes.object,
    id: PropTypes.string.isRequired,
    handleShelfChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleShelfChange = this.handleShelfChange.bind(this)
  }

  handleShelfChange(shelf) {
    const book = {
      id: this.props.id,
      title: this.props.title,
      authors: this.props.authors,
      imageLinks: this.props.imageLinks,
      shelf: shelf
    }
    this.props.handleShelfChange(book, shelf)
  }

  render() {
    console.log(this.props)
    return (
      <li>
        <div className='book'>
          <div className='book-top'>
            {(this.props.imageLinks) &&
              <div className='book-cover' style={{ width: 128, height: 193,
                backgroundImage: 'url(' + this.props.imageLinks.thumbnail + ')' }}></div>
            }
            <ShelfChanger
              shelf={this.props.shelf}
              onShelfChange={this.handleShelfChange}/>
          </div>
          <div className='book-title'>{this.props.title}</div>
          <div className='book-authors'>{this.props.authors}</div>
        </div>
      </li>
    )
  }
}

export default Book
