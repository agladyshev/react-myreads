import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class Search extends React.Component {
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    ) 
  }
}

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

const BOOKS = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    url: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
    shelf: "read"
  },
  {
    title: '1776',
    author: 'David McCullough',
    url: 'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api',
    shelf: 'read'
  },
  {
    title: "To Kill a Mockingbird 2",
    author: "Harper Lee",
    url: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
    shelf: "Currently Reading"
  },
  {
    title: '1776 2',
    author: 'David McCullough',
    url: 'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api',
    shelf: 'Currently Reading'
  }
]

class Bookshelf extends React.Component {
  render() {
    console.log(this.props);
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
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )
  }
}

class BooksApp extends React.Component {
  state = {
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? <Search />: <Library books={BOOKS}/>}
      </div>
    )
  }
}



export default BooksApp
