import React, { Component } from 'react'
import * as BooksAPI from "./BooksAPI"


class BookPage extends Component {

  state = {
    currentBook: "None"
  }

  componentWillMount() {
    console.log("componentDidMount")
    BooksAPI.get(this.props.bookId).then((book) => {
      console.log(book)
        this.setState({currentBook: book})
      }
    )
  }

  render () {
    console.log(this.props.bookId)

    return (
      <div>
        <h1>{this.state.currentBook.title}</h1>
        <div>
          <p>{this.state.currentBook.description}</p>

        </div>
      </div>
    )

  }

}

export default BookPage;
