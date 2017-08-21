import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookItem from "./BookItem"

class BookList extends Component {

  state = {
   titleDict : {
     wantToRead: "Want to Read",
     currentlyReading: "Currently Reading",
     read: "Read"
   }
 }

  static propTypes = {
    books : PropTypes.array.isRequired,
    shelf : PropTypes.string.isRequired
  }

  render() {
    let shelfBooks = this.props.books.filter((book) => book.shelf === this.props.shelf)
    console.log(shelfBooks)
    return (

      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.state.titleDict[this.props.shelf]}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelfBooks.map((book) => (<BookItem book={book} />))}
          </ol>
        </div>
      </div>
      )
    }


}

export default BookList
