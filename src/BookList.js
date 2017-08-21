import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
            {shelfBooks.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                    <div className="book-shelf-changer">
                      <select>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.author}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      )
    }


}

export default BookList
