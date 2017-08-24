import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class BookItem extends Component {

  updateShelf = (book, shelf) => {
    this.props.onChangeShelf(book, shelf)
  }

  render () {


    const book = this.props.book
    const selected = book.shelf ? (book.shelf) : ("none")

    const imgUrl = book.imageLinks ? (book.imageLinks.smallThumbnail) : ('http://placehold.it/128x193')
    const divStyle = {
      width: 128,
      height: 193,
      backgroundImage: 'url(' + imgUrl + ')',
    };
    const linkTo = "/book/"+book.id

    return (

        <div className="book">
          <div className="book-top">
            <Link to={linkTo}><div className="book-cover" style={divStyle}></div></Link>
            <div className="book-shelf-changer input-field">
              <select value={selected} onChange={(event) => this.updateShelf(book, event.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors && (<div className="book-authors">{book.authors.map((author) => (<span>{author} </span>))}</div>)}
        </div>

    )

  }

}

export default BookItem;
