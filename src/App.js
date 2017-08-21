import React from 'react'
import { Route , Link } from 'react-router-dom'
import BookList from "./BookList"
import SearchBook from "./SearchBook"
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     books: [],
     showSearchPage: true
  }


  componentDidMount() {

    BooksAPI.getAll().then((books) => {
      this.setState({ books: books})
      console.log(books)
    })

  }


  render() {
    return (


      <div className="app">

        <Route exact path="/search" render={ () =>
          <SearchBook />
        } />

        <Route exact path="/" render={ () =>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookList
                  books={this.state.books} shelf="currentlyReading" />
                <BookList
                  books={this.state.books} shelf="wantToRead" />
                <BookList
                  books={this.state.books} shelf="read" />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        } />

      </div>
    )
  }
}

export default BooksApp
