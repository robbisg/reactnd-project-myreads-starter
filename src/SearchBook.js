import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookList from "./BookList"
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component {

  state = {
    query: "",
    foundBooks: []
  }

  updateQuery = (query) => {
    this.setState({query: query})
  }

  componentDidUpdate(prevProp, prevState) {
    console.log("componentDidUpdate")
    console.log(prevState)
    console.log(this.state)

    if (prevState.query !== this.state.query) {
      console.log("different query")

      // empty query
      if (this.state.query === "" ) {
        console.log("empty query")
        this.setState({foundBooks:[]})
      }

      // non empty
      if (this.state.query !== "") {
        console.log("non empty query")
        BooksAPI.search(this.state.query, 20).then((data) => { // make a search
          console.log(data)
          data = (data.error ? ([]) : (data))
          this.setState({foundBooks: data})
        })
      }
    }
      else {
        console.log("same query")
      }

    
  }

  render () {

    return(

      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <p>Number of books displayed: {this.state.foundBooks.length}</p>
          <BookList books={this.state.foundBooks} onChangeShelf={this.props.onChangeShelf}/>
        </div>
      </div>
    )
  }


}

export default SearchBook;
