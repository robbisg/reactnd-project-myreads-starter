import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookItem from "./BookItem"

class BookList extends Component {


  static propTypes = {
    books : PropTypes.array.isRequired,
    onChangeShelf : PropTypes.func.isRequired
  }

  render() {

    return (

        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (<BookItem book={book} onChangeShelf={this.props.onChangeShelf}/>))}
          </ol>
        </div>
      )
    }


}

export default BookList
