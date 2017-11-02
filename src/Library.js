import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import * as BooksAPI from './BooksAPI'

class Book extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    handleShelfChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    // this.state = {shelf: props.shelf};
    this.handleShelfChange = this.handleShelfChange.bind(this);
  }

  handleShelfChange(shelf) {
    this.props.handleShelfChange(shelf, this.props.id);
  }

  render () {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + this.props.img + ')' }}></div>
            <ShelfChanger 
              shelf={this.props.shelf}
              onShelfChange={this.handleShelfChange}/>
          </div>
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.authors}</div>
        </div>
      </li>
    );  
  }
}

class ShelfChanger extends React.Component {
  static propTypes = {
    shelf: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    // this.state = {shelf: props.shelf};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onShelfChange(event.target.value);
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.props.shelf} onChange={this.handleChange}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

class Bookshelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfName: PropTypes.string.isRequired,
    handleShelfChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    // this.state = {shelf: props.shelf};
    this.handleShelfChange = this.handleShelfChange.bind(this);
  }

  handleShelfChange(shelf, id) {
    this.props.handleShelfChange(shelf, id);
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
          handleShelfChange={this.handleShelfChange}
          id={book.id}
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
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
    this.handleShelfChange = this.handleShelfChange.bind(this);
  }

  handleShelfChange(shelf, id) {
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

    for (const [key, shelf] of shelves) {
      bookshelves.push(
        <Bookshelf
          books={shelf}
          shelfName={key}
          handleShelfChange={this.handleShelfChange}
          key={key} />
      );
    }

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