import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookItem from "./BookItem"

import {GridList, GridTile} from 'material-ui/GridList'

class BookList extends Component {

  static propTypes = {
    books : PropTypes.array.isRequired,
    onChangeShelf : PropTypes.func.isRequired
  }

  render() {

    return (

        <div className="bookshelf-books">
          <GridList cellHeight={260} cols={6}>
            {this.props.books.map((book) => (

                <BookItem book={book} onChangeShelf={this.props.onChangeShelf}/>

            ))}
          </GridList>
        </div>
      )
    }


}

export default BookList
