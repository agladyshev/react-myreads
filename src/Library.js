import React from 'react';
import { Link } from 'react-router-dom'

const Book = (props) => (
  <li>
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + props.book.url + ')' }}></div>
        <ShelfChanger shelf={props.book.shelf}/>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.author}</div>
    </div>
  </li>  
);

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

class Bookshelf extends React.Component {
  render() {
    const shelf = [];
    this.props.books.forEach((book) => {
      shelf.push(
        <Book
          book={book}
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
  render() {
    const shelves = new Map([]);
    this.props.books.forEach((book) => {
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