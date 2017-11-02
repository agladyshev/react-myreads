import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import * as BooksAPI from './BooksAPI'

const Book = (props) => (
  <li>
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + props.img + ')' }}></div>
        <ShelfChanger shelf={props.shelf}/>
      </div>
      <div className="book-title">{props.title}</div>
      <div className="book-authors">{props.authors}</div>
    </div>
  </li>  
);

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  shelf: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
}

const ShelfChanger = (props) => (
  <div className="book-shelf-changer">
    <select value={props.shelf}>
      <option value="none" disabled>Move to...</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  </div>
);

ShelfChanger.propTypes = {
  shelf: PropTypes.string.isRequired
}

class Bookshelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfName: PropTypes.string.isRequired
  }

  render() {
    const shelf = [];
    this.props.books.forEach((book) => {
      shelf.push(
        <Book
          authors={book.authors}
          title={book.title}
          shelf={book.shelf}
          img={book.imageLinks.thumbnail}
          key={book.title}
        />
      );
    });
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelf}
          </ol>
        </div>
      </div>
    )
  }
}

class Library extends React.Component {
  
  // static propTypes = {
  //   books: PropTypes.array.isRequired,
  // }
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({
      books: books
    }), function(msg) {
      console.log(msg);
    })
  }

  render() {
    const shelves = new Map([]);
    this.state.books.forEach((book) => {
      if (shelves.has(book.shelf)) {
        const shelf = shelves.get(book.shelf);
        shelf.push(book);
        shelves.set(book.shelf, shelf);
      } else {
        shelves.set(book.shelf, [book]);
      }}
    )

    const bookshelves = [];

    shelves.forEach(function(shelf, key) {
      bookshelves.push(
        <Bookshelf
          books={shelf}
          shelfName={key}
          key={key} />
      );
    });

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookshelves}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Library