import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookList from "./BookList"
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component {

  state = {
    query: "",
    foundBooks: []
  }

  //Update the query value
  updateQuery = (query) => {
    this.setState({query: query})
  }

  //Updates the shelf of searched books and the state
  updateState = (books) => {
    for (let book of books) {
      for (let shelfBook of this.props.shelfBooks){
        if (shelfBook.id === book.id) {
          book.shelf = shelfBook.shelf
        }
      }
    }
    this.setState({foundBooks: books})
  }

  componentDidUpdate(prevProp, prevState) {
    console.log("componentDidUpdate")
    console.log(prevState)
    console.log(this.state)

    if (prevState.query !== this.state.query) {
      //console.log("different query")

      // empty query
      if (this.state.query === "" ) {
        //console.log("empty query")
        this.setState({foundBooks:[]})
      }

      // non empty
      if (this.state.query !== "") {
        //console.log("non empty query")
        BooksAPI.search(this.state.query, 20).then((data) => { // make a search
          console.log(data)
          data = (data.error ? ([]) : (data))
          this.updateState(data)
        })
      }
    }
  }

  render () {

    return(

      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
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
